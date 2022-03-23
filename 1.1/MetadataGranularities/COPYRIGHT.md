The glTF models that are used in this sample are in the Public Domain.

The original models have been obtained from

- https://market.pmnd.rs/model/house1
- https://market.pmnd.rs/model/house-3
- https://market.pmnd.rs/model/house-4
- https://market.pmnd.rs/model/house-5
- https://market.pmnd.rs/model/tree-lime
- https://market.pmnd.rs/model/tree-beech
- https://market.pmnd.rs/model/tree-spruce

The models that had been using Draco compression (the house models) have been re-encoded without compression, using https://gltf.report/.

The models that used textures (the tree models) had textures of a size of 1024x1024 that have been resized to 128x128 for this sample.

The matrix of the root node of the models has been adjusted: The scaling factor has been chosen so that the models have a "sensible" size in meters. The translation has been adjusted so that the minimum y-coordinate of the model is at y=0, and the model is centered along the x- and z-axis. The resulting models have been replicated at different positions to create the actual tile content.
