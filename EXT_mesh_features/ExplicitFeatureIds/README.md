# Explicit Feature IDs

This sample demonstrates usage of the [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) extension for storing feature IDs for vertices of a mesh.

The sample contains a glTF asset with a single mesh primitive. The mesh primitive consists of 4 quads (each formed by 2 triangles). The vertices in this mesh primitive have the usual `POSITION` and `NORMAL` vertex attributes. Additionally, they have a `FEATURE_ID_0` vertex attribute. This attribute defines [Feature IDs as a vertex attribute](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features#vertex-attribute) for each vertex: The `FEATURE_ID_0` vertex attribute refers to the glTF accessor with index 3. This is a standard glTF accessor with type `"SCALAR"` and component type `UNSIGNED_BYTE`.

The following image shows the mesh primitive with its vertices, their indices, and their feature IDs:

![Image](screenshot/EXT_mesh_features-quads.png)


## Example sandcastle

(This will be added soon)


## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)









