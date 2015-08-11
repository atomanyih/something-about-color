var locked = false;
var colorPickerCanvas = document.getElementById('colorPicker');

function ColorPicker(myCanvas, afterChooseFn) {

  return {
    moveTo: function(e) {
      if (!locked) {
        clickedPos = canvas.getLocalCoords([e.x, e.y])
        this.clickedX = clickedPos[0];
        this.clickedY = clickedPos[1];
        myCanvas.moveCrosshairs(myCanvas.getLocalCoords([e.x, e.y]));
        afterChooseFn();
      }
    },
    lockColor: function(e) {
      locked = !locked;
      this.moveTo(e);
    },
    getNormalizedX: function() {
      return this.clickedX / myCanvas.width;
    },
    getNormalizedY: function() {
      return (myCanvas.height - this.clickedY - 1) / myCanvas.height;
    }
  }
}

var colorPicker = new ColorPicker(canvas, function() {
  rerender();
});
