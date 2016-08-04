# 3d-tiles-samples
Sample tilesets for learning how to use 3D Tiles :books:

## Instructions

Clone this repo and install [Node.js](http://nodejs.org/).  From the root directory of this repo, run:
```
npm install
```

Then to host the tilesets locally, run:
```
npm start
```

The tilesets are hosted at `http://localhost:8003/tilesets/`.

To load a tileset within Cesium:
```
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:8003/tilesets/TilesetWithDiscreteLOD/'
}));

Cesium.when(tileset.readyPromise).then(function(tileset) {
    viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
});

```

See the `README.txt` in each tileset's directory for usage restrictions.

| Model                                         | Screenshot                                                            | Description|
|-----------------------------------------------|-----------------------------------------------------------------------|------------|
| [Discrete LOD](tilesets/TilesetWithDiscreteLOD)                  | ![](tilesets/TilesetWithDiscreteLOD/screenshot/screenshot.gif)        | Tileset with discrete LODs. |
| [Expiration](tilesets/TilesetWithExpiration)                      | ![](tilesets/TilesetWithExpiration/screenshot/screenshot.gif)         | Tileset that expires and re-requests new content every five seconds. |
| [Request Volume](tilesets/TilesetWithRequestVolume)              | ![](tilesets/TilesetWithRequestVolume/screenshot/screenshot.gif)      | Tileset with request volumes. |
| [Tree Billboards](tilesets/TilesetWithTreeBillboards)            | ![](tilesets/TilesetWithTreeBillboards/screenshot/screenshot.gif)     | Tileset that combines instanced 3D models and billboards. |

## Contributions

Pull requests are appreciated!  Please use the same [Contributor License Agreement (CLA)](https://github.com/AnalyticalGraphicsInc/cesium/blob/master/CONTRIBUTING.md) and [Coding Guide](https://github.com/AnalyticalGraphicsInc/cesium/blob/master/Documentation/Contributors/CodingGuide/README.md) used for [Cesium](http://cesiumjs.org/).
