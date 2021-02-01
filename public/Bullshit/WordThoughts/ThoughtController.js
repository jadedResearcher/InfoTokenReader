
 Math.seed = 19;

  function getRandomNumberBetween(min, max){
  	return Math.floor(Math.seededRandom() * (max - min + 1)) + min;
  }

 function getRandomElementFromArray(array){
 	var min = 0;
 	var max = array.length-1;
 	var i = getRandomNumberBetween(min, max);
 	return array[i];
 }

 ////https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use if i want to have more possible sessions, use 2^32 or 2^64. see wiki
 //have modulus be 2^32 (4294967296), a = 1664525, c = 1013904223
 Math.seededRandom = function(max, min){
 	/*random_number = (lcg.previous * a + c) % modulus
     lcg.previous = random_number
     return random_number
 	*/
 	max = max || 1;
     min = min || 0;
 	Math.seed = (Math.seed * 1664525 + 1013904223) % 4294967296;
     var rnd = Math.seed / 4294967296;

     return min + rnd * (max - min);
 }

const root = "http://knucklessux.com/PuzzleBox/Bullshit/";
const folder_index = root + "list.php";
let folder_json = {};
const word_thoughts = "WordThoughts";
const audio_thoughts = "AudioThoughts";
const image_thoughts = "PictureThoughts";


function startbgmusic(){
    console.log("click first");
    const audioElement = new Audio("SoundFX/weirdambient.mp3");
    audioElement.volume = 0.1;
    audioElement.loop = true;
    audioElement.play();
    document.removeEventListener("click",startbgmusic);
}

document.addEventListener('click', startbgmusic);
window.onload = () =>{
    const Http = new XMLHttpRequest();
    const url=folder_index;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function() {
        if((this.readyState ==4 && this.status == 200)){
          folder_json = Http.responseText;
          pickShitPostBasedOnSeed(19, folder_json);
      }
    }
}


const pickShitPostBasedOnSeed = (seed)=>{
    console.log("shit posting based on " + seed);
    const folders = JSON.parse(folder_json)["folders"];
    const words = folders[word_thoughts];
    const images = folders[image_thoughts];
    const sounds = folders[audio_thoughts]; //sounds are to be played when links are clicked
    const nextSeed = getRandomNumberBetween(0,1013904223);
    shitPostWords(nextSeed, words["files"], sounds["files"]);
    const num_images = getRandomNumberBetween(1,4);
    for(let i = 0; i<num_images; i++){
        const nextSeed = getRandomNumberBetween(0,1013904223);
        shitPostImages(nextSeed, images["files"], sounds["files"]);
    }
}

const shitPostWords =(seed, words, sounds)=>{
    console.log("picking words based on seed", seed);
    Math.seed = seed;
    const file = getRandomElementFromArray(words);
    const Http = new XMLHttpRequest();
        const url=root + word_thoughts + "/" + file;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = function() {
            if((this.readyState ==4 && this.status == 200)){
             const contents = Http.responseText;
              sbahjifyWords(contents,sounds);
          }
        }
}

const sbahjifyWords = (contents,sounds)=>{
    Math.seededRandom(); //eat a seed
    const num_chunks = getRandomNumberBetween(5,19);
    let chunks = [];
    let size = Math.floor(contents.length/num_chunks);

    for (o = 0; o < contents.length -1; o += size) {
        chunks.push(contents.substr(o, size));
        size = getRandomNumberBetween(19,Math.floor(contents.length/num_chunks));
    }
    const max_links = 3;
    let current_links = 0;
    for (const chunk in chunks) {
    let link = false;
    if(current_links < max_links && getRandomNumberBetween(0,9999) %(current_links+3) == 0){
        link = true;
        current_links ++;
    }
      sbahjifyChunk(chunks[chunk], link, sounds);
    }
}

