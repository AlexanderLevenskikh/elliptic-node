import { IPoint } from './pointInterface';
import { ICoordinate } from '../coordinate/coordinateInterface';
import { BigInteger, one, zero } from 'big-integer';
import { BinaryPoint } from './binaryPoint';

export abstract class PointAbstract<T extends ICoordinate<T>> implements IPoint<T> {
    protected readonly x: T;
    protected readonly y: T;
    protected readonly module: T;
    protected readonly isInfinityPoint: boolean;

    public constructor(x: T, y: T, module: T, isInfinityPoint: boolean = false) {
        // @ts-ignore
        this.x = x.mod(module);
        // @ts-ignore
        this.y = y.mod(module);
        this.module = module;
        this.isInfinityPoint = isInfinityPoint;
    }

    public abstract infinityPointFactory(): PointAbstract<T>;

    public isInfinity() {
        return this.isInfinityPoint;
    }

    public getX(): T {
        return this.x;
    }

    public getY(): T {
        return this.y;
    }

    public isEqual(point: PointAbstract<T>): boolean {
        return this.x.isEqual(point.x) && this.y.isEqual(point.y);
    }

    public isSymmetricAlongYAxis(point: PointAbstract<T>): boolean {
        return this.x.isEqual(point.x) && !this.y.isEqual(point.y);
    }

    public abstract add(point: PointAbstract<T>, a: T): PointAbstract<T>;
    public abstract multiply(factor: BigInteger, a: T): PointAbstract<T>;

    public toString(): string {
        if (this.isInfinityPoint) {
            return 'Inf';
        }

        return `(${this.getX().toString()}, ${this.getY().toString()})`
    }
}
