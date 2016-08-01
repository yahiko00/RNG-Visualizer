// randXorshift.ts

namespace RNGLib {
    export class RandXorshift {
        seedInit: number;
        seed: number;

        // Xorshift variables
        private x: number;
        private y: number;
        private z: number;

        constructor(seed: number = Date.now()) {
            this.seedInit = seed;
            this.seed = seed;
            this.reset(seed);
        }

        // Xorshift algorithm
        // See: https://github.com/StickyBeat/pseudo-random-generator-xor-shift
        rand(): number {
            let t = (this.x ^ (this.x << 11)) & 0x7fffffff;
            this.x = this.y;
            this.y = this.z;
            this.z = this.seed;
            this.seed = (this.seed ^ (this.seed >> 19) ^ (t ^ (t >> 8)));
            return this.seed / 2147483648.0;
        } // rand

        reset(seed?: number) {
            this.seed = seed ? seed : this.seedInit;

            // Xorshift initialization
            this.x = 123456789;
            this.y = 362436069;
            this.z = 521288629;
            for (let i = 0; i < 14; i++)
                this.rand(); // skip first random numbers which are not really random
        } // reset
    }
}

declare module 'randXorshift' {
    export = RNGLib.RandXorshift;
}
