# Multiple Contents

This sample demonstrates usage of the [`3DTILES_multiple_contents`](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_multiple_contents) extension for storing multiple contents objects in a single tile.

![MultipleContents](screenshot/MultipleContents.gif)

The root tile of the tileset contains a model, namely a simple plane with sine waves, in two different representations:

- A low-resolution representation as a textured triangle mesh glTF asset
- A high-resolution point-grid representation with vertex colors, as another glTF asset

The following sandcastle code renders this example tileset when it is hosted on a local server, and allows toggling the visibility of both representations:

```
// Enable experimental features for 3DTILES_multiple_contents support
Cesium.ExperimentalFeatures.enableModelExperimental = true;

var viewer = new Cesium.Viewer('cesiumContainer');

// Flags that are connected to the Sandcastle toggle buttons,
// to show and hide the triangle- and point based content
var showTriangles = true;
var showPoints = true;

// The two different contents from the root tile. These are
// read in the 'tileLoad' event listener, and stored here
// for access from the Sandcastle UI
var trianglesContent;
var pointsContent;

// Position the tileset on the globe.
var position = Cesium.Cartesian3.fromDegrees(-75.1596759, 39.9509025, 0.25);
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

// Load the tileset from a local server
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:8003/tileset.json',
    modelMatrix : modelMatrix
}));
viewer.zoomTo(tileset);

// Attach the listener that will be notified when a tile is loaded.
// It will store the 'trianglesContent' and 'pointsContent' from
// the root tile, for later access
tileset.tileLoad.addEventListener(function(tile) {
  var content = tile.content;
  var innerContents = content.innerContents;
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
    trianglesContent.applyStyle(new Cesium.Cesium3DTileStyle({
      show: showTriangles,
    }));
  }
});
Sandcastle.addToggleButton("Show points", showPoints, function (checked) {
  showPoints = checked;
  if (Cesium.defined(pointsContent)) {
    pointsContent.applyStyle(new Cesium.Cesium3DTileStyle({
      show: showPoints,
    }));
  }
});
```
