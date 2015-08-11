var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var slider = document.getElementById('slider');
var width = canvas.width;
var height = canvas.height;
var image = new PixelCanvas(context);
var clickedX = 0;
var clickedY = 0;

var canvasRect = canvas.getBoundingClientRect();

var offsetX = canvasRect.left;
var offsetY = canvasRect.top;

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

      if(x == clickedX || y == clickedY) {
        var color = new Color(0,0,0,255);
      } else {
        var color = colorFn(z)(x / width, (height - y - 1) / height);
      }


      image.fillPixel(x, y, color);
    }
  }

  image.render();
}

function rerender() {
  var colorFn = labToRGBA;
  drawCanvas(colorFn);
  document.getElementById('color').innerText = colorFn(slider.value)(clickedX / width, (height - clickedY - 1) / height).toString();
}

rerender();

function onClick(e) {
  clickedX = e.x - offsetX;
  clickedY = e.y - offsetY;
  rerender();
}