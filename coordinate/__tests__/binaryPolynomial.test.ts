import { BinaryPolynomial } from '../binaryPolynomial';

describe('binaryPolynomial tests', () => {
    it('normalization', () => {
        const a = [ true, true, false, true, false, false ];
        const b = [ false, false, true, true ];
        const c = [ false, false, true, true, false ];
        const d = [ false, false ];
        const e = [ false ];

        expect(BinaryPolynomial.normalizeCoefficients(a)).toEqual([ true, true, false, true ]);
        expect(BinaryPolynomial.normalizeCoefficients(b)).toEqual([ false, false, true, true ]);
        expect(BinaryPolynomial.normalizeCoefficients(c)).toEqual([ false, false, true, true ]);
        expect(BinaryPolynomial.normalizeCoefficients(d)).toEqual([]);
        expect(BinaryPolynomial.normalizeCoefficients(e)).toEqual([]);
    });

    it('addition', () => {
        const a = new BinaryPolynomial([ true, true, false, true ]); // x3 + x + 1
        const b = new BinaryPolynomial([ false, true, true, true ]); // x3 + x2 + x

        const result = a.add(b);
        const coefficients = result.getCoefficients();
        const degree = result.getDegree();

        expect(coefficients).toEqual([ true, false, true ]);
        expect(degree).toEqual(2);
    });

    it('addition 2', () => {
        const a = new BinaryPolynomial([ true, true, false ]); // x + 1
        const b = new BinaryPolynomial([ false, true, true, true ]); // x3 + x2 + x

        const result = a.add(b);
        const coefficients = result.getCoefficients();
        const degree = result.getDegree();

        expect(coefficients).toEqual([ true, false, true, true ]);
        expect(degree).toEqual(3);
    });

    it('addition 3', () => {
        const a = new BinaryPolynomial([ ]); // 0
        const b = new BinaryPolynomial([ false, true, true ]); // x2 + x

        const result = a.add(b);
        const coefficients = result.getCoefficients();
        const degree = result.getDegree();

        expect(coefficients).toEqual([ false, true, true ]);
        expect(degree).toEqual(2);
    });

    it('multiplication', () => {
        const a = new BinaryPolynomial([ true, true ]); // x + 1
        const b = new BinaryPolynomial([ false, true ]); // x
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const result = a.multiply(b, module);

        expect(result.getCoefficients()).toEqual([ false, true, true ]);
        expect(result.getDegree()).toEqual(2);
    });

    it('multiplication 1', () => {
        const a = new BinaryPolynomial([ true, true ]); // x + 1
        const b = new BinaryPolynomial([ false ]); // x
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const result = a.multiply(b, module);

        expect(result.getCoefficients()).toEqual([ ]);
        expect(result.getDegree()).toEqual(0);
    });

    it('multiplication 2', () => {
        const a = new BinaryPolynomial([ true, true, true, true ]); // x3 + x2 + x + 1
        const b = new BinaryPolynomial([ false, true ]); // x
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const result = a.multiply(b, module);

        expect(result.getCoefficients()).toEqual([ true, false, true, true ]);
        expect(result.getDegree()).toEqual(3);
    });

    it('polynomial division', () => {
        const a = new BinaryPolynomial([ true, true, false, true ]); // x3 + x + 1
        const b = new BinaryPolynomial([ true, true ]); // x + 1

        const divisionResult = a._divide(b);
        const div = divisionResult.result;
        const residue = divisionResult.residue;

        expect(div.getCoefficients()).toEqual([ false, true, true ]);
        expect(div.getDegree()).toEqual(2);

        expect(residue.getCoefficients()).toEqual([ true ]);
        expect(residue.getDegree()).toEqual(0);
    });

    it('polynomial division 1', () => {
        const a = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const b = new BinaryPolynomial([ true, true ]); // x + 1

        const divisionResult = a._divide(b);
        const div = divisionResult.result;
        const residue = divisionResult.residue;

        expect(div.getCoefficients()).toEqual([ true, true ]);
        expect(div.getDegree()).toEqual(1);

        expect(residue.getCoefficients()).toEqual([ ]);
        expect(residue.getDegree()).toEqual(0);
    });

    it('polynomial division first polynomial degree less than second p. degree', () => {
        const a = new BinaryPolynomial([ true, true, false, true ]); // x3 + x + 1
        const b = new BinaryPolynomial([ true, true ]); // x + 1

        const divisionResult = b._divide(a);
        const div = divisionResult.result;
        const residue = divisionResult.residue;

        expect(div.getCoefficients()).toEqual([ true ]);
        expect(div.getDegree()).toEqual(0);

        expect(residue.getCoefficients()).toEqual([ true, true ]);
        expect(residue.getDegree()).toEqual(1);
    });

    it('reversed element', () => {
        const a = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const reversedElement = a.getReverseElement(module);

        expect(reversedElement.getCoefficients()).toEqual([ true, true, false, true ]);
        expect(reversedElement.getDegree()).toEqual(3);
    });

    it('reversed element 2', () => {
        const a = new BinaryPolynomial([ true, true ]); // x + 1
        const module = new BinaryPolynomial([ true, true, true ]); // x2+x+1

        const reversedElement = a.getReverseElement(module);

        expect(reversedElement.getCoefficients()).toEqual([ false, true ]); // x
        expect(reversedElement.getDegree()).toEqual(1);
    });

    it('reversed element 3', () => {
        const a = new BinaryPolynomial([ true, true ]); // x + 1
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const reversedElement = a.getReverseElement(module);

        expect(reversedElement.getCoefficients()).toEqual([ false, true, true, true ]);
        expect(reversedElement.getDegree()).toEqual(3);
    });

    it('reversed element 4', () => {
        const a = new BinaryPolynomial([ false, true ]); // x
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const reversedElement = a.getReverseElement(module);

        expect(reversedElement.getCoefficients()).toEqual([ true, false, false, true ]);
        expect(reversedElement.getDegree()).toEqual(3);
    });

    it('division', () => {
        const a = new BinaryPolynomial([ true, true ]); // x + 1
        const b = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // x4+x+1

        const reversedElement = a.divide(b, module);

        expect(reversedElement.getCoefficients()).toEqual([ false, true, true, true ]);
        expect(reversedElement.getDegree()).toEqual(3);
    });

    it('module', () => {
        const a = new BinaryPolynomial([ true, true, false, true ]); // x3 + x + 1
        const module = new BinaryPolynomial([ true, true ]); // x + 1

        const divisionResult = a.mod(module);

        expect(divisionResult.getCoefficients()).toEqual([ true ]);
        expect(divisionResult.getDegree()).toEqual(0);
    });
});
