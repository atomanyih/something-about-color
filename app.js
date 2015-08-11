
function App(canvasElement, sliderCanvasElement, sliderElement, colorFunctionPickerElement, swatchElement) {
  var colorFunction = labToRGBA;
  var canvas = new PixelCanvas(canvasElement, colorFunction);
  var sliderCanvas = new PixelCanvas(sliderCanvasElement, colorFunction).disableCrosshairs();
  var sliderElement = sliderElement;
  var colorFunctionPickerElement = colorFunctionPickerElement;
  var colorSwatch = new ColorSwatch(swatchElement, new Color(0,0,0,0));

  return {
    canvas: canvas,
    sliderCanvas: sliderCanvas,
    colorSwatch: colorSwatch,
    getSliderValue: function() {
      return sliderElement.value;
    },
    colorFunction: colorFunction,
    updateColorFunction: function() {
      newColorFunction = this.canvas.colorFn;
      newValue = colorFunctionPickerElement.value;
      switch (newValue) {
        case "lab":
          newColorFunction = labToRGBA;
          break;

        case "hsv":
          newColorFunction = hsvToRGBA;
          break;

        case "xyz":
          newColorFunction = xyzToRGBA;
          break;

        default:
          break;
      }

      this.colorFunction = newColorFunction;

      this.canvas.drawColorSpace(this.getSliderValue(), this.colorFunction);
      this.sliderCanvas.drawColorLine(this.canvas.getCrosshairsPositionNormalized(), this.colorFunction);
      this.colorSwatch.setColor(this.canvas.getCurrentColor(this.getSliderValue(), this.colorFunction));
    },
    moveMouse: function(position) {
      if (isMouseDown()) {
        this.canvas.moveCrosshairs(this.canvas.getLocalCoords([position.x, position.y]));
        this.sliderCanvas.drawColorLine(this.canvas.getCrosshairsPositionNormalized(), this.colorFunction);

        this.colorSwatch.setColor(this.canvas.getCurrentColor(this.getSliderValue(), this.colorFunction));
      }
    },
    updateSliderValue: function() {
      this.canvas.drawColorSpace(this.getSliderValue(), this.colorFunction);
      this.colorSwatch.setColor(this.canvas.getCurrentColor(this.getSliderValue(), this.colorFunction));
    },
    render: function() {
      this.canvas.render();
      this.sliderCanvas.render();
      this.colorSwatch.render();
    }
  }
}

