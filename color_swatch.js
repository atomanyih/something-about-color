function ColorSwatch(swatchElement, color) {
  var swatchElement = swatchElement;

  return {
    color: color,
    setColor: function(newColor) {
      this.color = newColor;
    },
    render: function() {
      var currentColorHex = this.color.toHexString();
      swatchElement.innerText = currentColorHex;
      swatchElement.style.backgroundColor = currentColorHex;
    }
  }
}
