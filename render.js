function rerender() {
  var colorFn = labToRGBA;
  drawCanvas(colorFn);
  colorPicker.render();
  document.getElementById('color').innerText = colorFn(slider.value)(
    colorPicker.getNormalizedX(), colorPicker.getNormalizedY()
  ).toHexString();

  rerenderSliderCanvas(
    colorPicker.getNormalizedX(), colorPicker.getNormalizedY()
  );
}

rerender();
