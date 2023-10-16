window.BENCHMARK_DATA = {
  "lastUpdate": 1697443583887,
  "repoUrl": "https://github.com/rerun-io/rerun",
  "entries": {
    "Sizes": [
      {
        "commit": {
          "author": {
            "email": "jeremy@rerun.io",
            "name": "Jeremy Leibs",
            "username": "jleibs"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "541f34da150371f98e7430aca66fb81269311f21",
          "message": "Improve heuristics around 2D vs 3D space-view creation (#3822)\n\n### What\r\nResolves:\r\n - https://github.com/rerun-io/rerun/issues/3712 and probably more\r\n\r\nAgainst my better judgement I ended up with one more pile of compelling\r\nhacks.\r\nI believe it addresses many of the existing annoyances with awkwardly\r\nmixed 2d/3d views without (to my knowledge) causing regressions on the\r\nexisting examples, though I haven't thoroughly tested everything yet,\r\nSFM, Human Motion, Arkit, etc. all look good.\r\n\r\nThe very high level idea is to prevent including 2D data in 3D views\r\nwhen it can't be projected via a pinhole, and then in a few other common\r\nedge-cases, more aggressively force 3D views.\r\n\r\nThis is done through 3 heuristic changes:\r\n- In order for a 2D part to *ever* be part of a 3D view, there must be a\r\nPinhole above it in the hierarchy. Because this is something that can be\r\ninspected within the context of the tree without regard to any given\r\nspace, we can evaluate this for each entity path as part of\r\n`identify_entities_per_system_per_class`.\r\n- To make the information available to the filter, we introduce a new\r\n`HeuristicFilterContext` that allows the heuristic filter to observe\r\nwhich class it is being evaluated for as well as other information about\r\nthe tree.\r\n- In the event that a 2d-space-view has a score of 0, we no longer spawn\r\nit. This should logically use 3d instead.\r\n- In the event that a 2d-space-view at the root has any entities that\r\nwould rather be 3D don't spawn it. Logically this follows from the fact\r\nthat the only applicable pinhole in such a space would be at the root\r\nitself, and 3d data would need to transform past the root to be\r\nprojected.\r\n\r\nSome examples of the improved behavior:\r\n\r\nAs reported in https://github.com/rerun-io/rerun/issues/3712\r\n```\r\nrr.init(\"test\", spawn=True)\r\nrr.log(\"image/box\", rr.Boxes2D(array=[10, 10, 50, 50], array_format=rr.Box2DFormat.XYXY))\r\nrr.log(\"image\", rr.Image(np.random.rand(100, 100, 3)))\r\nrr.log(\"points\", rr.Points3D(np.random.rand(100, 3)))\r\n```\r\n\r\nBefore:\r\n\r\n![image](https://github.com/rerun-io/rerun/assets/3312232/e018fcd8-7c98-428e-b5ff-cd49cefe800b)\r\n\r\nAfter:\r\n\r\n![image](https://github.com/rerun-io/rerun/assets/3312232/cf73a458-a1e1-43d9-abbd-91afe4b5d3b1)\r\n\r\nAnd another particularly bad case I found while exploring:\r\n```\r\nrr.init(\"test\", spawn=True)\r\nrr.log(\"box\", rr.Boxes3D(half_sizes=[1, 1, 1]))\r\nrr.log(\"image\", rr.Image(np.random.rand(100, 100, 3)))\r\nrr.log(\"points\", rr.Points3D(np.random.rand(100, 3)))\r\n```\r\n\r\nBefore:\r\n\r\n![image](https://github.com/rerun-io/rerun/assets/3312232/599407f1-d650-4ad7-b138-4594b8460b7b)\r\n\r\nAfter:\r\n\r\n![image](https://github.com/rerun-io/rerun/assets/3312232/94f5007b-40ba-4afb-974c-421984985f7d)",
          "timestamp": "2023-10-12T11:58:30+02:00",
          "tree_id": "95cfaa564080373b2479f6189c14756fe2f28dd6",
          "url": "https://github.com/rerun-io/rerun/commit/541f34da150371f98e7430aca66fb81269311f21"
        },
        "date": 1697106577986,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.47",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cr.rey.clement@gmail.com",
            "name": "Clement Rey",
            "username": "teh-cmc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "65dc20c9a26d5bd44556da189d2a5d25ec3fa392",
          "message": "Fix selection history right-click menu not working (#3819)\n\nhttps://github.com/rerun-io/rerun/assets/2910679/733bffef-5f52-4152-9e82-1b570af66a0e\r\n\r\n- Fixes #1639",
          "timestamp": "2023-10-12T14:28:53+02:00",
          "tree_id": "7c18f8f41c734b2d7fb947b33a807a4246fcaaa1",
          "url": "https://github.com/rerun-io/rerun/commit/65dc20c9a26d5bd44556da189d2a5d25ec3fa392"
        },
        "date": 1697115588024,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.47",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.35",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "emil.ernerfeldt@gmail.com",
            "name": "Emil Ernerfeldt",
            "username": "emilk"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "432d7d212a910d6b6d4914d90abbd554c8f021ae",
          "message": "Make `StoreDb::entity_db` private (#3832)\n\n### What\r\nThis was a footgun that should not have been there.\r\n\r\n### Checklist\r\n* [x] I have read and agree to [Contributor\r\nGuide](https://github.com/rerun-io/rerun/blob/main/CONTRIBUTING.md) and\r\nthe [Code of\r\nConduct](https://github.com/rerun-io/rerun/blob/main/CODE_OF_CONDUCT.md)\r\n* [x] I've included a screenshot or gif (if applicable)\r\n* [x] I have tested [demo.rerun.io](https://demo.rerun.io/pr/3832) (if\r\napplicable)\r\n* [x] The PR title and labels are set such as to maximize their\r\nusefulness for the next release's CHANGELOG\r\n\r\n- [PR Build Summary](https://build.rerun.io/pr/3832)\r\n- [Docs\r\npreview](https://rerun.io/preview/244b0e9a041c2b9c56e335c6fc98cd220cc022d7/docs)\r\n<!--DOCS-PREVIEW-->\r\n- [Examples\r\npreview](https://rerun.io/preview/244b0e9a041c2b9c56e335c6fc98cd220cc022d7/examples)\r\n<!--EXAMPLES-PREVIEW-->\r\n- [Recent benchmark results](https://ref.rerun.io/dev/bench/)\r\n- [Wasm size tracking](https://ref.rerun.io/dev/sizes/)\r\n\r\n---------\r\n\r\nCo-authored-by: Antoine Beyeler <49431240+abey79@users.noreply.github.com>\r\nCo-authored-by: Antoine Beyeler <antoine@rerun.io>",
          "timestamp": "2023-10-12T16:12:48+02:00",
          "tree_id": "d35185ad93b145245bd311ac0f0969e26532940b",
          "url": "https://github.com/rerun-io/rerun/commit/432d7d212a910d6b6d4914d90abbd554c8f021ae"
        },
        "date": 1697122012517,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.34",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andreas@rerun.io",
            "name": "Andreas Reich",
            "username": "Wumpf"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8349f1104eae5d3465e369cbdf6f0287edc41ed8",
          "message": "Remove no longer used crate dependencies (#3844)\n\nTiny followup to #3825",
          "timestamp": "2023-10-13T09:26:34+02:00",
          "tree_id": "014a5fc5bb95aab190bcc4a05572c2c875ddbd46",
          "url": "https://github.com/rerun-io/rerun/commit/8349f1104eae5d3465e369cbdf6f0287edc41ed8"
        },
        "date": 1697184432175,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.34",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cr.rey.clement@gmail.com",
            "name": "Clement Rey",
            "username": "teh-cmc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6eb1cde1061d6c5f19f2ef88c536fceeccef9eb3",
          "message": "`--max-frame` support for tracking examples (#3835)\n\n- Fixes #1930",
          "timestamp": "2023-10-13T10:19:40+02:00",
          "tree_id": "b40258fc6c522ba118d4a374821e215bcc39e057",
          "url": "https://github.com/rerun-io/rerun/commit/6eb1cde1061d6c5f19f2ef88c536fceeccef9eb3"
        },
        "date": 1697186971966,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.34",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "emil.ernerfeldt@gmail.com",
            "name": "Emil Ernerfeldt",
            "username": "emilk"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4fe7d0b88701f8b0fe9a68e4c69cb63f8a8f9f8f",
          "message": "Expand C++ style guide (#3851)\n\n### What\r\nExpand C++ style guide with even more style choices.\r\n\r\n### Checklist\r\n* [x] I have read and agree to [Contributor\r\nGuide](https://github.com/rerun-io/rerun/blob/main/CONTRIBUTING.md) and\r\nthe [Code of\r\nConduct](https://github.com/rerun-io/rerun/blob/main/CODE_OF_CONDUCT.md)\r\n* [x] I've included a screenshot or gif (if applicable)\r\n* [x] I have tested [demo.rerun.io](https://demo.rerun.io/pr/3851) (if\r\napplicable)\r\n* [x] The PR title and labels are set such as to maximize their\r\nusefulness for the next release's CHANGELOG\r\n\r\n- [PR Build Summary](https://build.rerun.io/pr/3851)\r\n- [Docs\r\npreview](https://rerun.io/preview/01ad11ac921c4acd81c8be09266c16b0aa5db58e/docs)\r\n<!--DOCS-PREVIEW-->\r\n- [Examples\r\npreview](https://rerun.io/preview/01ad11ac921c4acd81c8be09266c16b0aa5db58e/examples)\r\n<!--EXAMPLES-PREVIEW-->\r\n- [Recent benchmark results](https://ref.rerun.io/dev/bench/)\r\n- [Wasm size tracking](https://ref.rerun.io/dev/sizes/)\r\n\r\n---------\r\n\r\nCo-authored-by: Andreas Reich <andreas@rerun.io>",
          "timestamp": "2023-10-13T11:36:31+02:00",
          "tree_id": "6a4b36372b881b53fbee122d8f07a94d61c4964e",
          "url": "https://github.com/rerun-io/rerun/commit/4fe7d0b88701f8b0fe9a68e4c69cb63f8a8f9f8f"
        },
        "date": 1697191614975,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.34",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andreas@rerun.io",
            "name": "Andreas Reich",
            "username": "Wumpf"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4556d4fec94f267cd74d387c4e757b0950c6ae76",
          "message": "C++ time & timeless support (#3838)\n\n### What\r\n\r\n* Fixes #3394\r\n\r\nIntroduces time methods to C/C++, timeless logging and ports the clock\r\nexample.\r\n\r\nOriginally, I planned to expose a Timeline struct type to C but this\r\nactually created more surface for errors to occur, so I instead expose\r\nthe three time setter for seconds/nanos/sequences separately, making the\r\ncode much easier to reason with.\r\n\r\n<img width=\"1421\" alt=\"image\"\r\nsrc=\"https://github.com/rerun-io/rerun/assets/1220815/a21ab48e-7ced-4dc2-85bc-77e8d99eb452\">\r\n\r\n\r\n### Checklist\r\n* [x] I have read and agree to [Contributor\r\nGuide](https://github.com/rerun-io/rerun/blob/main/CONTRIBUTING.md) and\r\nthe [Code of\r\nConduct](https://github.com/rerun-io/rerun/blob/main/CODE_OF_CONDUCT.md)\r\n* [x] I've included a screenshot or gif (if applicable)\r\n* [x] I have tested [demo.rerun.io](https://demo.rerun.io/pr/3838) (if\r\napplicable)\r\n* [x] The PR title and labels are set such as to maximize their\r\nusefulness for the next release's CHANGELOG\r\n\r\n- [PR Build Summary](https://build.rerun.io/pr/3838)\r\n- [Docs\r\npreview](https://rerun.io/preview/81bd132335ca725ae0c2a1fb2c42156f5b1986d3/docs)\r\n<!--DOCS-PREVIEW-->\r\n- [Examples\r\npreview](https://rerun.io/preview/81bd132335ca725ae0c2a1fb2c42156f5b1986d3/examples)\r\n<!--EXAMPLES-PREVIEW-->\r\n- [Recent benchmark results](https://ref.rerun.io/dev/bench/)\r\n- [Wasm size tracking](https://ref.rerun.io/dev/sizes/)",
          "timestamp": "2023-10-13T12:30:36+02:00",
          "tree_id": "324993cc01a8e51033a8031e90156ec9dd070cf0",
          "url": "https://github.com/rerun-io/rerun/commit/4556d4fec94f267cd74d387c4e757b0950c6ae76"
        },
        "date": 1697195535183,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.34",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jeremy@rerun.io",
            "name": "Jeremy Leibs",
            "username": "jleibs"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ca078faed6af31e54d326eae0a45fe0951caf20e",
          "message": "Add `pixi` to run codegen in a portable way (#3707)\n\n### What\r\n* Part of https://github.com/rerun-io/rerun/issues/3717\r\n\r\nAdd a proof-of-concept `pixi.toml` file for the project.\r\n\r\nThis is like Just but also takes care of dependency management for us.\r\nNo need to run `setup_dev.sh` or `pip install -r\r\nscripts/requirements-dev.txt`.\r\n\r\nThis even manages the installation of `arrow-cpp` for us.\r\n\r\nJust:\r\n```\r\ncargo install pixi\r\n```\r\n\r\nThen have fun:\r\n```\r\npixi run codegen\r\npixi run py-test\r\npixi run cpp-test\r\n```\r\n\r\nVerified this works in a clean Ubuntu-20.04 docker container. \r\n\r\n### Checklist\r\n* [x] I have read and agree to [Contributor\r\nGuide](https://github.com/rerun-io/rerun/blob/main/CONTRIBUTING.md) and\r\nthe [Code of\r\nConduct](https://github.com/rerun-io/rerun/blob/main/CODE_OF_CONDUCT.md)\r\n* [x] I've included a screenshot or gif (if applicable)\r\n* [x] I have tested [demo.rerun.io](https://demo.rerun.io/pr/3707) (if\r\napplicable)\r\n\r\n- [PR Build Summary](https://build.rerun.io/pr/3707)\r\n- [Docs\r\npreview](https://rerun.io/preview/071e0d4c0cff28c2262b966d985cf0f68ad9f456/docs)\r\n<!--DOCS-PREVIEW-->\r\n- [Examples\r\npreview](https://rerun.io/preview/071e0d4c0cff28c2262b966d985cf0f68ad9f456/examples)\r\n<!--EXAMPLES-PREVIEW-->\r\n- [Recent benchmark results](https://ref.rerun.io/dev/bench/)\r\n- [Wasm size tracking](https://ref.rerun.io/dev/sizes/)\r\n\r\n---------\r\n\r\nCo-authored-by: Emil Ernerfeldt <emil.ernerfeldt@gmail.com>\r\nCo-authored-by: Andreas Reich <r_andreas2@web.de>",
          "timestamp": "2023-10-16T09:26:16+02:00",
          "tree_id": "decf48962b0823621f74b948bc1f0e85ecca610f",
          "url": "https://github.com/rerun-io/rerun/commit/ca078faed6af31e54d326eae0a45fe0951caf20e"
        },
        "date": 1697443572052,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Wasm",
            "value": "15.34",
            "unit": "MiB"
          },
          {
            "name": "JS",
            "value": "113.32",
            "unit": "kiB"
          },
          {
            "name": "arkit_scenes.rrd",
            "value": "40.37",
            "unit": "MiB"
          },
          {
            "name": "detect_and_track_objects.rrd",
            "value": "55.19",
            "unit": "MiB"
          },
          {
            "name": "dicom_mri.rrd",
            "value": "63.36",
            "unit": "MiB"
          },
          {
            "name": "dna.rrd",
            "value": "0.62",
            "unit": "MiB"
          },
          {
            "name": "human_pose_tracking.rrd",
            "value": "54.41",
            "unit": "MiB"
          },
          {
            "name": "plots.rrd",
            "value": "0.19",
            "unit": "MiB"
          },
          {
            "name": "structure_from_motion.rrd",
            "value": "6.85",
            "unit": "MiB"
          }
        ]
      }
    ]
  }
}