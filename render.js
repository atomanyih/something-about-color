function rerender() {
  var colorFn = labToRGBA;
  drawCanvas(colorFn);
  colorPicker.render();
  document.getElementById('color').innerText = colorFn(slider.value)(clickedX / width, (height - clickedY - 1) / height).toHexString();
}

rerender();
