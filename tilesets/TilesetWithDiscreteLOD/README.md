# Tileset with discrete LODs
## Description
The tileset contains three tiles each with a different decimation of the Stanford Dragon mesh.
* Root tile - highly decimated dragon
* Child tile - medium decimated dragon
* Grandchild tile - original dragon

When a tile's screen space error is met, it is replaced by its higher LOD child.

When running in Cesium, use the `3d-tiles` branch.

## Screenshot

![screenshot](screenshot/screenshot.gif)
