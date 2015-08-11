function PixelCanvas(canvasElement) {
  var context = canvasElement.getContext('2d');
  var width = canvasElement.width;
  var height = canvasElement.height;
  var image = context.getImageData(0, 0, width, height);
  var crosshairsPosition = [0,0];
  var crosshairsEnabled = true;

  return {
    width: width,
    height: height,
    crosshairsEnabled: crosshairsEnabled,
    disableCrosshairs: function() {
      this.crosshairsEnabled = false;
      return this;
    },
    enableCrosshairs: function() {
      this.crosshairsEnabled = true;
      return this;
    },
    fillPixel: function(x, y, color) {
      var index = (y * width + x) * 4;
      image.data[index] = color.red;
      image.data[index + 1] = color.green;
      image.data[index + 2] = color.blue;
      image.data[index + 3] = color.alpha * 255;
    },
    drawColorSpace: function(value, colorFn) {
      innerColorFn = colorFn(value);
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          var color = innerColorFn(x / this.width, (this.height - y - 1) / this.height);

          this.fillPixel(x, y, color);
        }
      }
    },
    drawColorLine: function(position, colorFn) {
      for (var x = 0; x < this.width; x++) {
        var color = this.colorAt(x / this.width, position, colorFn);
        for (var y = 0; y < this.height; y++) {
          this.fillPixel(x, y, color);
        }
      }
    },
    colorAt: function(value, position, colorFn) {
      innerColorFn = colorFn(value);
      return innerColorFn(position[0], position[1]);
    },
    crosshairsPosition: crosshairsPosition,
    moveCrosshairs: function(newPosition) {
      this.crosshairsPosition = newPosition;
    },
    getCrosshairsPositionNormalized: function() {
      return [this.crosshairsPosition[0] / width, (height - 1 - this.crosshairsPosition[1]) / height];
    },
    render: function() {
      context.putImageData(image, 0, 0);
      if (this.crosshairsEnabled) {
        context.beginPath();
        context.moveTo(0, this.crosshairsPosition[1]);
        context.lineTo(width, this.crosshairsPosition[1]);
        context.moveTo(this.crosshairsPosition[0], 0);
        context.lineTo(this.crosshairsPosition[0], height);
        context.stroke();
      }
    },
    getLocalCoords: function(screenCoords) {
      localX = screenCoords[0] - canvasElement.getBoundingClientRect().left;
      localY = screenCoords[1] - canvasElement.getBoundingClientRect().top;
      return [localX, localY];
    },
    getCurrentColor: function(value, colorFn) {
      return this.colorAt(value, this.getCrosshairsPositionNormalized(), colorFn);
    }
  }
}

var mouseDown = 0;
document.body.onmousedown = function() {
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
};

var isMouseDown = function() {
  return mouseDown > 0;
};


