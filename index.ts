import * as fs from 'fs';
import { ProgramInput } from './inputInterface';
import { BinaryPolynomial } from './coordinate/binaryPolynomial';
import { mapCoefficients } from './utils/mapCoefficients';
import bigInt = require('big-integer');
import { BinaryPoint } from './point/binaryPoint';

const input: ProgramInput = require('./input.json');

(() => {
    const {
        characteristic, a, b, generator, factor, x, x1, x2, y, y1, y2,
    } = input;

    if (characteristic <= 3 && characteristic !== 2) {
        console.error('char(F) === 2 or char(F) > 3');
    }

    if (characteristic === 2) {
        if (!generator || generator.length === 0) {
            console.error('Введите коэффициенты порождающего многочлена');
        }

        const generatingCoefficients = mapCoefficients(generator);
        const generatingPolynomial = new BinaryPolynomial(generatingCoefficients);

        if (typeof a === 'string' || typeof b === 'string') {
            console.error('Введите коэффициенты точек A и B в виде массива');
            return;
        }
        const aCoefficients = mapCoefficients(a);
        const aPolynomial = new BinaryPolynomial(aCoefficients);
        const bCoefficients = mapCoefficients(b);
        const bPolynomial = new BinaryPolynomial(bCoefficients);

        // Умножение
        if (factor) {
            const factorBigInt = bigInt(factor);

            if (!x || !y || typeof x === 'string' || typeof y === 'string') {
                console.error('Введите коэффициенты точек (X, Y)) в виде массива');
                return;
            }
            const xCoefficients = mapCoefficients(x);
            const xPolynomial = new BinaryPolynomial(xCoefficients);
            const yCoefficients = mapCoefficients(y);
            const yPolynomial = new BinaryPolynomial(yCoefficients);

            const point = new BinaryPoint(xPolynomial, yPolynomial, generatingPolynomial, false);
            const result = point.multiply(factorBigInt, aPolynomial);
            console.log(xPolynomial, yPolynomial, aPolynomial, factorBigInt.toString(), result);
        } else {
            if (!x1 || !y1 || typeof x1 === 'string' || typeof y1 === 'string' || !x2 || !y2 || typeof x2 === 'string' || typeof y2 === 'string') {
                console.error('Введите коэффициенты точек (X1, Y1), (X2, Y2) в виде массива');
                return;
            }
            const x1Coefficients = mapCoefficients(x1);
            const x1Polynomial = new BinaryPolynomial(x1Coefficients);
            const y1Coefficients = mapCoefficients(y1);
            const y1Polynomial = new BinaryPolynomial(y1Coefficients);

            const x2Coefficients = mapCoefficients(x2);
            const x2Polynomial = new BinaryPolynomial(x2Coefficients);
            const y2Coefficients = mapCoefficients(y2);
            const y2Polynomial = new BinaryPolynomial(y2Coefficients);

            const pointA = new BinaryPoint(x1Polynomial, y1Polynomial, generatingPolynomial, false);
            const pointB = new BinaryPoint(x2Polynomial, y2Polynomial, generatingPolynomial, false);
            const result = pointA.add(pointB, aPolynomial);
            console.log(result);
        }

    } else {

    }

    fs.writeFile('output.txt', 'Hello Node.js', (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
})()
