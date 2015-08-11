function toHex(n) {
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));
  return "0123456789ABCDEF".charAt((n-n%16)/16)
    + "0123456789ABCDEF".charAt(n%16);
}

function Color(red, green, blue, alpha) {
  return {
    red: red,
    green: green,
    blue: blue,
    alpha: alpha,
    toString: function () {
      return 'rgba(' + [this.red, this.green, this.blue, this.alpha].join(',') + ')';
    },
    toHexString: function() {
      return '#' + toHex(this.red) + toHex(this.green) + toHex(this.blue);
    }
  }
}

function RGB(z) {
  return function(x,y) {
    return new Color(x, y, z, 255);
  };
}

function XYZ(x, y, z) {
  return {
    x: x,
    y: y,
    z: z,
    toRGB: function() {
      var_X = this.x; /// 100        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
      var_Y = this.y; /// 100        //Y from 0 to 100.000
      var_Z = this.z; /// 100        //Z from 0 to 108.883

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

function Lab(l, a, b) {
  return {
    l: l,
    a: a,
    b: b,
    ref_x: 95.047 / 100,
    ref_y:100 / 100,
    ref_z: 108.883 / 100,
    toXYZ: function() {
      var_L = this.l * 100
      var_A = (this.a - 0.5) * 256;
      var_B = (this.b - 0.5) * 256;

      var_Y = ( var_L + 16 ) / 116;
      var_X = var_A / 500 + var_Y;
      var_Z = var_Y - var_B / 200;

      if ( Math.pow(var_Y, 3) > 0.008856 ){
        var_Y = Math.pow(var_Y, 3);
      } else {
        var_Y = ( var_Y - 16 / 116 ) / 7.787;
      }
      if ( Math.pow(var_X, 3) > 0.008856 ) {
        var_X = Math.pow(var_X, 3);
      } else {
        var_X = ( var_X - 16 / 116 ) / 7.787;
      }
      if ( Math.pow(var_Z, 3) > 0.008856 ) {
        var_Z = Math.pow(var_Z, 3);
      }
      else {
        var_Z = ( var_Z - 16 / 116 ) / 7.787;
      }

      X = this.ref_x * var_X;     //ref_X =  95.047     Observer= 2°, Illuminant= D65
      Y = this.ref_y * var_Y;     //ref_Y = 100.000
      Z = this.ref_z * var_Z;     //ref_Z = 108.883

      return new XYZ(X, Y, Z);
    },
    toRGB: function() {
      return this.toXYZ().toRGB();
    }
  }
}

function HSV(H,S,V) {
  return {
    toRGB: function() {
      if ( S == 0 )                       //HSV from 0 to 1
      {
        R = V * 255
        G = V * 255
        B = V * 255
      }
      else
      {
        var_h = H * 6
        if ( var_h == 6 ) var_h = 0      //H must be < 1
        var_i = Math.floor( var_h )             //Or ... var_i = floor( var_h )
        var_1 = V * ( 1 - S )
        var_2 = V * ( 1 - S * ( var_h - var_i ) )
        var_3 = V * ( 1 - S * ( 1 - ( var_h - var_i ) ) )

        if      ( var_i == 0 ) { var_r = V     ; var_g = var_3 ; var_b = var_1 }
        else if ( var_i == 1 ) { var_r = var_2 ; var_g = V     ; var_b = var_1 }
        else if ( var_i == 2 ) { var_r = var_1 ; var_g = V     ; var_b = var_3 }
        else if ( var_i == 3 ) { var_r = var_1 ; var_g = var_2 ; var_b = V     }
        else if ( var_i == 4 ) { var_r = var_3 ; var_g = var_1 ; var_b = V     }
        else                   { var_r = V     ; var_g = var_1 ; var_b = var_2 }

        R = var_r * 255                  //RGB results from 0 to 255
        G = var_g * 255
        B = var_b * 255
      }

      return new Color(R, G, B, 1);
    }
  }
}

var xyzToRGBA = function(y) {
  return function(x, z) {
    return new XYZ(x, y, z).toRGB();
  }
};

var labToRGBA = function(L) {
  return function(a, b) {
    return new Lab(L, a, b).toRGB();
  }
};

var hsvToRGBA = function(v) {
  return function(h, s) {
    return new HSV(h, s, v).toRGB();
  }
};
