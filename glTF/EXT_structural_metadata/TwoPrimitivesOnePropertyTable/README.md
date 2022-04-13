# Two Primitives, One Property Table

This sample demonstrates usage of the [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) extension for storing feature IDs that are associated with vertices of a mesh, and the [`EXT_structural_metadata`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_structural_metadata) extension for storing a property table with metadata that is looked up based on the feature IDs. 

The sample contains a glTF asset with two mesh primitives. Both mesh primitives have the same structure, which is shown in this image, including the vertex indices and the feature IDs of the vertices:

![Image](../../figures/EXT_mesh_features-quads.png)

### Metadata Structure and Entities

The structure and entities of the metadata in this example are the same as in the  [FeatureIdAttribute](../../EXT_mesh_features/FeatureIdAttribute/README.md#feature-ids) example. But in this case, the _single_ property table is associated with the feature IDs for _both_ mesh primitives, showing that it is possible to re-use property tables across multiple primitives in a single glTF asset. 

## Example Sandcastle

This example can be viewed with the [common sandcastle code](../../README.md#common-sandcastle-code).

## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
