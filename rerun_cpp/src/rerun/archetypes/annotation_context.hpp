// DO NOT EDIT! This file was auto-generated by crates/re_types_builder/src/codegen/cpp/mod.rs
// Based on "crates/re_types/definitions/rerun/archetypes/annotation_context.fbs".

#pragma once

#include "../component_batch.hpp"
#include "../components/annotation_context.hpp"
#include "../data_cell.hpp"
#include "../indicator_component.hpp"
#include "../result.hpp"

#include <cstdint>
#include <utility>
#include <vector>

namespace rerun {
    namespace archetypes {
        /// **Archetype**: The `AnnotationContext` provides additional information on how to display
        /// entities.
        ///
        /// Entities can use `ClassId`s and `KeypointId`s to provide annotations, and
        /// the labels and colors will be looked up in the appropriate
        /// `AnnotationContext`. We use the *first* annotation context we find in the
        /// path-hierarchy when searching up through the ancestors of a given entity
        /// path.
        struct AnnotationContext {
            /// List of class descriptions, mapping class indices to class names, colors etc.
            rerun::components::AnnotationContext context;

            /// Name of the indicator component, used to identify the archetype when converting to a
            /// list of components.
            static const char INDICATOR_COMPONENT_NAME[];
            /// Indicator component, used to identify the archetype when converting to a list of
            /// components.
            using IndicatorComponent = components::IndicatorComponent<INDICATOR_COMPONENT_NAME>;

          public:
            AnnotationContext() = default;
            AnnotationContext(AnnotationContext&& other) = default;

            explicit AnnotationContext(rerun::components::AnnotationContext _context)
                : context(std::move(_context)) {}

            /// Returns the number of primary instances of this archetype.
            size_t num_instances() const {
                return 1;
            }
        };

    } // namespace archetypes

    template <typename T>
    struct AsComponents;

    template <>
    struct AsComponents<archetypes::AnnotationContext> {
        /// Serialize all set component batches.
        static Result<std::vector<SerializedComponentBatch>> serialize(
            const archetypes::AnnotationContext& archetype
        );
    };
} // namespace rerun
