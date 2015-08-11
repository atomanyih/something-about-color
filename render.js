function rerender() {
  canvas.drawColorSpace(slider.value);
  rerenderWithoutColorSpace();
}

function rerenderWithoutSlider(value) {
  canvas.drawColorSpace(value);
  canvas.render();
  rerenderColorSwatch();
}

function rerenderWithoutColorSpace() {
  canvas.render();
  rerenderWithoutCanvas();
}

function rerenderWithoutCanvas() {
  sliderCanvas.drawColorLine(canvas.getCrosshairsPositionNormalized());
  sliderCanvas.render();
  rerenderColorSwatch();
}

function rerenderColorSwatch() {
  var colorDisplay = document.getElementById('color');
  var currentColor = canvas.getCurrentColor(slider.value);
  var currentColorHex = currentColor.toHexString();
  colorDisplay.innerText = currentColorHex;
  colorDisplay.style.backgroundColor = currentColorHex;
}


rerender();
