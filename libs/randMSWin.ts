// randMSWin.ts

namespace RNGLib {
    export class RandMSWin {
        seedInit: number;
        seed: number;

        constructor(seed: number = Date.now()) {
            this.seedInit = seed;
            this.seed = seed;
            this.reset(seed);
        }

        // Microsoft Windows default random number generator
        // See: http://blog.olivier.coupelon.net/2008/02/microsoft-windows-default-random-number.html
        rand(): number {
            this.seed = this.seed * 214013 + 2531011;
            this.seed = (this.seed / 65536) % 32768; // extract bits 30..16
            return this.seed / 32767.0;
        } // rand

        reset(seed?: number): void {
             this.seed = seed ? seed : this.seedInit;
        } // reset
    }
}

declare module "randMSWin" {
    export = RNGLib.RandMSWin;
}
