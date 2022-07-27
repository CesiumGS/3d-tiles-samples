# Metadata for GPU instances

Preliminary example showing how to assign metadata to GPU instances

- uses `EXT_structural_metadata` to define a property table with 10 rows
- uses `EXT_mesh_gpu_instancing` to create 10 GPU-based instances

The following sandcastle shows how to connect both extensions.

**This sandcastle uses a private API**. The API for accessing this data may change in the future.

```JavaScript
const viewer = new Cesium.Viewer("cesiumContainer");

const tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: `http://localhost:8003/glTF/EXT_structural_metadata/GpuInstanceMetadata/tileset.json`,
    debugShowBoundingVolume: true,
  })
);
tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(-75.152325, 39.94704, 0)
);
const offset = new Cesium.HeadingPitchRange(
  Cesium.Math.toRadians(22.5),
  Cesium.Math.toRadians(-22.5),
  25.0
);
viewer.zoomTo(tileset, offset);

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

function getPropertyValue_INTERNAL(
  content,
  propertyTableIndex,
  row,
  propertyName
) {
  if (!Cesium.defined(content._model)) {
    return undefined;
  }
  const metadata = content._model.structuralMetadata;
  if (!Cesium.defined(metadata)) {
    return undefined;
  }
  const propertyTable = metadata.propertyTables[propertyTableIndex];
  if (!Cesium.defined(propertyTable)) {
    return undefined;
  }
  const property = propertyTable.getProperty(row, propertyName);
  return property;
}

function createPropertyExampleText(picked) {
  if (!Cesium.defined(picked)) {
    return "No feature";
  }
  const content = picked.content;
  if (!Cesium.defined(content)) {
    return "No constent";
  }
  const instanceId = picked.instanceId;
  if (!Cesium.defined(instanceId)) {
    return "No instanced object";
  }
  const propertyTableIndex = 0;
  const propertyName = "example_STRING";
  const propertyValue = getPropertyValue_INTERNAL(
    content,
    propertyTableIndex,
    instanceId,
    propertyName
  );
  const text = `${propertyName} : ${propertyValue}`;
  return text;
}

// Install the handler that will perform picking when the
// mouse is moved, and update the label entity when the
// mouse is over an instanced feature
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
  const picked = viewer.scene.pick(movement.endPosition);
  const tooltipText = createPropertyExampleText(picked);

  const screenX = movement.endPosition.x;
  const screenY = movement.endPosition.y;
  showTooltip(screenX, screenY, tooltipText);
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

## License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
