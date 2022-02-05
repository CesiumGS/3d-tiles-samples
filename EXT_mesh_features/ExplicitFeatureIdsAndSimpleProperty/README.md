# Explicit Feature IDs and Simple Property

This sample demonstrates usage of the [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) extension for storing feature IDs and properties associated with vertices of a mesh.

### Feature IDs

The basic structure and definition of the feature IDs for this example is the same as for the [ExplicitFeatureIds](../ExplicitFeatureIds#feature-ids) example.

Additionally, this sample defines metadata that is associated with the feature IDs. The metadata in this example is the same as in the [ImplicitFeatureIdsAndSimpleProperty](../ImplicitFeatureIdsAndSimpleProperty/) example.

### Metadata Structure

The structure of the metadata is defined with an [`EXT_mesh_features` schema](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features#schema-definitions) that contains a single class. The class only contains a single property, called `example_VEC3_FLOAT32`. The type of this property is a 3D vector with 32 bit floating-point components, as indicated by the type `"VEC3"` and the component type `"FLOAT32"`. 

### Metadata Instances

The actual instances of this class, which are associated with the feature IDs, are defined with a [property table](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features#property-tables). The rows of this table correspond to the feature IDs. The columns of this table correspond to the properties of the class. The data for each column is stored in a standard glTF `bufferView`. 

Based on the type information from the metadata class, the contents of this buffer view is interpreted as four 3D vectors with 32 bit floating point components:

```JSON
"example_VEC3_FLOAT32" : [
  0.0, 0.1, 0.2,
  1.0, 1.1, 1.2,
  2.0, 2.1, 2.2,
  3.0, 3.1, 3.2
]
```

## Screenshot

![Image](screenshot/screenshot.png)

## Example Sandcastle

This example can be viewed with the [common `EXT_mesh_features` sandcastle](../#common-sandcastle-code)


## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
