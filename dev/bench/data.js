window.BENCHMARK_DATA = {
  "lastUpdate": 1697442039316,
  "repoUrl": "https://github.com/rerun-io/rerun",
  "entries": {
    "Rust Benchmark": [
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
        "date": 1697105465437,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3077072,
            "range": "± 5653",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 392,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 305,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 427,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3118901,
            "range": "± 6025",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1875216,
            "range": "± 6763",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 18579537,
            "range": "± 400048",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 136075506,
            "range": "± 517597",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 167677194,
            "range": "± 598064",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 330965301,
            "range": "± 2927659",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 201235490,
            "range": "± 1077251",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 60023798,
            "range": "± 652905",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 270925774,
            "range": "± 1102382",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14272047,
            "range": "± 25179",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3165690,
            "range": "± 20186",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 508880,
            "range": "± 17139",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 18803001,
            "range": "± 107262",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 416995,
            "range": "± 1072",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7723835,
            "range": "± 11355",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8167379,
            "range": "± 17241",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 144003,
            "range": "± 280",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5651,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 89934,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 246948,
            "range": "± 321",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 38167,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2239,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 42079,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1865901646,
            "range": "± 14363684",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1243182,
            "range": "± 7218",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1853709128,
            "range": "± 7064796",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1331111,
            "range": "± 5029",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1212286,
            "range": "± 6189",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3832,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1223574,
            "range": "± 2915",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 29569,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697114447746,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3108885,
            "range": "± 16197",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 394,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 307,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 431,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3113010,
            "range": "± 61518",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1812683,
            "range": "± 40801",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 18759286,
            "range": "± 718772",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 139001278,
            "range": "± 1371406",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 166369126,
            "range": "± 1893702",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 330243641,
            "range": "± 2499828",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 201171605,
            "range": "± 3044941",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 61821835,
            "range": "± 1677013",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 267688391,
            "range": "± 3341150",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14390230,
            "range": "± 285242",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3121124,
            "range": "± 540348",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 497293,
            "range": "± 3802",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 19033181,
            "range": "± 477075",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 416065,
            "range": "± 2916",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7708530,
            "range": "± 82864",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8175789,
            "range": "± 19881",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 141455,
            "range": "± 3005",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5619,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 89922,
            "range": "± 223",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 244701,
            "range": "± 738",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 36948,
            "range": "± 164",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2307,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 40825,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1828813923,
            "range": "± 9106574",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1255777,
            "range": "± 8156",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1881052693,
            "range": "± 8916130",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1334845,
            "range": "± 23070",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1220541,
            "range": "± 6085",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3805,
            "range": "± 268",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1247304,
            "range": "± 9163",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 29600,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "132550499+rerun-bot@users.noreply.github.com",
            "name": "rerun-bot",
            "username": "rerun-bot"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a8b7c46e8bdd28f842681ac8a81a8937af30bc46",
          "message": "release 0.9.1 (#3831)\n\n### Next steps\r\n\r\n- Test the release\r\n- If this is an `alpha` release, you can just merge the pull request.\r\n- Otherwise:\r\n  - For any added commits, run the release workflow in `rc` mode again\r\n  - After testing, run the release workflow in `release` mode\r\n- Once the final release workflow finishes, [create a GitHub\r\nrelease](https://github.com/rerun-io/rerun/releases/new)\r\n- Tests\r\n  - [x] Windows\r\n  - [x] Linux\r\n  - [x] MacOS\r\n\r\n---------\r\n\r\nCo-authored-by: Emil Ernerfeldt <emil.ernerfeldt@gmail.com>\r\nCo-authored-by: Jan Procházka <1665677+jprochazk@users.noreply.github.com>\r\nCo-authored-by: Clement Rey <cr.rey.clement@gmail.com>",
          "timestamp": "2023-10-12T15:36:36+02:00",
          "tree_id": "0729ce599722666a0c31aa2dd68b7dcea0cdff96",
          "url": "https://github.com/rerun-io/rerun/commit/a8b7c46e8bdd28f842681ac8a81a8937af30bc46"
        },
        "date": 1697118511717,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3089878,
            "range": "± 4736",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 388,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 307,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 440,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3150409,
            "range": "± 6892",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1846461,
            "range": "± 7466",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 18712463,
            "range": "± 261192",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 134782023,
            "range": "± 502709",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 171375188,
            "range": "± 697491",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 332950512,
            "range": "± 2292369",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 199093925,
            "range": "± 587511",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 58515426,
            "range": "± 1482396",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 269191197,
            "range": "± 895668",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14405180,
            "range": "± 25631",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3228247,
            "range": "± 7812",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 508950,
            "range": "± 3661",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 19150120,
            "range": "± 71548",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 414500,
            "range": "± 811",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7649190,
            "range": "± 12121",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8145945,
            "range": "± 8939",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 134977,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5611,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 90179,
            "range": "± 173",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 240570,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 37800,
            "range": "± 56",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2257,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 41580,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1831080113,
            "range": "± 5422286",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1299335,
            "range": "± 5957",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1852432036,
            "range": "± 4999414",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1356526,
            "range": "± 5903",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1186985,
            "range": "± 7799",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3644,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1198657,
            "range": "± 8531",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 30642,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
          "id": "2f23c527a497e19f598bcf934767a7b5f5f43f27",
          "message": "Improve comments from #3822 (#3836)\n\n### What\r\nAddress some PR concerns from:\r\n -  #3822\r\n\r\n### Checklist\r\n* [x] I have read and agree to [Contributor\r\nGuide](https://github.com/rerun-io/rerun/blob/main/CONTRIBUTING.md) and\r\nthe [Code of\r\nConduct](https://github.com/rerun-io/rerun/blob/main/CODE_OF_CONDUCT.md)\r\n* [x] I've included a screenshot or gif (if applicable)\r\n* [x] I have tested [demo.rerun.io](https://demo.rerun.io/pr/3836) (if\r\napplicable)\r\n* [x] The PR title and labels are set such as to maximize their\r\nusefulness for the next release's CHANGELOG\r\n\r\n- [PR Build Summary](https://build.rerun.io/pr/3836)\r\n- [Docs\r\npreview](https://rerun.io/preview/9926b13d4f8bc925e37b506f46540058df211249/docs)\r\n<!--DOCS-PREVIEW-->\r\n- [Examples\r\npreview](https://rerun.io/preview/9926b13d4f8bc925e37b506f46540058df211249/examples)\r\n<!--EXAMPLES-PREVIEW-->\r\n- [Recent benchmark results](https://ref.rerun.io/dev/bench/)\r\n- [Wasm size tracking](https://ref.rerun.io/dev/sizes/)",
          "timestamp": "2023-10-12T15:56:40+02:00",
          "tree_id": "9f82ac2c09d69e6322a4dcdb52858e8cbcf0e805",
          "url": "https://github.com/rerun-io/rerun/commit/2f23c527a497e19f598bcf934767a7b5f5f43f27"
        },
        "date": 1697119724603,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3083046,
            "range": "± 8694",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 391,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 305,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 442,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3097880,
            "range": "± 4729",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1868919,
            "range": "± 8054",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 18854793,
            "range": "± 536123",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 130713455,
            "range": "± 551769",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 165463093,
            "range": "± 1241044",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 320936160,
            "range": "± 2333508",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 196434472,
            "range": "± 512049",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 57361530,
            "range": "± 449351",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 265354108,
            "range": "± 1074592",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14991003,
            "range": "± 28140",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3186731,
            "range": "± 11797",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 529772,
            "range": "± 5925",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 19215372,
            "range": "± 61404",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 429773,
            "range": "± 1098",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7807479,
            "range": "± 12074",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8300855,
            "range": "± 28066",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 136397,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5546,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 89918,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 239653,
            "range": "± 384",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 36944,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2269,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 41747,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1809187563,
            "range": "± 6409227",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1267211,
            "range": "± 11965",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1838400184,
            "range": "± 4160992",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1316553,
            "range": "± 6693",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1202511,
            "range": "± 6941",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3634,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1219006,
            "range": "± 9636",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 30697,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697120664058,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 2953510,
            "range": "± 61073",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 378,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 285,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 408,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 2886271,
            "range": "± 53211",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1755018,
            "range": "± 41954",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 19016792,
            "range": "± 613412",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 136851057,
            "range": "± 635393",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 166161175,
            "range": "± 2306602",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 320301300,
            "range": "± 3751217",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 189203130,
            "range": "± 2529605",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 57688446,
            "range": "± 2063649",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 252305199,
            "range": "± 3040327",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 13658629,
            "range": "± 201604",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 2936278,
            "range": "± 33739",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 487633,
            "range": "± 5359",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 17500689,
            "range": "± 278260",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 379456,
            "range": "± 8323",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7009959,
            "range": "± 98318",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 7398330,
            "range": "± 54809",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 123505,
            "range": "± 1421",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5333,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 82559,
            "range": "± 910",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 220389,
            "range": "± 6987",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 34302,
            "range": "± 340",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2062,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 38000,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1764054736,
            "range": "± 8599515",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1199002,
            "range": "± 28608",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1791219313,
            "range": "± 66341758",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1257947,
            "range": "± 12974",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1099941,
            "range": "± 10017",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3352,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1123482,
            "range": "± 12752",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 26918,
            "range": "± 176",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697182796758,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3108127,
            "range": "± 42412",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 407,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 299,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 419,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3114219,
            "range": "± 33774",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1865350,
            "range": "± 18586",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 21007051,
            "range": "± 1282503",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 135943450,
            "range": "± 1839774",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 169493564,
            "range": "± 1300607",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 335355202,
            "range": "± 4084726",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 203039426,
            "range": "± 1902907",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 62203622,
            "range": "± 2098282",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 271291779,
            "range": "± 3228491",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14768282,
            "range": "± 529938",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3161190,
            "range": "± 124675",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 531198,
            "range": "± 1758",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 19190192,
            "range": "± 464369",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 406279,
            "range": "± 3257",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7625133,
            "range": "± 59080",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8042766,
            "range": "± 62181",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 133629,
            "range": "± 246",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5598,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 90685,
            "range": "± 375",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 238788,
            "range": "± 619",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 37232,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2208,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 41005,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1804146424,
            "range": "± 8692653",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1287865,
            "range": "± 8234",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1821331606,
            "range": "± 5629367",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1334595,
            "range": "± 18449",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1194708,
            "range": "± 3130",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3624,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1214253,
            "range": "± 7019",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 30733,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697185920882,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3156185,
            "range": "± 69421",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 409,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 302,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 431,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3334510,
            "range": "± 59171",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1873935,
            "range": "± 14550",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 25167917,
            "range": "± 1124221",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 140338102,
            "range": "± 1921187",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 171490917,
            "range": "± 1328535",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 341689458,
            "range": "± 4601571",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 207868064,
            "range": "± 2099489",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 67577732,
            "range": "± 2010783",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 282957543,
            "range": "± 3841682",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 16178730,
            "range": "± 1223377",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3327120,
            "range": "± 120595",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 512853,
            "range": "± 11809",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 21012987,
            "range": "± 693508",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 407541,
            "range": "± 1072",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7779504,
            "range": "± 75150",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8252028,
            "range": "± 164765",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 134709,
            "range": "± 221",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5714,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 91501,
            "range": "± 456",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 241676,
            "range": "± 1348",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 38686,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2203,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 41327,
            "range": "± 268",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1810271706,
            "range": "± 5211134",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1260143,
            "range": "± 10650",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1824111028,
            "range": "± 5513270",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1336229,
            "range": "± 6799",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1202861,
            "range": "± 5594",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3618,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1214392,
            "range": "± 4996",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 29172,
            "range": "± 75",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697190578156,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3054049,
            "range": "± 5086",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 387,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 298,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 418,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3090886,
            "range": "± 3280",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1890591,
            "range": "± 10047",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 18962273,
            "range": "± 469457",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 134472162,
            "range": "± 1535632",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 165715918,
            "range": "± 1483159",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 324661636,
            "range": "± 3497192",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 197775231,
            "range": "± 1945273",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 57324359,
            "range": "± 1033862",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 262343472,
            "range": "± 1842373",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14296982,
            "range": "± 23414",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3104258,
            "range": "± 9726",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 528887,
            "range": "± 1191",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 18640755,
            "range": "± 79134",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 405080,
            "range": "± 1240",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7704980,
            "range": "± 17401",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8120115,
            "range": "± 14996",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 133771,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5628,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 88961,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 237813,
            "range": "± 358",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 37066,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2195,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 40872,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1842095726,
            "range": "± 14348647",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1269461,
            "range": "± 7533",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1878138443,
            "range": "± 7993441",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1330768,
            "range": "± 6013",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1230159,
            "range": "± 3692",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3603,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1246092,
            "range": "± 9339",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 29112,
            "range": "± 41",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697193838595,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3064142,
            "range": "± 10394",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 384,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 299,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 424,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3093743,
            "range": "± 48162",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1869798,
            "range": "± 8615",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 19089237,
            "range": "± 481137",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 134911917,
            "range": "± 693516",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 166076675,
            "range": "± 868895",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 325740589,
            "range": "± 2229306",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 201961186,
            "range": "± 1115061",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 57979878,
            "range": "± 868197",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 270153992,
            "range": "± 1330989",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14474860,
            "range": "± 49269",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3142203,
            "range": "± 13574",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 506986,
            "range": "± 12935",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 18837583,
            "range": "± 474851",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 405418,
            "range": "± 909",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7619723,
            "range": "± 8807",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 7978733,
            "range": "± 39406",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 133825,
            "range": "± 143",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5777,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 91036,
            "range": "± 3624",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 240070,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 38283,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2242,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 42227,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1843738170,
            "range": "± 9679788",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1276469,
            "range": "± 22224",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1846546687,
            "range": "± 4816679",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1339249,
            "range": "± 6060",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1209694,
            "range": "± 12265",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3704,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1223106,
            "range": "± 5068",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 29120,
            "range": "± 44",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
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
        "date": 1697442031969,
        "tool": "cargo",
        "benches": [
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/insert/default",
            "value": 3094434,
            "range": "± 9640",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at/default",
            "value": 386,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/primary/default",
            "value": 315,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/latest_at_missing/secondaries/default",
            "value": 439,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/packed=false/range/default",
            "value": 3144489,
            "range": "± 30389",
            "unit": "ns/iter"
          },
          {
            "name": "datastore/num_rows=1000/num_instances=1000/gc/default",
            "value": 1861728,
            "range": "± 25608",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_message_bundles",
            "value": 21393241,
            "range": "± 820909",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/generate_messages",
            "value": 139527647,
            "range": "± 2995277",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_log_msg",
            "value": 168407752,
            "range": "± 1476706",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/encode_total",
            "value": 333972218,
            "range": "± 5708390",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_log_msg",
            "value": 203360671,
            "range": "± 3198554",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_message_bundles",
            "value": 63877117,
            "range": "± 2328309",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow/decode_total",
            "value": 273527208,
            "range": "± 2591925",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_message_bundles",
            "value": 14886050,
            "range": "± 1228207",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/generate_messages",
            "value": 3119091,
            "range": "± 31877",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_log_msg",
            "value": 518309,
            "range": "± 2372",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/encode_total",
            "value": 19724363,
            "range": "± 687458",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_log_msg",
            "value": 406387,
            "range": "± 802",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_message_bundles",
            "value": 7583907,
            "range": "± 193974",
            "unit": "ns/iter"
          },
          {
            "name": "mono_points_arrow_batched/decode_total",
            "value": 8018167,
            "range": "± 74120",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_message_bundles",
            "value": 135055,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/generate_messages",
            "value": 5671,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_log_msg",
            "value": 90755,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/encode_total",
            "value": 239387,
            "range": "± 494",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_log_msg",
            "value": 38421,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_message_bundles",
            "value": 2224,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "batch_points_arrow/decode_total",
            "value": 40862,
            "range": "± 387",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/insert",
            "value": 1807694517,
            "range": "± 7162192",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_points2/query",
            "value": 1270752,
            "range": "± 4000",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/insert",
            "value": 1808861774,
            "range": "± 12889693",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_mono_strings2/query",
            "value": 1339143,
            "range": "± 5594",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/insert",
            "value": 1197419,
            "range": "± 9847",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_points2/query",
            "value": 3699,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/insert",
            "value": 1216422,
            "range": "± 4422",
            "unit": "ns/iter"
          },
          {
            "name": "arrow_batch_strings2/query",
            "value": 29084,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "tuid/Tuid::random",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}