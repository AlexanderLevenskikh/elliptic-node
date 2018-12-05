import { BinaryPolynomial } from '../../coordinate/binaryPolynomial';
import { BinaryPoint } from '../binaryPoint';
import bigInt from 'big-integer';

describe('binaryPoint tests', () => {
    it('addition two non equal non-inf points', () => {
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // GF(2^4)/(x4 + x + 1)

        const xA = new BinaryPolynomial([ true, true ]); // x + 1
        const yA = new BinaryPolynomial([ true ]); // 1
        const xB = new BinaryPolynomial([ true ]); // 1
        const yB = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const pointA = new BinaryPoint(xA, yA, module, false);
        const pointB = new BinaryPoint(xB, yB, module, false);
        const parameterA = new BinaryPolynomial([ true ]);

        const result = pointA.add(pointB, parameterA);
        expect(result.getX().getCoefficients()).toEqual([ true, false, true ]);
        expect(result.getX().getDegree()).toEqual(2);
        expect(result.getY().getCoefficients()).toEqual([ false, false, false, true ]);
        expect(result.getY().getDegree()).toEqual(3);
    });

    it('addition two equal non-inf points', () => {
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // GF(2^4)/(x4 + x + 1)

        const x = new BinaryPolynomial([ true, true ]); // x + 1
        const y = new BinaryPolynomial([ true ]); // 1
        const point = new BinaryPoint(x, y, module, false);
        const parameterA = new BinaryPolynomial([ true ]);

        const result = point.add(point, parameterA);
        expect(result.getX().getCoefficients()).toEqual([ false, true ]);
        expect(result.getX().getDegree()).toEqual(1);
        expect(result.getY().getCoefficients()).toEqual([ false, true, true, true ]);
        expect(result.getY().getDegree()).toEqual(3);
    });

    it('addition two symmetry points', () => {
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // GF(2^4)/(x4 + x + 1)

        const xA = new BinaryPolynomial([ true ]); // 1
        const yA = new BinaryPolynomial([ true ]); // 1
        const xB = new BinaryPolynomial([ true ]); // 1
        const yB = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const pointA = new BinaryPoint(xA, yA, module, false);
        const pointB = new BinaryPoint(xB, yB, module, false);
        const parameterA = new BinaryPolynomial([ true ]);

        const result = pointA.add(pointB, parameterA);
        expect(result.isInfinity()).toBeTruthy();
    });

    it('one point is infinity', () => {
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // GF(2^4)/(x4 + x + 1)

        const xA = new BinaryPolynomial([ true ]); // 1
        const yA = new BinaryPolynomial([ true ]); // 1
        const xB = new BinaryPolynomial([ true ]); // 1
        const yB = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const pointA = new BinaryPoint(xA, yA, module, true);
        const pointB = new BinaryPoint(xB, yB, module, false);
        const parameterA = new BinaryPolynomial([ true ]);

        const result = pointA.add(pointB, parameterA);
        expect(result.getX().getCoefficients()).toEqual([ true ]);
        expect(result.getX().getDegree()).toEqual(0);
        expect(result.getY().getCoefficients()).toEqual([ true, false, true ]);
        expect(result.getY().getDegree()).toEqual(2);
    });

    it('scalar multiplication', () => {
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // GF(2^4)/(x4 + x + 1)

        const x = new BinaryPolynomial([ true, true ]); // x + 1
        const y = new BinaryPolynomial([ true ]); // 1
        const point = new BinaryPoint(x, y, module, false);
        const parameterA = new BinaryPolynomial([ true ]);

        let sumResult = point;
        for (let i = 2; i < 10; i++) {
            sumResult = sumResult.add(point, parameterA);
            const multiplicationResult = point.multiply(bigInt(i.toString()), parameterA);

            expect(multiplicationResult.getX().getCoefficients()).toEqual(sumResult.getX().getCoefficients());
            expect(multiplicationResult.getX().getDegree()).toEqual(sumResult.getX().getDegree());
            expect(multiplicationResult.getY().getCoefficients()).toEqual(sumResult.getY().getCoefficients());
            expect(multiplicationResult.getY().getDegree()).toEqual(sumResult.getY().getDegree());
        }
    });

    it('scalar multiplication 2', () => {
        const module = new BinaryPolynomial([ true, true, false, false, true ]); // GF(2^4)/(x4 + x + 1)

        const x = new BinaryPolynomial([ true, true ]); // x + 1
        const y = new BinaryPolynomial([ true, false, true ]); // x2 + 1
        const point = new BinaryPoint(x, y, module, false);
        const parameterA = new BinaryPolynomial([ true ]);

        const multiplicationResult = point.multiply(bigInt('3'), parameterA);

        expect(multiplicationResult.getX().getCoefficients()).toEqual([ true, true, true ]);
        expect(multiplicationResult.getX().getDegree()).toEqual(2);
        expect(multiplicationResult.getY().getCoefficients()).toEqual([ false, false, true, true ]);
        expect(multiplicationResult.getY().getDegree()).toEqual(3);
    });
});
