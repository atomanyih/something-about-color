var clickedX = 0;
var clickedY = 0;
var locked = false;
var offsetX = canvasRect.left;
var offsetY = canvasRect.top;
var colorPickerContext = document.getElementById('colorPicker').getContext('2d');

function moveTo(e) {
  if(!locked) {
    clickedX = e.x - offsetX;
    clickedY = e.y - offsetY;
    rerender();
  }
}

function lockColor(e) {
  locked = !locked;
  moveTo(e);
}

function ColorPicker(context) {

  return {
    render: function() {
      context.clearRect(0,0,width,height);
      var image = new PixelCanvas(context);

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {

          if(x == clickedX || y == clickedY) {
            var color = new Color(0, 0, 0, 0.5);
            image.fillPixel(x, y, color);
          }
        }
      }

      image.render();
    }
  }
}

var colorPicker = new ColorPicker(colorPickerContext);