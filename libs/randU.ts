// randU.ts

namespace RNGLib {
    export class RandU {
        seedInit: number;
        seed: number;

        constructor(seed: number = Date.now()) {
            this.seedInit = seed;
            this.seed = seed;
            this.reset(seed);
        }

        // IBM RANDU
        // See: http://en.wikipedia.org/wiki/RANDU
        rand(): number {
            this.seed = (this.seed * 65539) % 2147483648;
            return this.seed / 2147483648.0;
        } // rand

        reset(seed?: number): void {
             this.seed = seed ? seed : this.seedInit;
        } // reset
    }
}

declare module 'randU' {
    export = RNGLib.RandU;
}
