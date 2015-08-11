var context = document.getElementById('canvas').getContext('2d');
var slider = document.getElementById('slider');
var width = 256;
var height = 256;
var imageData = context.getImageData(0,0, width, height);

function drawCanvas() {
  var z = slider.value;

  //context.clearRect(0, 0, width, height);

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var index = (y * width + x) * 4;

      var otherColorFunction = xyzToRGBA(z);
      var color = otherColorFunction(x / width, y / height);


      imageData.data[index] = color.red;
      imageData.data[index + 1] = color.green;
      imageData.data[index + 2] = color.blue;
      imageData.data[index + 3] = color.alpha * 255;
    }
  }

  context.putImageData(imageData, 0, 0)
}

drawCanvas();
