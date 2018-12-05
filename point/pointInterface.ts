import { ICoordinate } from '../coordinate/coordinateInterface';
import { BigInteger } from 'big-integer';

export interface IPoint<T extends ICoordinate<T>> {
    isInfinity(): boolean;
    getX(): T;
    getY(): T;
    add(addend: IPoint<T>, a: ICoordinate<T>): IPoint<T>;
    multiply(factor: BigInteger, a: ICoordinate<T>): IPoint<T>;
    isEqual(point: IPoint<T>): boolean;
    isSymmetricAlongYAxis(point: IPoint<T>): boolean;
}
