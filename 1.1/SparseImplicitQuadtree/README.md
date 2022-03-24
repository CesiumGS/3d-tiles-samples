
# Sparse implicit quadtree

An example tileset that uses the [Implicit Tiling](https://github.com/CesiumGS/3d-tiles/tree/draft-1.1/specification/ImplicitTiling) to represent a small, sparse quadtree. 

The quadtree has 6 available levels, and each subtree has 3 levels. There are 32 tiles available in level 5. Each of these tiles has a content, which is a simple glTF asset as a GLB (glTF binary) file that just consists of a portion of the unit square that corresponds to the extent of the respective tile. No other tiles - except for the ones that have content, and their respective ancestors - are available. 

A screenshot of the tileset, rendered in CesiumJS (with a bounding volume visualization for debugging) is shown here:

![Screenshot](screenshot/SparseImplicitQuadtree.png)

It was created from a Cesium Sandcastle with the following code:
```JavaScript
var viewer = new Cesium.Viewer('cesiumContainer');

var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:8003/1.1/SparseImplicitQuadtree/tileset.json',
    maximumScreenSpaceError: 1,
    debugShowBoundingVolume: true
}));

var offset = new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-67.5), 4.0);
tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(-75.152325, 39.94704, 1));
viewer.zoomTo(tileset, offset);
```

The following image shows the 6 levels of the tileset. Tiles that are available contain a `1` and are shown in green. Tiles that are not available contain a `0` and are shown in red. Cells that contain content are marked with `1+` (only in level 5). 

![Availability](screenshot/SparseImplicitQuadtree-Availability.png)

The JSON parts of the `.subtree` files and the availability information that is stored in the binary buffers is summarized in [subtreeInfo.md](screenshot/subtreeInfo.md).


