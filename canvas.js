var slider = document.getElementById('slider');

var canvas = new PixelCanvas(document.getElementById('canvas'));

function PixelCanvas(canvasElement) {
  var context = canvasElement.getContext('2d');
  var width = canvasElement.width;
  var height = canvasElement.height;
  var image = context.getImageData(0, 0, width, height);
  var crosshairsPosition = null;

  return {
    width: width,
    height: height,
    fillPixel: function(x, y, color) {
      var index = (y * width + x) * 4;
      image.data[index] = color.red;
      image.data[index + 1] = color.green;
      image.data[index + 2] = color.blue;
      image.data[index + 3] = color.alpha * 255;
    },
    moveCrosshairs: function(newPosition) {
      crosshairsPosition = newPosition;
    },
    getCrosshairsPosition: function() {
      return crosshairsPosition;
    },
    getCrosshairsPositionNormalized: function() {
      return [crosshairsPosition[0] / width, height - 1 - crosshairsPosition[1] / height];
    },
    render: function (renderFn) {
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
    }
  }
}

function drawCanvas(colorFn) {
  var z = slider.value;
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {

      var color = colorFn(z)(x / canvas.width, (canvas.height - y - 1) / canvas.height);

      canvas.fillPixel(x, y, color);
    }
  }
}
var sliderCanvas = new PixelCanvas(document.getElementById('sliderCanvas'));

function drawSliderCanvas(colorFn) {
  sliderCanvas.render(function(image) {
    for (var x = 0; x < sliderCanvas.width; x++) {
      var color = colorFn(x / sliderCanvas.width);
      for (var y = 0; y < sliderCanvas.height; y++) {
        image.fillPixel(x, y, color);
      }
    }
  });
}

function rerenderSliderCanvas(a,b) {
  drawSliderCanvas(function(L) {
    return new Lab(L, a, b).toRGB();
  });
}

