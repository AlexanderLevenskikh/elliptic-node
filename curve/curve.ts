import { IPoint } from '../point/pointInterface';
import { ICoordinate } from '../coordinate/coordinateInterface';
import { FieldTypeEnum } from '../fieldTypeEnum';

export interface ICurve<T extends ICoordinate<T>> {
    isPointLiesOnCurve(point: IPoint<T>): boolean;
}

export class Curve<T extends ICoordinate<T>> implements ICurve<T> {
    fieldType: FieldTypeEnum;
    isSupersingular: boolean;
    a: T;
    b: T;
    module: T;

    constructor(fieldType: FieldTypeEnum, isSupersingular: boolean, a: T, b: T, module: T) {
        this.fieldType = fieldType;
        this.isSupersingular = isSupersingular;
        this.a = a;
        this.b = b;
        this.module = module;
    }

    public isPointLiesOnCurve(point: IPoint<T>): boolean {
        if (point.isInfinity()) {
            return true;
        }

        const x = point.getX();
        const y = point.getY();
        const x2 = x.multiply(x, this.module);
        const y2 = y.multiply(y, this.module);
        const x3 = x2.multiply(x, this.module);
        const xy = x.multiply(y, this.module);

        if (this.fieldType === FieldTypeEnum.bit) {
            if (this.isSupersingular) {
                const left = y2.add(y, this.module);
                const right = x3
                    .add(this.a.multiply(x, this.module), this.module)
                    .add(this.b, this.module);

                return left.isEqual(right);
            } else {
                const left = y2.add(xy, this.module);
                const right = x3
                    .add(this.a.multiply(x2, this.module), this.module)
                    .add(this.b, this.module);

                return left.isEqual(right);
            }
        } else {
            const right = x3
                .add(this.a.multiply(x, this.module), this.module)
                .add(this.b, this.module);

            return y2.isEqual(right);
        }
    }
}
