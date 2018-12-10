import { mapCoefficients } from './mapCoefficients';

describe('mapCoefficients', function () {
    it('works', () => {
        const arr = [ 2, 5, 4 ];
        const expected = [ false, false, true, false, true, true ];

        expect(mapCoefficients(arr)).toEqual(expected);
    });

    it('null', () => {
        const arr: number[] = [ ];
        const expected: number[] = [ ];

        expect(mapCoefficients(arr)).toEqual(expected);
    });

    it('1', () => {
        const arr = [ 0 ];
        const expected = [ true ];

        expect(mapCoefficients(arr)).toEqual(expected);
    })
});
