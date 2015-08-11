var slider = document.getElementById('slider');

var canvas = new PixelCanvas(document.getElementById('canvas'));

function PixelCanvas(canvas) {
  var context = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;

  return {
    width: width,
    height: height,
    render: function (renderFn) {
      var imageData = context.getImageData(0, 0, width, height);

      var image = {
        fillPixel: function(x, y, color) {
          var index = (y * width + x) * 4;
          imageData.data[index] = color.red;
          imageData.data[index + 1] = color.green;
          imageData.data[index + 2] = color.blue;
          imageData.data[index + 3] = color.alpha * 255;
        }
      };

      renderFn(image);

      context.putImageData(imageData, 0, 0)
    }
  }
}

function drawCanvas(colorFn) {
  var z = slider.value;

  canvas.render(function(image) {
    for (var x = 0; x < canvas.width; x++) {
      for (var y = 0; y < canvas.height; y++) {

        var color = colorFn(z)(x / canvas.width, (canvas.height - y - 1) / canvas.height);

        image.fillPixel(x, y, color);
      }
    }
  });
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

