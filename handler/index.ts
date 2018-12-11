import { ProgramInput } from '../inputInterface';
import { BinaryPolynomial } from '../coordinate/binaryPolynomial';
import { mapCoefficients } from '../utils/mapCoefficients';
import { Curve } from '../curve/curve';
import { FieldTypeEnum } from '../fieldTypeEnum';
import { BinaryPoint } from '../point/binaryPoint';
import { Coordinate } from '../coordinate/coordinate';
import { Point } from '../point/point';
import bigInt from 'big-integer';

// @ts-ignore
export function handler(input: any): string {
    const { module } = input;

    let result;

    if (Array.isArray(module)) {
        const inputBinary = <ProgramInput<number[]>> input;
        const { a, b, factor, x, x1, x2, y, y1, y2 } = inputBinary;


        if (!module || module.length === 0) {
            return 'Введите коэффициенты порождающего многочлена';
        }

        const modulePolynomial = new BinaryPolynomial(mapCoefficients(module));

        const nullPoint = new BinaryPoint(new BinaryPolynomial([]), new BinaryPolynomial([]), modulePolynomial, true);

        const aPolynomial = new BinaryPolynomial(mapCoefficients(a));
        const bPolynomial = new BinaryPolynomial(mapCoefficients(b));

        const curve: Curve<BinaryPolynomial> = new Curve<BinaryPolynomial>(
            FieldTypeEnum.bit,
            false,
            aPolynomial,
            bPolynomial,
            modulePolynomial,
        );

        // Умножение
        if (factor) {
            const factorBigInt = bigInt(factor);

            let point;

            if (!x || !y) {
                point = nullPoint.infinityPointFactory();
            } else {
                const xPolynomial = new BinaryPolynomial(mapCoefficients(x));
                const yPolynomial = new BinaryPolynomial(mapCoefficients(y));

                point = new BinaryPoint(xPolynomial, yPolynomial, modulePolynomial, false);
            }

            if (!curve.isPointLiesOnCurve(point)) {
                return 'Точка не лежит на кривой.';
            }

            result = point.multiply(factorBigInt, aPolynomial);

            return result.toString();
        } else {
            let pointA, pointB;

            if (!x1 || !y1) {
                pointA = nullPoint.infinityPointFactory();
            } else {
                const x1Polynomial = new BinaryPolynomial(mapCoefficients(x1));
                const y1Polynomial = new BinaryPolynomial(mapCoefficients(y1));

                pointA = new BinaryPoint(x1Polynomial, y1Polynomial, modulePolynomial, false);
            }
            if (!curve.isPointLiesOnCurve(pointA)) {
                return 'Точка А не лежит на кривой.';
            }

            if (!x2 || !y2) {
                pointB = nullPoint.infinityPointFactory();
            } else {
                const x2Polynomial = new BinaryPolynomial(mapCoefficients(x2));
                const y2Polynomial = new BinaryPolynomial(mapCoefficients(y2));

                pointB = new BinaryPoint(x2Polynomial, y2Polynomial, modulePolynomial, false);
            }
            if (!curve.isPointLiesOnCurve(pointB)) {
                return 'Точка В не лежит на кривой.';
            }

            result = pointA.add(pointB, aPolynomial);

            return result.toString();
        }
    } else if (typeof module === 'string') {
        const inputPrime = <ProgramInput<string>> input;
        const { a, b, factor, x, x1, x2, y, y1, y2 } = inputPrime;
        const moduleCoordinate = new Coordinate(module);

        const nullPoint = new Point(new Coordinate('0'), new Coordinate('0'), moduleCoordinate, true);

        if (moduleCoordinate.getValue().leq(bigInt('3'))) {
            return 'char(F) === 2 or char(F) > 3';
        }

        const aCoordinate = new Coordinate(a);
        const bCoordinate = new Coordinate(b);

        const curve: Curve<Coordinate> = new Curve<Coordinate>(
            FieldTypeEnum.prime,
            false,
            aCoordinate,
            bCoordinate,
            moduleCoordinate,
        );

        // Умножение
        if (factor) {
            const factorBigInt = bigInt(factor);

            let point;

            if (!x || !y) {
                point = nullPoint.infinityPointFactory();
            } else {
                const xCoordinate = new Coordinate(x);
                const yCoordinate = new Coordinate(y);

                point = new Point(xCoordinate, yCoordinate, moduleCoordinate, false);
            }

            if (!curve.isPointLiesOnCurve(point)) {
                return 'Точка не лежит на кривой.';
            }

            result = point.multiply(factorBigInt, aCoordinate);

            return `10: ${result.toString()}\r\n16: ${result.toHexString()}`;
        } else {
            let pointA, pointB;

            if (!x1 || !y1) {
                pointA = nullPoint.infinityPointFactory();
            } else {
                const x1Coordinate = new Coordinate(x1);
                const y1Coordinate = new Coordinate(y1);

                pointA = new Point(x1Coordinate, y1Coordinate, moduleCoordinate, false);
            }
            if (!curve.isPointLiesOnCurve(pointA)) {
                return 'Точка А не лежит на кривой.';
            }

            if (!x2 || !y2) {
                pointB = nullPoint.infinityPointFactory();
            } else {
                const x2Coordinate = new Coordinate(x2);
                const y2Coordinate = new Coordinate(y2);

                pointB = new Point(x2Coordinate, y2Coordinate, moduleCoordinate, false);
            }
            if (!curve.isPointLiesOnCurve(pointB)) {
                return 'Точка В не лежит на кривой.';
            }

            result = pointA.add(pointB, aCoordinate);

            return `10: ${result.toString()}\r\n16: ${result.toHexString()}`;
        }
    }
}
