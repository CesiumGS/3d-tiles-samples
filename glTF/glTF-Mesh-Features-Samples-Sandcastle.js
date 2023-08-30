const viewer = new Cesium.Viewer("cesiumContainer");

// Stores the tileset that is currently selected
let currentTileset;

// Creates a custom fragment shader for visualizing the feature IDs.
// This fetches the feature ID for the fragment from the
// fsInput.featureIds.featureId_0 structure, and just assigns
// a color to the fragment, based on this feature ID
function createCustomShader() {
  const customShader = new Cesium.CustomShader({
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        int id = fsInput.featureIds.featureId_0;
        vec3 color = vec3(0.0, 0.0, 0.0);
        if (id == 0) {
          color = vec3(0.0, 1.0, 0.0);
        } else if (id == 1) {
          color = vec3(0.5, 0.5, 0.5);
        } else if (id == 2) {
          color = vec3(1.0, 0.0, 0.0);
        } else if (id == 3) {
          color = vec3(0.0, 0.0, 1.0);
        }
        material.diffuse = color;
      }
    `,
  });
  return customShader;
}

// Creates the tileset from the tileset.json in the given subdirectory
async function createTileset(subdirectory) {
  if (Cesium.defined(currentTileset)) {
    viewer.scene.primitives.remove(currentTileset);
    currentTileset = undefined;
  }
  // Create the tileset, and move it to a certain position on the globe
  currentTileset = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromUrl(
      `http://localhost:8003/${subdirectory}/tileset.json`,
      {
        debugShowBoundingVolume: true,
      }
    )
  );
  currentTileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-75.152325, 39.94704, 0)
  );
  const offset = new Cesium.HeadingPitchRange(
    0,
    Cesium.Math.toRadians(-22.5),
    4.0
  );
  viewer.zoomTo(currentTileset, offset);

  // Assign the custom shader that visualizes the feature IDs to the tileset
  currentTileset.customShader = createCustomShader();
}

//============================================================================
// Sandcastle UI setup:

// Create a label that will show some information for
// the currently selected example
function createInfoTextDisplay() {
  const infoTextDisplay = document.createElement("div");
  infoTextDisplay.style.background = "rgba(42, 42, 42, 0.7)";
  infoTextDisplay.style.padding = "5px 10px";
  infoTextDisplay.style.marginTop = "5px";
  return infoTextDisplay;
}
const infoTextDisplay = createInfoTextDisplay();
function setInfoText(infoText) {
  infoTextDisplay.textContent = infoText;
}

// Create one entry for the list of examples that can
// be selected in the dropdown menu. Selecting one of
// these will load the tileset for the sample in the
// given directory, and display the given info text in
// the infoTextDisplay
function createSampleOption(name, directory, infoText) {
  return {
    text: name,
    onselect: async function () {
      await createTileset(directory);
      setInfoText(infoText);
    },
  };
}

// Create the list of available samples, and add them
// to the sandcastle toolbar
const sampleOptions = [
  createSampleOption(
    "FeatureIdAttribute",
    "glTF/EXT_mesh_features/FeatureIdAttribute",
    "Feature IDs for the vertices, using a feature ID attribute"
  ),

  createSampleOption(
    "FeatureIdTexture",
    "glTF/EXT_mesh_features/FeatureIdTexture",
    "Feature IDs for texels, using a feature ID texture"
  ),
];
Sandcastle.addToolbarMenu(sampleOptions);

// Add a toggle button to the toolbar, for selecting whether
// feature IDs should be visualized. When it is selected,
// then the tileset receives the custom shader that visualizes
// the feature IDs. Otherwise, the custom shader of the tileset
// is set to 'undefined', causing it to be rendered with the
// default shader.
Sandcastle.addToggleButton("Visualize Feature IDs", true, function (checked) {
  if (checked) {
    currentTileset.customShader = createCustomShader();
  } else {
    currentTileset.customShader = undefined;
  }
});

// Add the component that will dispplay the info text
// to the sandcastle toolbar
document.getElementById("toolbar").appendChild(infoTextDisplay);
