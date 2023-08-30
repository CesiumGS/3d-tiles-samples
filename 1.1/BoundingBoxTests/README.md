# Bounding Box Tests

Sample tilesets that embed single, simple glTF models into a tileset, and showing the appropriate tileset bounding volumes for the respective glTF bounding volumes.

## Screenshot

![BoundingBoxTests](screenshot/BoundingBoxTests.gif)

## Structure

The directory contains six different tilesets, each with a single glTF asset. The assets and directories are named based on the bounding volumes of the models, given as the minimum- and maximum points:

- (0,0,0) - (1,1,2)
- (0,0,0) - (1,2,1)
- (0,0,0) - (2,1,1)
- (0,0,2) - (1,1,4)
- (0,2,0) - (1,4,1)
- (2,0,0) - (4,1,1)

## Conversion

The code for computing the tile- or tileset bounding volume from the mimimum- and maximum point of a glTF asset, taking into account the [y-up-to-z-up conversion](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up), is shown here:

```JavaScript
/**
 * Creates a bounding box for a tileset- or tile bounding volume.
 *
 * This is the center- and half-axis representation of the
 * `boundingVolume.box` that is described at
 * https://github.com/CesiumGS/3d-tiles/tree/main/specification#box,
 * computed from the minimum- and maximum point of a box.
 *
 * @param minX The minimum x
 * @param minY The minimum y
 * @param minZ The minimum z
 * @param maxX The maximum x
 * @param maxY The maximum y
 * @param maxZ The maximum z
 * @return The `boundingVolume.box`
 */
function createBoundingBox(
    minX, minY, minZ, 
    maxX, maxY, maxZ) {

  // The size of the box
  const dx = maxX - minX;
  const dy = maxY - minY;
  const dz = maxZ - minZ;

  // The center of the box
  const cx = minX + dx * 0.5;
  const cy = minY + dy * 0.5;
  const cz = minZ + dz * 0.5;

  // The x-direction and half length
  const hxx = dx * 0.5;
  const hxy = 0.0;
  const hxz = 0.0;

  // The y-direction and half length
  const hyx = 0.0;
  const hyy = dy * 0.5;
  const hyz = 0.0;

  // The z-direction and half length
  const hzx = 0.0;
  const hzy = 0.0;
  const hzz = dz * 0.5;

  const box = [
    cx, cy, cz, 
    hxx, hxy, hxz, 
    hyx, hyy, hyz, 
    hzx, hzy, hzz];
  return box;
}

/**
 * Creates a bounding box for a tileset- or tile bounding volume
 * from the minimum- and maximum point of a glTF asset.
 *
 * This is the center- and half-axis representation of the
 * `boundingVolume.box` that is described at
 * https://github.com/CesiumGS/3d-tiles/tree/main/specification#box,
 * computed from the minimum- and maximum point of a box.
 *
 * @param minX The minimum x
 * @param minY The minimum y
 * @param minZ The minimum z
 * @param maxX The maximum x
 * @param maxY The maximum y
 * @param maxZ The maximum z
 * @return The `boundingVolume.box`
 */
function createBoundingBoxFromGltf(
    minX, minY, minZ, 
    maxX, maxY, maxZ) {
        
  // Take into account the y-up-to-z-up transform:
  const tMinX = minX;
  const tMinY = -minZ;
  const tMinZ = minY;
  const tMaxX = maxX;
  const tMaxY = -maxZ;
  const tMaxZ = maxY;
  return createBoundingBox(
      tMinX, tMinY, tMinZ, 
      tMaxX, tMaxY, tMaxZ);
}
```


## Sandcastle Code

The Sandcastle code that can be used to view the test cases:

```JavaScript
const viewer = new Cesium.Viewer("cesiumContainer");

// Stores the tileset that is currently selected
let currentTileset;

// Creates the tileset for the sample with the given name.
async function createTileset(exampleName) {
  if (Cesium.defined(currentTileset)) {
    viewer.scene.primitives.remove(currentTileset);
    currentTileset = undefined;
  }
  // Create the tileset, and move it to a certain position on the globe
  currentTileset = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromUrl(
      `http://localhost:8003/1.1/BoundingBoxTests/${exampleName}/tileset.json`,
      {
        debugShowBoundingVolume: true,
      }
    )
  );
  currentTileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-75.152325, 39.94704, 0)
  );
  const offset = new Cesium.HeadingPitchRange(
    Cesium.Math.toRadians(-22.5),
    Cesium.Math.toRadians(-22.5),
    12.0
  );
  viewer.zoomTo(currentTileset, offset);
}

//============================================================================
// Sandcastle UI setup:

// Create one entry for the list of examples that can
// be selected in the dropdown menu. Selecting one of
// these will load the tileset for the sample with the
// given name, and display the given info text in the
// infoTextDisplay
function createSampleOption(name, infoText) {
  return {
    text: name,
    onselect: async function () {
      await createTileset(name);
    },
  };
}

// Create the list of available samples, and add them
// to the sandcastle toolbar
const sampleOptions = [
  createSampleOption("0_0_0-1_1_2", "0_0_0-1_1_2"),
  createSampleOption("0_0_0-1_2_1", "0_0_0-1_2_1"),
  createSampleOption("0_0_0-2_1_1", "0_0_0-2_1_1"),
  createSampleOption("0_0_2-1_1_4", "0_0_2-1_1_4"),
  createSampleOption("0_2_0-1_4_1", "0_2_0-1_4_1"),
  createSampleOption("2_0_0-4_1_1", "2_0_0-4_1_1"),
];
Sandcastle.addToolbarMenu(sampleOptions);
```

## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)


