// app.ts

window.onload = () => {
    // Event listeners
    let seedTimeHTML = document.getElementById("seedTime");
    if (seedTimeHTML) seedTimeHTML.addEventListener("click", setSeedTime, false);

    let visualizeHTML = document.getElementById("visualize");
    if (visualizeHTML) visualizeHTML.addEventListener("click", visualize, false);
    
    let seedVisualizeHTML = document.getElementById("seedVisualize");
    if (seedVisualizeHTML) seedVisualizeHTML.addEventListener("click", seedVisualize, false);
};

function setSeedTime() {
    (document.getElementById("seed") as HTMLInputElement).value = Date.now().toString();
} // setSeedTime

function visualize() {
  let timestamp = Date.now();
  let baseSeed = parseInt((document.getElementById("seed") as HTMLInputElement).value);
  let rngType = (document.getElementById("generator") as HTMLSelectElement).value;

  let rng1 = new SeededRNG(baseSeed, rngType);
  let rng2 = new SeededRNG(baseSeed + 1, rngType);
  let rng3 = new SeededRNG(baseSeed + 2, rngType);

  addLinearOutput("linearOutput1", rng1);
  addLinearOutput("linearOutput2", rng2);
  addLinearOutput("linearOutput3", rng3);

  rng1.randomSeed = baseSeed;
  rng2.randomSeed = baseSeed + 1;
  rng3.randomSeed = baseSeed + 2;

  addXYOutput("xyOutput1", rng1);
  addXYOutput("xyOutput2", rng2);
  addXYOutput("xyOutput3", rng3);

  document.getElementById("elapsedTime")!.innerHTML = (Date.now() - timestamp).toString() + " ms";
} // visualize

function seedVisualize() {
  setSeedTime();
  visualize();
} // seedVisualize

function addLinearOutput(idHTML: string, rng: SeededRNG) {
  let output = document.getElementById(idHTML);

  if (output) {
    output.innerHTML = "seed = " + rng.randomSeedInit + "<br />";
    output.appendChild(linearVisualizer(rng));
  }
} // addLinearOutput

function addXYOutput(idHTML: string, rng: SeededRNG) {
    let output = document.getElementById(idHTML);

    if (output) {
        output.innerHTML = "seed = " + rng.randomSeedInit + "<br />";
        output.appendChild(xyVisualizer(rng, 3000));
    }
} // addXYOutput

function linearVisualizer(rng: SeededRNG): HTMLCanvasElement {
    let canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    let ctx = canvas.getContext("2d");
    if (ctx) {
        let img = ctx.createImageData(canvas.width, canvas.height);

        let pixel = 0;
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
            let r = rng.rand();
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
    }
    
    return canvas;
} // linearVisualizer

function xyVisualizer(rng: SeededRNG, points: number): HTMLCanvasElement {
    let canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    let ctx = canvas.getContext("2d");
    if (ctx) {
        let img = ctx.createImageData(canvas.width, canvas.height);

        let pixel = 0;
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                img.data[pixel++] = 255;
                img.data[pixel++] = 255;
                img.data[pixel++] = 255;
                img.data[pixel++] = 255; // opaque alpha
            } // for x
        } // for y

        for (let i = 0; i < points; i++) {
            let x = ~~(rng.rand() * canvas.width);
            let y = ~~(rng.rand() * canvas.height);
            let pixel = 4 * (x + y * canvas.width);
            img.data[pixel++] = 0;
            img.data[pixel++] = 0;
            img.data[pixel++] = 0;
            img.data[pixel++] = 255; // opaque alpha
        } // for i

        ctx.putImageData(img, 0, 0);
    }

    return canvas;
} // xyVisualizer