const getBullshitCSS = () =>{
    let css = "";
    var terribleCSSOptions = [["text-align", "center"],["text-align", "right"],["text-align", "left"],["text-align", "justify"],["position: ", "absolute"],["position: ", "relative"],["position: ", "static"],["position: ", "fixed"],["float: ", "left"] ,["float: ", "right"],["width: ", "????"],["height: ", "????"],["right: ", "????"] ,["top: ", "????"] ,["bottom: ", "????"] ,["left: ", "????"]   ];
    var reallyRand = getRandomNumberBetween(1,10);
    for(var i = 0; i<reallyRand; i++){
        var indexOfTerribleCSS = getRandomNumberBetween(0,terribleCSSOptions.length-1)
        var tin = terribleCSSOptions[indexOfTerribleCSS]
        if(tin[1] == "????"){
            tin[1] = getRandomNumberBetween(1,100) +"%";
        }
        css += tin[0] + tin[1]+";";
    }
    css += "min-width: 60px; min-height:60px; font-size: " + getRandomNumberBetween(10,28) +"px;";
    return css;
}

const sbahjifyChunk = (chunk, link,sounds) =>{
    let node = null;
     if(link){
        node = document.createElement("A");
        node.setAttribute("class", "pulse_animated");
     }else {
        node = document.createElement("DIV");
     }

    const textnode = document.createTextNode(chunk);
    const css = getBullshitCSS();
    node.appendChild(textnode);

    node.setAttribute("style",css);

    document.getElementById("output").appendChild(node);
    const nextSeed = getRandomNumberBetween(0,1013904223);
    node.onclick = ()=>{
        document.getElementById("output").innerHTML ="" ;
        pickShitPostBasedOnSeed(nextSeed);
        randomSound(sounds);
    }
}

const shitPostImages=(seed, words, sounds) =>{
    Math.seed = seed;
    const file = getRandomElementFromArray(words);
    console.log("chosen file ", file);
    const url=root + image_thoughts + "/" + file;
    const node = document.createElement("IMG");
    const css = getBullshitCSS() + "max-width: 400px; max-height: 400px; z-index: " + getRandomNumberBetween(-999,2);
    const hide_css = "display: none;";
    node.setAttribute("style",hide_css);
    node.setAttribute("src",url);
    node.setAttribute("class", "pulse_animated");
    document.getElementById("output").appendChild(node);


    var img = new Image();
    img.src = url;
    img.onload = function(){
          deepfriedCanvas(img,css,sounds);
    };
}

const randomSound = (sounds) =>{
    const file = getRandomElementFromArray(sounds);
    console.log("chosen file ", file);
    const url=root + audio_thoughts + "/" + file;
    const audioElement = new Audio(url);
    audioElement.play();
}


const deepfriedCanvas = (img,css,sounds) =>{
    const nextSeed = getRandomNumberBetween(0,1013904223);
    img.crossOrigin = "Anonymous";
      const canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext('2d');
      const width = getRandomNumberBetween(100,400);
      const height = getRandomNumberBetween(100,400);
      canvas.setAttribute("width",width);
      canvas.setAttribute("height",height);
      ctx.drawImage(img, 0, 0,width,height);
      const deep_fry_options = [sbahjifier,grayscale,threshold,blur,sharpen,edge_detection];
      const num_layers = getRandomNumberBetween(1,4);
      for(let i = 0; i<num_layers; i++){
        deep_fry_options[getRandomNumberBetween(0,deep_fry_options.length-1)](canvas);
      }
      canvas.setAttribute("style",css);
      document.getElementById("output").appendChild(canvas);
      canvas.setAttribute("class", "pulse_animated");

      canvas.onclick = ()=>{
          document.getElementById("output").innerHTML ="" ;
          pickShitPostBasedOnSeed(nextSeed);
          randomSound(sounds);
      }
}

const grayscale = function(canvas) {
  var ctx = canvas.getContext('2d');
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
const threshold = function(canvas) {
        var ctx = canvas.getContext('2d');
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

const blur = function(canvas){
    kernel(canvas, [1/90,1/90,1/90,1/90,1/90,1/90,1/90,1/90,1/90]);
}

const edge_detection = function(canvas){
    kernel(canvas, [  -1, -1,  -1, -1,  9, -1, -1, -1,  -1 ]);
}

const sharpen = function(canvas){
    kernel(canvas, [  0, -1,  0, -1,  5, -1, 0, -1,  0 ]);
}

const kernel= function(canvas, weights){
    var ctx = canvas.getContext('2d');
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
  const sbahjifier=function(canvas){
    var opaque = false;
    var ctx = canvas.getContext('2d');
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
