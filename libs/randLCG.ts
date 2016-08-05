// randLCG.ts

namespace RNGLib {
    export class RandLCG {
        seedInit: number;
        seed: number;

        constructor(seed: number = Date.now()) {
            this.seedInit = seed;
            this.seed = seed;
            this.reset(seed);
        }

        // Linear Congruential Generator
        // See: http://en.wikipedia.org/wiki/Linear_congruential_generator
        rand(modulus: number, multiplier: number, increment: number): number {
            this.seed = (this.seed * multiplier + increment) % modulus;
            return this.seed / modulus;
        } // rand

        reset(seed?: number): void {
             this.seed = seed ? seed : this.seedInit;
        } // reset
    }
}

declare module "randLCG" {
    export = RNGLib.RandLCG;
}
