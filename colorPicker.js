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
  var imageData = context.getImageData(0, 0, width, height);

  return {
    render: function() {
      context.clearRect(0,0,width,height);
      context.lineWidth = 1;
      context.strokeStyle = new Color(0,0,0,128).toString();
      context.strokeRect(clickedX - 1, clickedY - 1, 2, 2);
    }
  }
}

var colorPicker = new ColorPicker(colorPickerContext);