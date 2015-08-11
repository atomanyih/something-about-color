function rerender() {
  canvas.drawColorSpace(slider.value);
  canvas.render();
  sliderCanvas.drawColorLine(canvas.getCrosshairsPositionNormalized());
  sliderCanvas.render();
  var colorDisplay = document.getElementById('color');
  var currentColor = canvas.getCurrentColor(slider.value);
  var currentColorHex = currentColor.toHexString();
  colorDisplay.innerText = currentColorHex;
  colorDisplay.style.backgroundColor = currentColorHex;
}

rerender();
