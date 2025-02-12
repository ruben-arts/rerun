use std::fmt;
use std::{
    path::PathBuf,
    sync::mpsc::{Receiver, Sender, SyncSender},
};

use parking_lot::Mutex;

use re_log_types::LogMsg;

/// Errors that can occur when creating a [`FileSink`].
#[derive(thiserror::Error, Debug)]
pub enum FileSinkError {
    /// Error creating the file.
    #[error("Failed to create file {0}: {1}")]
    CreateFile(PathBuf, std::io::Error),

    /// Error spawning the file writer thread.
    #[error("Failed to spawn thread: {0}")]
    SpawnThread(std::io::Error),

    /// Error encoding a log message.
    #[error("Failed to encode LogMsg: {0}")]
    LogMsgEncode(#[from] crate::encoder::EncodeError),
}

enum Command {
    Send(LogMsg),
    Flush(SyncSender<()>),
}

impl Command {
    fn flush() -> (Self, Receiver<()>) {
        let (tx, rx) = std::sync::mpsc::sync_channel(0); // oneshot
        (Self::Flush(tx), rx)
    }
}

/// Stream log messages to an `.rrd` file.
pub struct FileSink {
    // None = quit
    tx: Mutex<Sender<Option<Command>>>,
    join_handle: Option<std::thread::JoinHandle<()>>,

    /// Only used for diagnostics, not for access after `new()`.
    path: PathBuf,
}

impl Drop for FileSink {
    fn drop(&mut self) {
        self.tx.lock().send(None).ok();
        if let Some(join_handle) = self.join_handle.take() {
            join_handle.join().ok();
        }
    }
}

impl FileSink {
    /// Start writing log messages to a file at the given path.
    pub fn new(path: impl Into<std::path::PathBuf>) -> Result<Self, FileSinkError> {
        // We always compress on disk
        let encoding_options = crate::EncodingOptions::COMPRESSED;

        let (tx, rx) = std::sync::mpsc::channel();

        let path = path.into();

        re_log::debug!("Saving file to {path:?}…");

        // TODO(andreas): Can we ensure that a single process doesn't
        // have multiple file sinks for the same file live?
        // This likely caused an instability in the past, see https://github.com/rerun-io/rerun/issues/3306

        let file = std::fs::File::create(&path)
            .map_err(|err| FileSinkError::CreateFile(path.clone(), err))?;
        let mut encoder = crate::encoder::Encoder::new(encoding_options, file)?;

        let join_handle = std::thread::Builder::new()
            .name("file_writer".into())
            .spawn({
                let path = path.clone();
                move || {
                    while let Ok(Some(cmd)) = rx.recv() {
                        match cmd {
                            Command::Send(log_msg) => {
                                if let Err(err) = encoder.append(&log_msg) {
                                    re_log::error!("Failed to save log stream to {path:?}: {err}");
                                    return;
                                }
                            }
                            Command::Flush(oneshot) => {
                                re_log::trace!("Flushing…");
                                if let Err(err) = encoder.flush_blocking() {
                                    re_log::error!("Failed to flush log stream to {path:?}: {err}");
                                    return;
                                }
                                drop(oneshot); // signals the oneshot
                            }
                        }
                    }
                    re_log::debug!("Log stream saved to {path:?}");
                }
            })
            .map_err(FileSinkError::SpawnThread)?;

        Ok(Self {
            tx: tx.into(),
            join_handle: Some(join_handle),
            path,
        })
    }

    #[inline]
    pub fn flush_blocking(&self) {
        let (cmd, oneshot) = Command::flush();
        self.tx.lock().send(Some(cmd)).ok();
        oneshot.recv().ok();
    }

    #[inline]
    pub fn send(&self, log_msg: LogMsg) {
        self.tx.lock().send(Some(Command::Send(log_msg))).ok();
    }
}

impl fmt::Debug for FileSink {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("FileSink")
            .field("path", &self.path)
            .finish_non_exhaustive()
    }
}
