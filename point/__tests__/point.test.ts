import { Coordinate } from '../../coordinate/coordinate';
import bigInt from 'big-integer';
import { Point } from '../point';

describe('point tests', () => {
    it('addition two non equal non-inf points', () => {
        const module = new Coordinate('97');

        const xA = new Coordinate('17');
        const yA = new Coordinate('10');
        const xB = new Coordinate('95');
        const yB = new Coordinate('31');
        const pointA = new Point(xA, yA, module, false);
        const pointB = new Point(xB, yB, module, false);
        const parameterA = new Coordinate('2');

        const result = pointA.add(pointB, parameterA);
        expect(result.getX().getValue().toString()).toEqual('1');
        expect(result.getY().getValue().toString()).toEqual('54');
    });

    it('addition two non equal non-inf points 2', () => {
        const module = new Coordinate('97');

        const xA = new Coordinate('80');
        const yA = new Coordinate('10');
        const xB = new Coordinate('3');
        const yB = new Coordinate('6');
        const pointA = new Point(xA, yA, module, false);
        const pointB = new Point(xB, yB, module, false);
        const parameterA = new Coordinate('2');

        const result = pointA.add(pointB, parameterA);
        expect(result.getX().getValue().toString()).toEqual('80');
        expect(result.getY().getValue().toString()).toEqual('87');
    });

    it('addition two equal non-inf points', () => {
        const module = new Coordinate('97');

        const x = new Coordinate('17');
        const y = new Coordinate('10');
        const point = new Point(x, y, module, false);
        const parameterA = new Coordinate('2');

        const result = point.add(point, parameterA);
        expect(result.getX().getValue().toString()).toEqual('32');
        expect(result.getY().getValue().toString()).toEqual('90');
    });

    it('addition two symmetry points', () => {
        const module = new Coordinate('13');

        const xA = new Coordinate('4');
        const yA = new Coordinate('6');
        const xB = new Coordinate('4');
        const yB = new Coordinate('7');
        const pointA = new Point(xA, yA, module, false);
        const pointB = new Point(xB, yB, module, false);
        const parameterA = new Coordinate('2');

        const result = pointA.add(pointB, parameterA);
        expect(result.isInfinity()).toBeTruthy();
    });

    it('one point is infinity', () => {
        const module = new Coordinate('13');

        const xA = new Coordinate('4');
        const yA = new Coordinate('6');
        const pointA = new Point(xA, yA, module, false);
        const pointB = new Point(Coordinate.zeroCoordinateFactory(), Coordinate.zeroCoordinateFactory(), module, true);
        const parameterA = new Coordinate('2');

        const result = pointA.add(pointB, parameterA);
        expect(result.getX().getValue().toString()).toEqual('4');
        expect(result.getY().getValue().toString()).toEqual('6');
    });

    it('scalar multiplication', () => {
        const module = new Coordinate('97');

        const x = new Coordinate('3');
        const y = new Coordinate('6');
        const point = new Point(x, y, module, false);
        const parameterA = new Coordinate('2');

        const result = point.multiply(bigInt('8'), parameterA);

        expect(result.getX().getValue().toString()).toEqual('80');
        expect(result.getY().getValue().toString()).toEqual('87');
    })
});
