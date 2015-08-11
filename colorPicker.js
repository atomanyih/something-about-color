var locked = false;
var colorPickerCanvas = document.getElementById('colorPicker');

function ColorPicker(canvas, afterChooseFn) {
  var offsetX = canvas.getBoundingClientRect().left;
  var offsetY = canvas.getBoundingClientRect().top;

  var canvas = new PixelCanvas(canvas);

  return {
    moveTo: function(e) {
      if (!locked) {
        this.clickedX = e.x - offsetX;
        this.clickedY = e.y - offsetY;
        afterChooseFn();
      }
    },
    lockColor: function(e) {
      locked = !locked;
      this.moveTo(e);
    },
    render: function() {
      var self = this;

      canvas.render(function(image) {
        for (var x = 0; x < canvas.width; x++) {
          for (var y = 0; y < canvas.height; y++) {

            if (x == self.clickedX || y == self.clickedY) {
              var color = new Color(0, 0, 0, 0.5);
              image.fillPixel(x, y, color);
            } else {
              image.fillPixel(x, y, new Color(0, 0, 0, 0))
            }
          }
        }
      });
    },
    getNormalizedX: function() {
      return this.clickedX / canvas.width;
    },
    getNormalizedY: function() {
      return (canvas.height - this.clickedY - 1) / canvas.height;
    }
  }
}

var colorPicker = new ColorPicker(colorPickerCanvas, function() {
  rerender();
});
