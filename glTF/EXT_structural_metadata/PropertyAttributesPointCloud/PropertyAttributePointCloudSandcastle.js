const viewer = new Cesium.Viewer("cesiumContainer");

const intensityShader = new Cesium.CustomShader({
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        float intensity = fsInput.metadata.intensity;
        material.diffuse = vec3(intensity);
    }
    `,
});

const classificationShader = new Cesium.CustomShader({
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        vec3 color = vec3(1);
        int classification = int(fsInput.metadata.classification);
        if (classification == 0) {
            color = vec3(0,0.5,0);
        }
        else if (classification == 1) {
            color = vec3(0.5,0.5,0.5);
        }
        //color = vec3(fsInput.metadata.classification, 0, 0);
        material.diffuse = color;
    }
    `,
});

let customShader;
//customShader = intensityShader;
customShader = classificationShader;

const tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: `http://localhost:8003/glTF/EXT_structural_metadata/PropertyAttributesPointCloud//tileset.json`,
    debugShowBoundingVolume: true,
    customShader: customShader,
  })
);
tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(-75.152325, 39.94704, 0)
);
const offset = new Cesium.HeadingPitchRange(
  Cesium.Math.toRadians(-22.5),
  Cesium.Math.toRadians(-22.5),
  12.0
);
viewer.zoomTo(tileset, offset);
