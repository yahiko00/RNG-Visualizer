// randCentral.ts

namespace RNGLib {
    export class RandCentral {
        seedInit: number;
        seed: number;

        constructor(seed: number = Date.now()) {
            this.seedInit = seed;
            this.seed = seed;
            this.reset(seed);
        }

        // The Central Randomizer 1.3 (C) 1997 by Paul Houle (paul@honeylocust.com)
        // See:  http://www.honeylocust.com/javascript/randomizer.html
        rand(): number {
            this.seed = (this.seed * 9301 + 49297) % 233280;
            return this.seed / 233280.0;
        } // rand

        reset(seed?: number): void {
             this.seed = seed ? seed : this.seedInit;
        } // reset
    }
}

declare module "randCentral" {
    export = RNGLib.RandCentral;
}
