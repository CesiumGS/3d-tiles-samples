# Multiple Contents

This sample demonstrates how to store multiple content objects in a single tile.

![MultipleContents](screenshot/MultipleContents.gif)

The root tile of the tileset contains a model, namely a simple plane with sine waves, in two different representations:

- A low-resolution representation as a textured triangle mesh glTF asset
- A high-resolution point-grid representation with vertex colors, as another glTF asset

The following sandcastle code renders this example tileset when it is hosted on a local server, and allows toggling the visibility of both representations:

```JavaScript
const viewer = new Cesium.Viewer("cesiumContainer");

// Flags that are connected to the Sandcastle toggle buttons,
// to show and hide the triangle- and point based content
let showTriangles = true;
let showPoints = true;

// The two different contents from the root tile. These are
// read in the 'tileLoad' event listener, and stored here
// for access from the Sandcastle UI
let trianglesContent;
let pointsContent;

// Create the tileset in the viewer, loading it from a local server
const tileset = viewer.scene.primitives.add(
  await Cesium.Cesium3DTileset.fromUrl(
    "http://localhost:8003/1.1/MultipleContents/tileset.json"
  )
);

// Move the tileset to a certain position on the globe,
// and scale it up
const transform = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(-75.152408, 39.9471, 1)
);
const scale = 15.0;
tileset.modelMatrix = Cesium.Matrix4.multiplyByUniformScale(
  transform,
  scale,
  new Cesium.Matrix4()
);

// Zoom to the tileset, with a small offset so that
// it is fully visible
const offset = new Cesium.HeadingPitchRange(
  0,
  Cesium.Math.toRadians(-67.5),
  40.0
);
viewer.zoomTo(tileset, offset);

// Attach the listener that will be notified when a tile is loaded.
// It will store the 'trianglesContent' and 'pointsContent' from
// the root tile, for later access
tileset.tileLoad.addEventListener(function (tile) {
  const content = tile.content;
  const innerContents = content.innerContents;
  if (Cesium.defined(innerContents) && innerContents.length === 2) {
    trianglesContent = innerContents[0];
    pointsContent = innerContents[1];
  }
});

// The toggle buttons for the Sandcastle, to show/hide the triangles-
// and points-based representation
Sandcastle.addToggleButton("Show triangles", showTriangles, function (checked) {
  showTriangles = checked;
  if (Cesium.defined(trianglesContent)) {
    // Show or hide the content by applying a style that
    // only defines the 'show' property, based on the
    // current state of the flag
    trianglesContent.applyStyle(
      new Cesium.Cesium3DTileStyle({
        show: showTriangles,
      })
    );
  }
});
Sandcastle.addToggleButton("Show points", showPoints, function (checked) {
  showPoints = checked;
  if (Cesium.defined(pointsContent)) {
    pointsContent.applyStyle(
      new Cesium.Cesium3DTileStyle({
        show: showPoints,
      })
    );
  }
});
```

## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
