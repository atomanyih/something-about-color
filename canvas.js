var context = document.getElementById('canvas').getContext('2d');
var slider = document.getElementById('slider');
var width = 256;
var height = 256;
var image = new PixelCanvas(context);

function PixelCanvas(context) {
  var imageData = context.getImageData(0, 0, width, height);

  return {
    fillPixel: function (x, y, color) {
      var index = (y * width + x) * 4;
      imageData.data[index] = color.red;
      imageData.data[index + 1] = color.green;
      imageData.data[index + 2] = color.blue;
      imageData.data[index + 3] = color.alpha * 255;
    },
    render: function () {
      context.putImageData(imageData, 0, 0)

    }
  }
}

function drawCanvas(colorFn) {
  var z = slider.value;

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var color = colorFn(z)(x / width, y / height);


      image.fillPixel(x, y, color);
    }
  }

  image.render();
}

drawCanvas(labToRGBA);
