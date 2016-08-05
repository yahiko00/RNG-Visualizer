// rng.ts

interface SeededRNG {
    seedInit: number;
    seed: number;

    rand(): number;
    reset(seed?: number): void;
} // SeededRNG

type RngAlgo = "javascript" | "central" | "randu" | "clib" | "mswin" | "xorshift" | "mersenne";
type RngDistribution = "uniform" | "gaussian";

class DistributedRNG {
    private rng: SeededRNG | null;
    private _rand: () => number;
    rand: () => number;

    get seedInit(): number {
        if (this.rng) return this.rng.seedInit;
        else return 0;
    }

    get seed(): number {
        if (this.rng) return this.rng.seed;
        else return 0;
    }

    set seed(s: number) {
        if (this.rng) this.rng.seed = s;
    }

    constructor(seed: number = Date.now(), algo: RngAlgo = "xorshift", distribution: RngDistribution = "uniform") {
        switch (algo) {
            case "javascript":
                this.rng = null;
                this._rand = Math.random;
                break;
            case "central":
                this.rng = new RNGLib.RandCentral(seed);
                this._rand = this.rng.rand.bind(this.rng);
                break;
            case "randu":
                this.rng = new RNGLib.RandU(seed);
                this._rand = this.rng.rand.bind(this.rng);
                break;
            case "clib":
                this.rng = new RNGLib.RandCLib(seed);
                this._rand = this.rng.rand.bind(this.rng);
                break;
            case "mswin":
                this.rng = new RNGLib.RandMSWin(seed);
                this._rand = this.rng.rand.bind(this.rng);
                break;
            case "xorshift":
                this.rng = new RNGLib.RandXorshift(seed);
                this._rand = this.rng.rand.bind(this.rng);
                break;
            case "mersenne":
                this.rng = new RNGLib.RandMersenne(seed);
                this._rand = this.rng.rand.bind(this.rng);
                break;
        } // switch

        switch (distribution) {
            case "uniform":
                this.rand = this._rand;
                break;
            case "gaussian":
                this.rand = RNGLib.randNorm;
                break;
        } // switch
    } // constructor

    reset(seed?: number) {
        if (this.rng) {
            this.rng.reset(seed);
        }
    } // reset
} // DistributedRNG
