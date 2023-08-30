const viewer = new Cesium.Viewer("cesiumContainer");

// Stores the tileset that is currently selected
let currentTileset;

// Stores the currently selected feature ID label, which
// is the index of `FEATURE_ID_n`
let currentActiveFeatureIdLabel = 0;

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

  // Make sure that picking refers to the FEATURE_ID index that
  // is currently selected in the UI
  currentTileset.featureIdLabel = currentActiveFeatureIdLabel;
}

// Create an HTML element that will serve as the
// tooltip that displays the feature information
function createTooltip() {
  const tooltip = document.createElement("div");
  viewer.container.appendChild(tooltip);
  tooltip.style.backgroundColor = "black";
  tooltip.style.position = "absolute";
  tooltip.style.left = "0";
  tooltip.style.top = "0";
  tooltip.style.padding = "14px";
  tooltip.style["pointer-events"] = "none";
  tooltip.style["block-size"] = "fit-content";
  return tooltip;
}
const tooltip = createTooltip();

// Show the given HTML content in the tooltip
// at the given screen position
function showTooltip(screenX, screenY, htmlContent) {
  tooltip.style.display = "block";
  tooltip.style.left = `${screenX}px`;
  tooltip.style.top = `${screenY}px`;
  tooltip.innerHTML = htmlContent;
}

// Create an HTML string that contains information
// about the given feature, under the given title
function createFeatureHtml(title, feature) {
  if (!Cesium.defined(feature)) {
    return `(No ${title})<br>`;
  }
  const propertyKeys = feature.getPropertyIds();
  if (!Cesium.defined(propertyKeys)) {
    return `(No properties for ${title})<br>`;
  }
  let html = `<b>${title}:</b><br>`;
  for (let i = 0; i < propertyKeys.length; i++) {
    const propertyKey = propertyKeys[i];
    const propertyValue = feature.getProperty(propertyKey);
    html += `&nbsp;&nbsp;${propertyKey} : ${propertyValue}<br>`;
  }
  return html;
}

// Given an object that was obtained via Scene#pick: If it is
// a Cesium3DTileFeature, then it is returned.
// Otherwise, 'undefined' is returned.
function obtainFeature(picked) {
  if (!Cesium.defined(picked)) {
    return undefined;
  }
  const isFeature = picked instanceof Cesium.Cesium3DTileFeature;
  if (!isFeature) {
    return undefined;
  }
  return picked;
}

// Install the handler that will perform picking when the
// mouse is moved, and update the label entity when the
// mouse is over a Cesium3DTileFeature
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
  let tooltipText = "";
  const picked = viewer.scene.pick(movement.endPosition);

  const feature = obtainFeature(picked);
  tooltipText += createFeatureHtml("Feature", feature);

  const screenX = movement.endPosition.x;
  const screenY = movement.endPosition.y;
  showTooltip(screenX, screenY, tooltipText);
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

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
    "FeatureIdAttributeAndPropertyTable",
    "glTF/EXT_structural_metadata/FeatureIdAttributeAndPropertyTable",
    "Feature IDs for vertices, based on a feature ID attribute, and a simple property table containing metadata"
  ),

  createSampleOption(
    "FeatureIdTextureAndPropertyTable",
    "glTF/EXT_structural_metadata/FeatureIdTextureAndPropertyTable",
    "Feature IDs for vertices, based on a feature ID texture, and a simple property table containing metadata"
  ),

  createSampleOption(
    "MultipleFeatureIdsAndProperties",
    "glTF/EXT_structural_metadata/MultipleFeatureIdsAndProperties",
    "A mesh primitive with two sets of feature IDs, each associated with metadata with multiple properties"
  ),

  createSampleOption(
    "SharedPropertyTable",
    "glTF/EXT_structural_metadata/SharedPropertyTable",
    "A mesh with two mesh primitives, each having a set of feature IDs, that refer to the same property table"
  ),

  createSampleOption(
    "MultipleClasses",
    "glTF/EXT_structural_metadata/MultipleClasses",
    "A mesh primitive with multiple feature ID sets that can be activated separately, and are associated with different metadata classes"
  ),

  createSampleOption(
    "ComplexTypes",
    "glTF/EXT_structural_metadata/ComplexTypes",
    "A mesh primitive with fetaure IDs that are associated with metadata that contains complex, structured types"
  ),
];
Sandcastle.addToolbarMenu(sampleOptions);

// Creates an option for selecting the active feature ID
// with the given index
function createFeatureIdSetOption(index) {
  return {
    text: `Active feature ID: FEATURE_ID_${index}`,
    onselect: function () {
      currentActiveFeatureIdLabel = index;
      currentTileset.featureIdLabel = index;
    },
  };
}

// Create the list of available feature IDs, and add them
// to the sandcastle toolbar
const featureIdSetOptions = [
  createFeatureIdSetOption(0),
  createFeatureIdSetOption(1),
];
Sandcastle.addToolbarMenu(featureIdSetOptions);

// Add the component that will dispplay the info text
// to the sandcastle toolbar
document.getElementById("toolbar").appendChild(infoTextDisplay);
