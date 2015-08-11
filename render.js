function rerender() {
  var colorFn = labToRGBA;
  drawCanvas(colorFn);
  canvas.render();
  //colorPicker.render();
  var colorDisplay = document.getElementById('color');
  var currentColor = colorFn(slider.value)(
    colorPicker.getNormalizedX(), colorPicker.getNormalizedY()
  ).toHexString();
  colorDisplay.innerText = currentColor;
  colorDisplay.style.backgroundColor = currentColor;

  drawSliderCanvas(function (L) {
    return colorFn(L)(
      colorPicker.getNormalizedX(), colorPicker.getNormalizedY()
    );
  });
}

rerender();
