import { ICoordinate } from './coordinateInterface';
import bigInt, { BigInteger, one, zero } from 'big-integer';

export class Coordinate implements ICoordinate<Coordinate> {
    private readonly value: BigInteger;

    constructor(value: string | BigInteger) {
        if (typeof value === 'string') {
            this.value = <BigInteger> bigInt(value);
        } else {
            this.value = value;
        }
    }

    public static zeroCoordinateFactory() {
        return new Coordinate(zero);
    }

    public getValue(): BigInteger {
        return this.value;
    }

    public notNull(): boolean {
        return this.value.neq(zero);
    }

    public isEqual(coordinate: Coordinate): boolean {
        return this.value.eq(coordinate.value);
    }

    public add(coordinate: Coordinate, module: Coordinate): Coordinate {
        return new Coordinate(coordinate.value.add(this.value))
            .mod(module);
    }

    public sub(coordinate: Coordinate, module: Coordinate): Coordinate {
        return new Coordinate(this.value.minus(coordinate.value))
            .mod(module);
    }

    public divide(coordinate: Coordinate, module: Coordinate): Coordinate {
        return this
            .multiply(coordinate.getReverseElement(module), module);
    }

    public multiply(coordinate: Coordinate, module: Coordinate): Coordinate {
        return new Coordinate(coordinate.value.multiply(this.value))
            .mod(module);
    }

    public mod(module: Coordinate): Coordinate {
        const modResultValue = this.value.mod(module.value);
        let modResult = new Coordinate(modResultValue);

        if (modResultValue.lesser(zero)) {
            modResult = new Coordinate(modResultValue.add(module.value));
        }
        return modResult;
    }

    public getReverseElement(module: Coordinate): Coordinate {
        const value = this.mod(module).getValue();
        const moduleValue = module.getValue();

        let a = value.mod(moduleValue);
        let b = moduleValue;

        let q, r;
        let k = zero, r1 = one, r2 = zero;

        while (a.greater(zero)) {
            q = b.divide(a);
            r = b.minus(q.multiply(a));
            k = r2.minus(q.multiply(r1));

            b = a;
            a = r;
            r2 = r1;
            r1 = k;
        }

        return new Coordinate(r2).mod(module);
    }

    public toString() {
        return this.getValue().toString();
    }

    public toHexString() {
        return this.getValue().toString(16);
    }
}
