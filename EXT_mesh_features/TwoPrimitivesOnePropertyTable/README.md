# Two Primitives, One Property Table

This sample demonstrates usage of the [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) extension for storing feature IDs and properties associated with vertices of a mesh.

The sample contains a glTF asset with two mesh primitives. Both mesh primitives have the same structure, which is shown in this image, including the vertex indices and the feature IDs of the vertices:

![Image](screenshot/EXT_mesh_features-quads.png)

### Metadata Structure and Instances

The structure and instances of the metadata in this example are the same as in the [ExplicitFeatureIdsAndSimpleProperty](../ExplicitFeatureIdsAndSimpleProperty#metadata-structure) example. But in this case, the _single_ property table is associated with the feature IDs for _both_ mesh primitives, showing that it is possible to re-use properties across multiple primitives in a single glTF asset. 

## Example Sandcastle

(This will be added soon)


## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)









