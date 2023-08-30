# Tileset with full Metadata

This sample demonstrates the types of metadata that may be associated with entities, based on the type system that is defined in the [3D Metadata Specification](https://github.com/CesiumGS/3d-tiles/tree/main/specification/Metadata).

![TilesetWithFullsetMetadata](screenshot/TilesetWithFullMetadata.png)

<sup>This example does not have any visual elements. The above screenshot is symbolic for the output on the console.</sup>

The example contains a tileset that only stores metadata. The tileset contains a schema and a metadata entity, both covering all possible property types:

- Single properties with types `STRING`, `BOOLEAN`, and `ENUM`
- Single (`SCALAR`) properties with all numeric component types `UINT8`, `INT8`, `UINT16`, `INT16`, `UINT32`, `INT32`, `UINT64`, `INT64`, `FLOAT32`, `FLOAT64`
- Compound types `VEC2`, `VEC3`, `VEC4`, `MAT2`, `MAT3`, and `MAT4`, with all numeric component types
- Arrays with all component types, once with fixed length and once with dynamic length
- All integer component types are once used in normalized and once in non-normalized form

This results in 387 properties with different types. The following sandcastle iterates over all these properties, and prints the property values as they are stored in the tileset metadata:

```JavaScript
const viewer = new Cesium.Viewer("cesiumContainer");

// Load the tileset from a local server
const tileset = viewer.scene.primitives.add(
  await Cesium.Cesium3DTileset.fromUrl(
    "http://localhost:8003/1.1/TilesetWithFullMetadata/tileset.json"
  )
);

/**
 * Print the values of all properties in the given metadata entity,
 * by iterating over all classes and properties in the given schema,
 * and obtaining the values of these properties from the given
 * metadata entity.
 *
 * @param {MetadataSchema} schema The schema
 * @param {MetadataEntity} entity The entity
 */
function printMetadata(schema, entity) {
  // Iterate over all classes of the schema
  const classes = schema.classes;
  for (let metadataClassId in classes) {
    if (classes.hasOwnProperty(metadataClassId)) {
      const metadataClass = classes[metadataClassId];

      // Iterate over all properties of the class
      const properties = metadataClass.properties;
      for (let metadataClassPropertyId in properties) {
        if (properties.hasOwnProperty(metadataClassPropertyId)) {
          // Obtain the value of each property from the
          // metadata entity, and print it to the console
          const value = entity.getProperty(metadataClassPropertyId);
          console.log(
            "Property with name '" +
              metadataClassPropertyId +
              "' " +
              "has value " +
              value,
            value
          );
        }
      }
    }
  }
}

// Print the metadata of the tileset
printMetadata(tileset.schema, tileset.metadata);
```
