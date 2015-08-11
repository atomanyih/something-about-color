var slider = document.getElementById('slider');

var canvas = new PixelCanvas(document.getElementById('canvas'), labToRGBA);
var sliderCanvas = new PixelCanvas(document.getElementById('sliderCanvas'), labToRGBA);

function PixelCanvas(canvasElement, colorFn) {
  var context = canvasElement.getContext('2d');
  var width = canvasElement.width;
  var height = canvasElement.height;
  var image = context.getImageData(0, 0, width, height);
  var crosshairsPosition = [0,0];

  return {
    colorFn: colorFn,
    width: width,
    height: height,
    fillPixel: function(x, y, color) {
      var index = (y * width + x) * 4;
      image.data[index] = color.red;
      image.data[index + 1] = color.green;
      image.data[index + 2] = color.blue;
      image.data[index + 3] = color.alpha * 255;
    },
    drawColorSpace: function(value) {
      innerColorFn = this.colorFn(value);
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          var color = innerColorFn(x / this.width, (this.height - y - 1) / this.height);

          this.fillPixel(x, y, color);
        }
      }
    },
    drawColorLine: function(position) {
      for (var x = 0; x < this.width; x++) {
        var color = this.colorAt(x / this.width, position);
        for (var y = 0; y < this.height; y++) {
          this.fillPixel(x, y, color);
        }
      }
    },
    colorAt: function(value, position) {
      innerColorFn = this.colorFn(value);
      return innerColorFn(position[0], position[1]);
    },
    moveCrosshairs: function(newPosition) {
      crosshairsPosition = newPosition;
    },
    getCrosshairsPosition: function() {
      return crosshairsPosition;
    },
    getCrosshairsPositionNormalized: function() {
      return [crosshairsPosition[0] / width, (height - 1 - crosshairsPosition[1]) / height];
    },
    render: function() {
      context.putImageData(image, 0, 0);
      if (crosshairsPosition != null) {
        context.beginPath();
        context.moveTo(0, crosshairsPosition[1]);
        context.lineTo(width, crosshairsPosition[1]);
        context.moveTo(crosshairsPosition[0], 0);
        context.lineTo(crosshairsPosition[0], height);
        context.stroke();
      }
    },
    getLocalCoords: function(screenCoords) {
      localX = screenCoords[0] - canvasElement.getBoundingClientRect().left;
      localY = screenCoords[1] - canvasElement.getBoundingClientRect().top;
      return [localX, localY];
    },
    getCurrentColor: function(value) {
      return this.colorAt(value,  this.getCrosshairsPositionNormalized());
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

function canvasMouseMove(e) {
  if (isMouseDown()) {
    canvas.moveCrosshairs(canvas.getLocalCoords([e.x, e.y]));
    rerender();
  }
}



