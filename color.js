var context = document.getElementById('canvas').getContext('2d');
var slider = document.getElementById('slider');

function Color(red, green, blue) {
  var alpha = 1;
  return {
    toString: function () {
      return 'rgba(' + [red, green, blue, alpha].join(',') + ')';
    }
  }
}

function colorFunction(z) {
  return function(x,y) {
    return new Color(x, y, z);
  };
}

function drawPixel(position, color) {
  context.fillStyle = color.toString();
  context.fillRect(position.x, position.y, 1, 1);
}

function drawCanvas() {
  for (var x = 0; x < 256; x++) {
    for (var y = 0; y < 256; y++) {
      var z = slider.value;
      var otherColorFunction = colorFunction(z);
      var color = otherColorFunction(x,y);

      drawPixel({x: x, y: y}, color);
    }
  }
}

drawCanvas();