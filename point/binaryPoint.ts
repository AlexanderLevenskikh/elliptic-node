import { IPoint } from './pointInterface';
import { BinaryPolynomial } from '../coordinate/binaryPolynomial';
import { PointAbstract } from './pointAbstract';
import { BigInteger, one, zero } from 'big-integer';

export class BinaryPoint extends PointAbstract<BinaryPolynomial> implements IPoint<BinaryPolynomial> {
    public infinityPointFactory = () => {
        const zero = BinaryPolynomial.zeroFactory();
        // Потому что в TypeScript нельзя нормально перегружать конструкторы...
        return new BinaryPoint(zero, zero, this.module, true);
    };

    public add(point: BinaryPoint, a: BinaryPolynomial): BinaryPoint {
        if (this.isInfinityPoint) {
            return point;
        }

        if (point.isInfinityPoint) {
            return this;
        }

        if (point.isSymmetricAlongYAxis(this)) {
            return this.infinityPointFactory();
        }

        let lambda, x;
        if (point.isEqual(this)) {
            lambda = this.y
                .divide(this.x, this.module)
                .add(this.x);

            x = lambda
                .multiply(lambda, this.module)
                .add(lambda)
                .add(a);
        } else {
            lambda = this.y.add(point.y)
                .divide(
                    this.x.add(point.x),
                    this.module
                );
            const lambda2 = lambda.multiply(lambda, this.module);

            x = lambda2
                .add(lambda)
                .add(this.x)
                .add(point.x)
                .add(a);
        }

        const y = lambda
            .multiply(this.x.add(x), this.module)
            .add(x)
            .add(this.y);

        return new BinaryPoint(x, y, this.module);
    }

    public multiply(factor: BigInteger, a: BinaryPolynomial): BinaryPoint {
        if (factor.isEven()) {
            return this.add(this._multiply(factor.minus(one), a), a);
        } else {
            return this._multiply(factor, a);
        }
    }

    public _multiply(factor: BigInteger, a: BinaryPolynomial): BinaryPoint {
        const binaryString = factor.toString(2);
        let degree = new BinaryPoint(this.x, this.y, this.module, this.isInfinityPoint);
        let result = degree.infinityPointFactory();

        for (let i = 0; i < binaryString.length; i++) {
            if (binaryString[binaryString.length - 1 - i] === '1') {
                result = result.add(degree, a);
            }
            degree = degree.add(degree, a);
        }

        return result;
    };
}
