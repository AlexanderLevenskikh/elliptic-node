import bigInt, { one, zero } from 'big-integer';
export class Coordinate {
    constructor(value) {
        if (typeof value === 'string') {
            this.value = bigInt(value);
        }
        else {
            this.value = value;
        }
    }
    static zeroCoordinateFactory() {
        return new Coordinate(zero);
    }
    getValue() {
        return this.value;
    }
    notNull() {
        return this.value.neq(zero);
    }
    isEqual(coordinate) {
        return this.value.eq(coordinate.value);
    }
    add(coordinate, module) {
        return new Coordinate(coordinate.value.add(this.value))
            .mod(module);
    }
    sub(coordinate, module) {
        return new Coordinate(this.value.minus(coordinate.value))
            .mod(module);
    }
    divide(coordinate, module) {
        return this
            .multiply(coordinate.getReverseElement(module), module);
    }
    multiply(coordinate, module) {
        return new Coordinate(coordinate.value.multiply(this.value))
            .mod(module);
    }
    mod(module) {
        const modResultValue = this.value.mod(module.value);
        let modResult = new Coordinate(modResultValue);
        if (modResultValue.lesser(zero)) {
            modResult = new Coordinate(modResultValue.add(module.value));
        }
        return modResult;
    }
    getReverseElement(module) {
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
}
