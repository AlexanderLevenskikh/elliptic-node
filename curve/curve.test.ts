import { Curve } from './curve';
import { Coordinate } from '../coordinate/coordinate';
import { Point } from '../point/point';
import { FieldTypeEnum } from '../fieldTypeEnum';
import { BinaryPolynomial } from '../coordinate/binaryPolynomial';
import { BinaryPoint } from '../point/binaryPoint';

describe('curve', () => {
    it('Поле характеристики > 3', () => {
        const a: Coordinate = new Coordinate('2');
        const b: Coordinate = new Coordinate('3');
        const module: Coordinate = new Coordinate('97');
        const curve = new Curve<Coordinate>(FieldTypeEnum.prime, false, a, b, module);

        const x1 = new Coordinate('17');
        const y1 = new Coordinate('10');
        const pointA = new Point(x1, y1, module);

        const x2 = new Coordinate('16');
        const y2 = new Coordinate('10');
        const pointB = new Point(x2, y2, module);
        const pointC = new Point(Coordinate.zeroCoordinateFactory(), Coordinate.zeroCoordinateFactory(), module, true);

        expect(curve.isPointLiesOnCurve(pointA)).toBeTruthy();
        expect(curve.isPointLiesOnCurve(pointB)).toBeFalsy();
        expect(curve.isPointLiesOnCurve(pointC)).toBeTruthy();
    });

    it('Поле характеристики 2', () => {
        const a: BinaryPolynomial = new BinaryPolynomial([ true ]); // 1
        const b: BinaryPolynomial = new BinaryPolynomial([ true, true, true ]); // x2  + x + 1
        const module: BinaryPolynomial = new BinaryPolynomial([ true, true, false, false, true ]);
        const curve = new Curve<BinaryPolynomial>(FieldTypeEnum.bit, false, a, b, module);

        const x1 = new BinaryPolynomial([ true, true ]); // так же подходит 1
        const y1 = new BinaryPolynomial([ true, false, true ]);
        const pointA = new BinaryPoint(x1, y1, module);

        const x2 = new BinaryPolynomial([ true ]);
        const y2 = new BinaryPolynomial([ true, true ]);
        const pointB = new BinaryPoint(x2, y2, module);
        const pointC = new BinaryPoint(BinaryPolynomial.zeroFactory(), BinaryPolynomial.zeroFactory(), module, true);

        expect(curve.isPointLiesOnCurve(pointA)).toBeTruthy();
        expect(curve.isPointLiesOnCurve(pointB)).toBeFalsy();
        expect(curve.isPointLiesOnCurve(pointC)).toBeTruthy();
    });

    it('Поле характеристики 2: 2', () => {
        const a: BinaryPolynomial = new BinaryPolynomial([ true ]); // 1
        const b: BinaryPolynomial = new BinaryPolynomial([ true, true, true ]); // x2  + x + 1
        const module: BinaryPolynomial = new BinaryPolynomial([ true, true, false, false, true ]);
        const curve = new Curve<BinaryPolynomial>(FieldTypeEnum.bit, false, a, b, module);

        const x1 = new BinaryPolynomial([ true, true ]); // так же подходит 1
        const y1 = new BinaryPolynomial([ true, false, true ]);
        const pointA = new BinaryPoint(x1, y1, module);

        const x2 = new BinaryPolynomial([ true ]);
        const y2 = new BinaryPolynomial([ true, true ]);
        const pointB = new BinaryPoint(x2, y2, module);
        const pointC = new BinaryPoint(BinaryPolynomial.zeroFactory(), BinaryPolynomial.zeroFactory(), module, true);

        expect(curve.isPointLiesOnCurve(pointA)).toBeTruthy();
        expect(curve.isPointLiesOnCurve(pointB)).toBeFalsy();
        expect(curve.isPointLiesOnCurve(pointC)).toBeTruthy();
    });
});
