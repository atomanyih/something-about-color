var context = document.getElementById('canvas').getContext('2d');
var slider = document.getElementById('slider');

function drawPixel(position, color) {
  context.fillStyle = color.toString();
  context.fillRect(position.x, position.y, 1, 1);
}

function drawCanvas() {
  var z = slider.value;
  var width = 256;
  var height = 256;

  //context.clearRect(0, 0, width, height);

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var otherColorFunction = xyzToRGBA(z);
      var color = otherColorFunction(x / width, y / height);

      drawPixel({x: x, y: y}, color);
    }
  }
}

drawCanvas();
