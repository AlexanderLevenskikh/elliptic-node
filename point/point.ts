import { IPoint } from './pointInterface';
import { Coordinate } from '../coordinate/coordinate';
import { PointAbstract } from './pointAbstract';
import { BigInteger, one, zero } from 'big-integer';

export class Point extends PointAbstract<Coordinate> implements IPoint<Coordinate> {
    public infinityPointFactory = () => {
        const zeroCoordinate = Coordinate.zeroCoordinateFactory();
        return new Point(zeroCoordinate, zeroCoordinate, this.module, true);
    };

    public add(point: Point, a: Coordinate): Point {
        if (this.isInfinityPoint) {
            return point;
        }

        if (point.isInfinityPoint) {
            return this;
        }

        if (point.isSymmetricAlongYAxis(this)) {
            return this.infinityPointFactory();
        }

        let lambda;
        if (point.isEqual(this)) {
            const two = new Coordinate(one.add(one));
            const three = new Coordinate(one.add(one).add(one));
            lambda = three
                .multiply(this.x, this.module)
                .multiply(this.x, this.module)
                .add(a, this.module)
                .divide(two.multiply(this.y, this.module), this.module);
        } else {
            lambda = point.y.sub(this.y, this.module)
                .divide(point.x.sub(this.x, this.module), this.module);
        }

        const x = lambda
            .multiply(lambda, this.module)
            .sub(this.x, this.module)
            .sub(point.x, this.module);

        const y = lambda
            .multiply(x.sub(this.x, this.module), this.module)
            .add(this.y, this.module)
            .multiply(new Coordinate('-1'), this.module)
            .mod(this.module);

        return new Point(x, y, this.module);
    }

    public multiply(factor: BigInteger, a: Coordinate): Point {
        let result = this.infinityPointFactory();

        for (let i = zero; i.lesser(factor); i = i.add(one)) {
            result = result.add(this, a);
        }

        return result;
    };
}
