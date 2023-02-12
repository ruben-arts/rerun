#[cfg(feature = "import-obj")]
pub mod obj;

#[cfg(feature = "import-gltf")]
pub mod gltf;

use crate::renderer::MeshInstance;

pub fn calculate_bounding_box(instances: &[MeshInstance]) -> macaw::BoundingBox {
    macaw::BoundingBox::from_points(
        instances
            .iter()
            .filter_map(|mesh_instance| {
                mesh_instance.mesh.as_ref().map(|mesh| {
                    mesh.vertex_positions
                        .iter()
                        .map(|p| mesh_instance.world_from_mesh.transform_point3(*p))
                })
            })
            .flatten(),
    )
}
