
# Samples for glTF extensions 

The [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) extension is a glTF 2.0 extension that allows identifying geometry or subcomponents of geometry in glTF 2.0 assets as individual 'features', by associating them with a feature ID.

- [`FeatureIdAttribute`](EXT_mesh_features/FeatureIdAttribute/): Uses an attribute of a mesh primitive to assign feature IDs to vertices
- [`FeatureIdTexture`](EXT_mesh_features/FeatureIdTexture): Uses a feature ID texture, to assign feature IDs to texels on the surface of the geometry


The [`EXT_structural_metadata`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_structural_metadata) extension is a glTF 2.0 extension that allows storing structured metadata in glTF 2.0 assets in the form of _property tables_. Together with the [`EXT_mesh_features`] extension, the metadata can be looked up in these tables, using the feature IDs. 

- [`FeatureIdAttributeAndPropertyTable`](EXT_structural_metadata/FeatureIdAttributeAndPropertyTable): Feature IDs for the vertices, defined with a feature ID attribute, where each ID is associated with a 3D float vector property using a property table
- [`FeatureIdTextureAndPropertyTable`](EXT_structural_metadata/FeatureIdTextureAndPropertyTable): Feature IDs for the texels, defined with a feature ID texture, where each ID is associated with a 3D float vector property using a property table
> - [`MultipleFeatureIdsAndProperties`](EXT_structural_metadata/MultipleFeatureIdsAndProperties): Multiple feature IDs that can be activated separately, and are associated with metadata containing multiple properties

**TODO**: This is the old list

> - [`TwoPrimitivesOnePropertyTable`](TwoPrimitivesOnePropertyTable): Two mesh primitives that define feature IDs, where both refer to the same property table
> - [`MultipleClasses`](MultipleClasses): Multiple feature IDs that can be activated separately, and are associated with different metadata classes
> - [`ComplexTypes`](ComplexTypes): Features that contain properties with more complex types
> - [`SimplePropertyTexture`](SimplePropertyTexture): Properties that are stored in a texture, without feature IDs

Each directory contains a dedicated `.gltf` file that contains the actual glTF asset. Additionally, each directory also contains a simple `tileset.json` file that is a [3D Tiles](https://github.com/CesiumGS/3d-tiles) tileset which just contains the respective glTF asset as its only content. These tilesets can be viewed in CesiumJS, by hosting the base directory of this repository on a local server, and using the following Cesium Sandcastle code:

## Common Sandcastle Code

The sandcastle code for viewing these samples is shown in [glTF-Samples-Sandcastle.js](glTF-Samples-Sandcastle.js)


## Screenshot

![Image](figures/EXT_mesh_features_sandcastle_screenshot.png)

