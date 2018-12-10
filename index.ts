import * as fs from 'fs';
import { BinaryPolynomial } from './coordinate/binaryPolynomial';
import { mapCoefficients } from './utils/mapCoefficients';
import { BinaryPoint } from './point/binaryPoint';
import { Coordinate } from './coordinate/coordinate';
import { Curve } from './curve/curve';
import { FieldTypeEnum } from './fieldTypeEnum';
import { ProgramInput } from './inputInterface';
import bigInt = require('big-integer');

const input = require('./input.json');

(() => {
    const { module } = input;

    if (Array.isArray(module)) {
        const inputBinary = <ProgramInput<number[]>> input;
        const { a, b, factor, x, x1, x2, y, y1, y2 } = inputBinary;

        if (!module || module.length === 0) {
            console.error('Введите коэффициенты порождающего многочлена');
        }

        const modulePolynomial = new BinaryPolynomial(mapCoefficients(module));

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
                point = BinaryPoint.prototype.infinityPointFactory();
            } else {
                const xPolynomial = new BinaryPolynomial(mapCoefficients(x));
                const yPolynomial = new BinaryPolynomial(mapCoefficients(y));

                point = new BinaryPoint(xPolynomial, yPolynomial, modulePolynomial, false);
            }

            if (!curve.isPointLiesOnCurve(point)) {
                console.error('Точка не лежит на кривой.');
                return;
            }

            const result = point.multiply(factorBigInt, aPolynomial);
        } else {
            let pointA, pointB;

            if (!x1 || !y1) {
                pointA = BinaryPoint.prototype.infinityPointFactory();
            } else {
                const x1Polynomial = new BinaryPolynomial(mapCoefficients(x1));
                const y1Polynomial = new BinaryPolynomial(mapCoefficients(y1));

                pointA = new BinaryPoint(x1Polynomial, y1Polynomial, modulePolynomial, false);
            }
            if (!curve.isPointLiesOnCurve(pointA)) {
                console.error('Точка А не лежит на кривой.');
                return;
            }

            if (!x2 || !y2) {
                pointB = BinaryPoint.prototype.infinityPointFactory();
            } else {
                const x2Polynomial = new BinaryPolynomial(mapCoefficients(x2));
                const y2Polynomial = new BinaryPolynomial(mapCoefficients(y2));

                pointB = new BinaryPoint(x2Polynomial, y2Polynomial, modulePolynomial, false);
            }
            if (!curve.isPointLiesOnCurve(pointB)) {
                console.error('Точка В не лежит на кривой.');
                return;
            }

            const result = pointA.add(pointB, aPolynomial);
            console.log(result);
        }
    } else if (typeof module === 'string') {
        const inputPrime = <ProgramInput<string>> input;
        const { a, b, factor, x, x1, x2, y, y1, y2 } = inputPrime;
        const moduleCoordinate = new Coordinate(module);

        if (moduleCoordinate.getValue().leq(bigInt('3'))) {
            console.error('char(F) === 2 or char(F) > 3');
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
    }

    fs.writeFile('output.txt', 'Hello Node.js', (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
})();
