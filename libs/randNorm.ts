// randNorm.ts

namespace RNGLib {
    // Normal (Gaussian) distribution
    // See: http://www.design.caltech.edu/erik/Misc/Gaussian.html
    export function randNorm(rand: () => number = Math.random): number {
        let x1: number;
        let x2: number;
        let rad: number;

        do {
            x1 = 2 * rand() - 1;
            x2 = 2 * rand() - 1;
            rad = x1 * x1 + x2 * x2;
        } while (rad >= 1 || rad == 0);

        let c = Math.sqrt(-2 * Math.log(rad) / rad);

        return x1 * c;
    } // randNorm
}

declare module 'randNorm' {
    export = RNGLib.randNorm;
}
