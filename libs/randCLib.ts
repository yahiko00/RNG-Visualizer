// randCLib.ts

namespace RNGLib {
    export class RandCLib {
        seedInit: number;
        seed: number;

        constructor(seed: number = Date.now()) {
            this.seedInit = seed;
            this.seed = seed;
            this.reset(seed);
        }

        // rand() function from C Standard Library
        rand(): number {
            this.seed = this.seed * 1103515245 + 12345;
            this.seed = (this.seed / 65536) % 32768; // extract bits 30..16 

            return this.seed / 32767.0;
        } // rand

        reset(seed?: number): void {
             this.seed = seed ? seed : this.seedInit;
        } // reset
    }
}

declare module 'randCLib' {
    export = RNGLib.RandCLib;
}
