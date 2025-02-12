// Log some simple 2D boxes.

#include <rerun.hpp>

int main() {
    auto rec = rerun::RecordingStream("rerun_example_box2d");
    rec.connect("127.0.0.1:9876").throw_on_failure();

    rec.log("simple", rerun::Boxes2D::from_mins_and_sizes({{-1.f, -1.f}}, {{2.f, 2.f}}));

    // Log an extra rect to set the view bounds
    rec.log("bounds", rerun::Boxes2D::from_sizes({{4.f, 3.f}}));
}
