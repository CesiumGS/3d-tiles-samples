const viewer = new Cesium.Viewer("cesiumContainer");

// Create the tileset, and move it to a certain position on the globe
const tileset = viewer.scene.primitives.add(
  await Cesium.Cesium3DTileset.fromUrl(
    `http://localhost:8003/glTF/EXT_structural_metadata/SimplePropertyTexture/tileset.json`,
    {
      debugShowBoundingVolume: true,
    }
  )
);
tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(-75.152325, 39.94704, 0)
);
const offset = new Cesium.HeadingPitchRange(
  0,
  Cesium.Math.toRadians(-22.5),
  4.0
);
viewer.zoomTo(tileset, offset);

// Create a custom (fragment) shader that accesses the metadata value with the
// given property name, normalizes it to a value in [0,1] based on the given
// source range, and uses that value as the brightness for the fragment.
function createShader(propertyName, sourceMin, sourceMax) {
  const shader = new Cesium.CustomShader({
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
      {
        float value = float(fsInput.metadata.${propertyName});
        float range = float(${sourceMax}) - float(${sourceMin});
        float brightness = (value - float(${sourceMin})) / range;
        material.diffuse = vec3(brightness);
      }
    `,
  });
  return shader;
}

// Create one entry for the list of shaders that can
// be selected in the dropdown menu.
function createShaderOption(title, propertyName, sourceMin, sourceMax) {
  return {
    text: title,
    onselect: function () {
      if (!Cesium.defined(propertyName)) {
        tileset.customShader = undefined;
      } else {
        tileset.customShader = createShader(propertyName, sourceMin, sourceMax);
      }
    },
  };
}

const shaderOptions = [
  createShaderOption("Default Shading", undefined, 0.0, 1.0),
  createShaderOption("Inside Temperature", "insideTemperature", 0.0, 255.0),
  createShaderOption("Outside Temperature", "outsideTemperature", 0.0, 255.0),
  createShaderOption("Insulation Thickness", "insulation", 0.0, 1.0),
];

Sandcastle.addToolbarMenu(shaderOptions);
