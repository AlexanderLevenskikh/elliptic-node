import * as fs from 'fs';
import { BinaryPolynomial } from './coordinate/binaryPolynomial';
import { mapCoefficients } from './utils/mapCoefficients';
import { BinaryPoint } from './point/binaryPoint';
import { Coordinate } from './coordinate/coordinate';
import { Curve } from './curve/curve';
import { FieldTypeEnum } from './fieldTypeEnum';
import bigInt = require('big-integer');
import { IPoint } from './point/pointInterface';
import { ICoordinate } from './coordinate/coordinateInterface';

const input = require('./input.json');

(() => {
    const { module } = input;

    if (Array.isArray(module)) {
        const inputBinary = <number[]> input;
        const { a, b, factor, x, x1, x2, y, y1, y2 } = input;

        if (!module || module.length === 0) {
            console.error('Введите коэффициенты порождающего многочлена');
        }

        const modulePolynomial = new BinaryPolynomial(mapCoefficients(module));

        const aPolynomial = new BinaryPolynomial(mapCoefficients(a));
        const bPolynomial = new BinaryPolynomial(mapCoefficients(b));

        const curve: Curve<BinaryPolynomial> = new Curve<BinaryPolynomial>(
            FieldTypeEnum.prime,
            false,
            aPolynomial,
            bPolynomial,
            modulePolynomial,
        );

        // Умножение
        if (factor) {
            const factorBigInt = bigInt(factor);

            if (!x || !y || typeof x === 'string' || typeof y === 'string') {
                console.error('Введите коэффициенты точек (X, Y)) в виде массива');
                return;
            }
            const xPolynomial = new BinaryPolynomial(mapCoefficients(x));
            const yPolynomial = new BinaryPolynomial(mapCoefficients(y));

            const point = new BinaryPoint(xPolynomial, yPolynomial, modulePolynomial, false);

            if (!curve.isPointLiesOnCurve(point)) {
                console.error('Точка не лежит на кривой.');
                return;
            }

            const result = point.multiply(factorBigInt, aPolynomial);
            console.log(xPolynomial, yPolynomial, aPolynomial, factorBigInt.toString(), result);
        } else {
            if (!x1 || !y1 || typeof x1 === 'string' || typeof y1 === 'string' || !x2 || !y2 || typeof x2 === 'string' || typeof y2 === 'string') {
                console.error('Введите коэффициенты точек (X1, Y1), (X2, Y2) в виде массива');
                return;
            }
            const x1Polynomial = new BinaryPolynomial(mapCoefficients(x1));
            const y1Polynomial = new BinaryPolynomial(mapCoefficients(y1));

            const x2Polynomial = new BinaryPolynomial(mapCoefficients(x2));
            const y2Polynomial = new BinaryPolynomial(mapCoefficients(y2));

            const pointA = new BinaryPoint(x1Polynomial, y1Polynomial, modulePolynomial, false);
            if (!curve.isPointLiesOnCurve(pointA)) {
                console.error('Точка А не лежит на кривой.');
                return;
            }

            const pointB = new BinaryPoint(x2Polynomial, y2Polynomial, modulePolynomial, false);
            if (!curve.isPointLiesOnCurve(pointB)) {
                console.error('Точка В не лежит на кривой.');
                return;
            }

            const result = pointA.add(pointB, aPolynomial);
            console.log(result);
        }
    } else if (typeof module === 'string') {
        const inputPrime = <string> input;
        const { a, b, factor, x, x1, x2, y, y1, y2 } = input;
        const moduleCoordinate = new Coordinate(module);

        if (moduleCoordinate.getValue().leq(bigInt('3'))) {
            console.error('char(F) === 2 or char(F) > 3');
        }
    }

    fs.writeFile('output.txt', 'Hello Node.js', (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
})();
