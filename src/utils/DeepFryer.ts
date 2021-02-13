import {getRandomNumberBetween} from './NonSeededRandUtils'


const grayscale = function(canvas: HTMLCanvasElement) {
  var ctx = canvas.getContext('2d');
  if(!ctx){
      return;
  }
  var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var d = output.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  ctx.putImageData(output, 0, 0);
};

//https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
const threshold = function(canvas:HTMLCanvasElement) {
        var ctx = canvas.getContext('2d');
        if(!ctx){
            return;
        }
        var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var d = output.data;
        for (var i=0; i<d.length; i+=4) {
          var r = d[i];
          var g = d[i+1];
          var b = d[i+2];
          var v = (0.2126*r + 0.7152*g + 0.0722*b >= 100) ? 255 : 0;
          d[i] = d[i+1] = d[i+2] = v
        }
          ctx.putImageData(output, 0, 0);
};



const blur = function(canvas: HTMLCanvasElement){
    kernel(canvas, [1/90,1/90,1/90,1/90,1/90,1/90,1/90,1/90,1/90]);
}

const edge_detection = function(canvas: HTMLCanvasElement){
    kernel(canvas, [  -1, -1,  -1, -1,  9, -1, -1, -1,  -1 ]);
}

const sharpen = function(canvas: HTMLCanvasElement){
    kernel(canvas, [  0, -1,  0, -1,  5, -1, 0, -1,  0 ]);
}

const kernel= function(canvas: HTMLCanvasElement, weights: number[]){
    var ctx = canvas.getContext('2d');
    if(!ctx){
        return;
    }
    ctx.rotate(getRandomNumberBetween(0,10)*Math.PI/180);
  	var pixels =ctx.getImageData(0, 0, canvas.width, canvas.height);
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dst = output.data;
    // go through the destination image pixels
    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = (scy*sw+scx)*4;
              var wt = weights[cy*side+cx];
              r += src[srcOff] * wt;
              g += src[srcOff+1] * wt;
              b += src[srcOff+2] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = 255;
      }
    }
    //sligtly offset each time
    ctx.putImageData(output, 0, 0);
}


//sharpens the image so later pixel swapping doesn't work quite right.
  //https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
  const sbahjifier=function(canvas: HTMLCanvasElement){
    var opaque = false;
    var ctx = canvas.getContext('2d');
    if(!ctx){
        return;
    }
    ctx.rotate(getRandomNumberBetween(0,10)*Math.PI/180);
  	var pixels =ctx.getImageData(0, 0, canvas.width, canvas.height);
    //var weights = [  0, -1,  0, -1,  5, -1, 0, -1,  0 ];
    var weights = [  -1, -1,  -1, -1,  9, -1, -1, -1,  -1 ];
    //var weights = [  1, 1, 1, 1,  5, -1, -1, -1, -1 ];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = (scy*sw+scx)*4;
              var wt = weights[cy*side+cx];
              r += src[srcOff] * wt;
              g += src[srcOff+1] * wt;
              b += src[srcOff+2] * wt;
              a += src[srcOff+3] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a + alphaFac*(255-a);
      }
    }
    //sligtly offset each time
    ctx.putImageData(output, getRandomNumberBetween(0,10), getRandomNumberBetween(0,10));
  }


  const deep_fry_options = [sbahjifier,grayscale,threshold,blur,sharpen,edge_detection];


  export default deep_fry_options;