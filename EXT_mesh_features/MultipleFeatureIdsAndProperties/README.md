# Multiple Feature IDs and Properties

This sample demonstrates usage of the [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) extension for storing feature IDs and properties associated with vertices of a mesh.

The sample contains a glTF asset with a single mesh primitive. The mesh primitive consists of 4 quads (each formed by 2 triangles). The vertices in this mesh primitive have the usual `POSITION` and `NORMAL` vertex attributes. 

### Feature IDs

Each vertex has two _feature IDs_. The first feature ID is given _implicitly_ (as in the [ImplicitFeatureIds](../ImplicitFeatureIds#feature-ids) example). The second feature ID is given _explicitly_, with a vertex attribute (as in the [ExplicitFeatureIds](../ExplicitFeatureIds#feature-ids) example).

The vertex indices and their feature IDs are listed in this table:

Vertex Index | Implicit Feature ID | Explicit Feature ID 
|----|---|---|
|  0 | 0 | 3 |
|  1 | 0 | 3 |
|  2 | 0 | 3 |
|  3 | 0 | 3 |
|  4 | 1 | 2 |
|  5 | 1 | 2 |
|  6 | 1 | 2 |
|  7 | 1 | 2 |
|  8 | 2 | 1 |
|  9 | 2 | 1 |
| 10 | 2 | 1 |
| 11 | 2 | 1 |
| 12 | 3 | 0 |
| 13 | 3 | 0 |
| 14 | 3 | 0 |
| 15 | 3 | 0 |

Additionally, this sample defines metadata that is associated with the feature IDs. 

### Metadata Structure

The structure of the metadata is defined with an [`EXT_mesh_features` schema](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features#schema-definitions) that contains a single class. The class contains two properties. The first one called `example_VEC3_FLOAT32`, and is a 3D vector with 32 bit floating-point components. The second one is called `example_STRING`, and represents a single string.

### Metadata Instances

The actual instances of this class, which are associated with the feature IDs, are defined with a [property table](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features#property-tables). The rows of this table correspond to the feature IDs. The columns of this table correspond to the properties of the class. The data for each column is stored in a standard glTF `bufferView`. 

Based on the type information from the metadata class, the contents of this buffer view is interpreted as four 3D vectors with 32 bit floating point components, and four strings, respectively:

```JSON
"example_VEC3_FLOAT32" : [
    0.0, 0.1, 0.2,
    1.0, 1.1, 1.2,
    2.0, 2.1, 2.2,
    3.0, 3.1, 3.2
],
"example_STRING" : [
    "Rain 🌧",
    "Thunder ⛈",
    "Sun ☀",
    "Snow 🌨"
]
```

## Example Sandcastle

This example can be viewed with the [common `EXT_mesh_features` sandcastle](../#common-sandcastle-code)


## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)









