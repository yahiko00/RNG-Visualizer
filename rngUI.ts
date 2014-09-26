/// <reference path="rng.ts"/>

window.onload = () => {
  // Event listeners
  document.getElementById("seedTime").addEventListener("click", setSeedTime, false);
  document.getElementById("visualize").addEventListener("click", visualize, false);
  document.getElementById("seedVisualize").addEventListener("click", seedVisualize, false);
};

function setSeedTime() {
  (<HTMLInputElement>document.getElementById("seed")).value = Date.now().toString();
} // setSeedTime

function visualize() {
  var timestamp = Date.now();
  var baseSeed = parseInt((<HTMLInputElement>document.getElementById("seed")).value);
  var rngType = parseInt((<HTMLSelectElement>document.getElementById("generator")).value);

  var rng1 = new SeededRNG(baseSeed, rngType);
  var rng2 = new SeededRNG(baseSeed + 1, rngType);
  var rng3 = new SeededRNG(baseSeed + 2, rngType);

  addLinearOutput("linearOutput1", rng1);
  addLinearOutput("linearOutput2", rng2);
  addLinearOutput("linearOutput3", rng3);

  rng1.randomSeed = baseSeed;
  rng2.randomSeed = baseSeed + 1;
  rng3.randomSeed = baseSeed + 2;

  addXYOutput("xyOutput1", rng1);
  addXYOutput("xyOutput2", rng2);
  addXYOutput("xyOutput3", rng3);

  document.getElementById("elapsedTime").innerHTML = (Date.now() - timestamp).toString() + " ms";
} // visualize

function seedVisualize() {
  setSeedTime();
  visualize();
} // seedVisualize

function addLinearOutput(idHTML: string, rng: SeededRNG) {
  var output = document.getElementById(idHTML);
  output.innerHTML = "seed = " + rng.randomSeedInit + "<br />";
  output.appendChild(linearVisualizer(rng));
} // addLinearOutput

function addXYOutput(idHTML: string, rng: SeededRNG) {
  var output = document.getElementById(idHTML);
  output.innerHTML = "seed = " + rng.randomSeedInit + "<br />";
  output.appendChild(xyVisualizer(rng, 3000));
} // addXYOutput

function linearVisualizer(rng: SeededRNG): HTMLCanvasElement {
  var canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  var ctx = canvas.getContext("2d");
  var img = ctx.createImageData(canvas.width, canvas.height);

  var pixel = 0;
  for (var y = 0; y < canvas.height; y++) {
    for (var x = 0; x < canvas.width; x++) {
      var r = rng.rand();
      if (r >= 0.5) {
        img.data[pixel++] = 255;
        img.data[pixel++] = 255;
        img.data[pixel++] = 255;
        img.data[pixel++] = 255; // opaque alpha
      }
      else {
        img.data[pixel++] = 0;
        img.data[pixel++] = 0;
        img.data[pixel++] = 0;
        img.data[pixel++] = 255; // opaque alpha
      }
    } // for x
  } // for y

  ctx.putImageData(img, 0, 0);

  return canvas;
} // linearVisualizer

function xyVisualizer(rng: SeededRNG, points: number): HTMLCanvasElement {
  var canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  var ctx = canvas.getContext("2d");
  var img = ctx.createImageData(canvas.width, canvas.height);

  var pixel = 0;
  for (var y = 0; y < canvas.height; y++) {
    for (var x = 0; x < canvas.width; x++) {
      img.data[pixel++] = 255;
      img.data[pixel++] = 255;
      img.data[pixel++] = 255;
      img.data[pixel++] = 255; // opaque alpha
    } // for x
  } // for y

  for (var i = 0; i < points; i++) {
    var x = ~~(rng.rand() * canvas.width);
    var y = ~~(rng.rand() * canvas.height);
    var pixel = 4 * (x + y * canvas.width);
    img.data[pixel++] = 0;
    img.data[pixel++] = 0;
    img.data[pixel++] = 0;
    img.data[pixel++] = 255; // opaque alpha
  } // for i

  ctx.putImageData(img, 0, 0);

  return canvas;
} // xyVisualizer