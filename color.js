function Color(red, green, blue, alpha) {
  return {
    toString: function () {
      return 'rgba(' + [red, green, blue, alpha].join(',') + ')';
    }
  }
}

function RGB(z) {
  return function(x,y) {
    return new Color(x, y, z);
  };
}

function XYZ(x, y, z) {
  return {
    toRGB: function() {
      var_X = x; /// 100        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
      var_Y = y; /// 100        //Y from 0 to 100.000
      var_Z = z; /// 100        //Z from 0 to 108.883

      var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
      var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
      var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;

      if ( var_R > 0.0031308 ) {
        var_R = 1.055 * ( Math.pow(var_R, 1 / 2.4) ) - 0.055;
      } else {
        var_R = 12.92 * var_R;
      }
      if (var_G > 0.0031308) {
        var_G = 1.055 * ( Math.pow(var_G, 1 / 2.4) ) - 0.055;
      } else {
        var_G = 12.92 * var_G;
      }
      if ( var_B > 0.0031308 ) {
        var_B = 1.055 * ( Math.pow(var_B, 1 / 2.4) ) - 0.055;
      } else {
        var_B = 12.92 * var_B;
      }

      R = Math.floor(var_R * 255);
      G = Math.floor(var_G * 255);
      B = Math.floor(var_B * 255);

      if (R < 0 || G < 0 || B < 0 || R > 255 || G > 255 || B > 255) {
        return new Color(0, 0, 0, 0);
      } else {
        return new Color(R, G, B, 1);
      }
    }
  }
}

var xyzToRGBA = function(y) {
  return function(x, z) {
    return new XYZ(x, y, z).toRGB();
  }
};
