export class BinaryPolynomial {
    constructor(coefficients) {
        const normalizedCoefficients = BinaryPolynomial.normalizeCoefficients(coefficients);
        this.coefficients = [...normalizedCoefficients];
        this.degree = normalizedCoefficients.length > 0 ? normalizedCoefficients.length - 1 : 0;
    }
    static normalizeCoefficients(coefficients) {
        let endIndex = -1;
        coefficients.forEach((c, index) => endIndex = c ? index : endIndex);
        if (endIndex === -1) {
            return [];
        }
        return coefficients.slice(0, endIndex + 1);
    }
    getCoefficients() {
        return this.coefficients;
    }
    getDegree() {
        return this.degree;
    }
    notNull() {
        return this.degree !== 0 || this.get(0);
    }
    isEqual(binaryPolinmoal) {
        if (this.degree !== binaryPolinmoal.degree) {
            return false;
        }
        const hasDifferentCoefficients = this.coefficients
            .some((c, index) => c !== binaryPolinmoal.coefficients[index]);
        return !hasDifferentCoefficients;
    }
    add(binaryPolynomial) {
        const degree = Math.max(binaryPolynomial.degree, this.degree);
        const coefficients = Array.from(Array(degree + 1)).map((_, index) => {
            return binaryPolynomial.get(index) !== this.get(index);
        });
        return new BinaryPolynomial(BinaryPolynomial.normalizeCoefficients(coefficients));
    }
    sub(binaryPolynomial) {
        return this.add(binaryPolynomial);
    }
    divide(binaryPolynomial, module) {
        return this
            .multiply(binaryPolynomial.getReverseElement(module), module);
    }
    multiply(binaryPolynomial, module) {
        return this
            ._multiply(binaryPolynomial)
            .mod(module);
    }
    mod(module) {
        return this._divide(module).residue;
    }
    getReverseElement(module) {
        const value = this.mod(module);
        let a = value.mod(module);
        let b = module;
        let q, r, divResult;
        let k = BinaryPolynomial.zeroFactory(), r1 = BinaryPolynomial.polynomialByDegreeFactory(0), r2 = BinaryPolynomial.zeroFactory();
        while (a.notNull()) {
            divResult = b._divide(a);
            q = divResult.result;
            r = divResult.residue;
            k = r2.add(q._multiply(r1));
            b = a;
            a = r;
            r2 = r1;
            r1 = k;
        }
        return r2.mod(module);
    }
    _divide(dividerPolynomial) {
        if (dividerPolynomial.degree > this.degree) {
            return {
                result: BinaryPolynomial.polynomialByDegreeFactory(0),
                residue: new BinaryPolynomial(this.coefficients),
            };
        }
        const resultPolynomial = BinaryPolynomial.zeroFactory();
        let residuePolynomial = new BinaryPolynomial(this.coefficients);
        while (residuePolynomial.degree >= dividerPolynomial.degree && residuePolynomial.notNull()) {
            const factorDegree = residuePolynomial.degree - dividerPolynomial.degree;
            const factorPolynomial = BinaryPolynomial.polynomialByDegreeFactory(factorDegree);
            const addendumPolynomial = dividerPolynomial._multiply(factorPolynomial);
            // In GF(2) equals with subtraction
            residuePolynomial = residuePolynomial.add(addendumPolynomial);
            resultPolynomial.set(factorDegree, true);
        }
        return {
            result: new BinaryPolynomial(BinaryPolynomial.normalizeCoefficients(resultPolynomial.coefficients)),
            residue: new BinaryPolynomial(BinaryPolynomial.normalizeCoefficients(residuePolynomial.coefficients)),
        };
    }
    _multiply(binaryPolynomial) {
        const degree = binaryPolynomial.degree + this.degree;
        const resultPolynomial = BinaryPolynomial.zeroFactory();
        for (let i = 0; i <= degree; i++) {
            for (let j = 0; j <= i; j++) {
                const prevValue = resultPolynomial.get(i);
                resultPolynomial.set(i, prevValue !== (this.get(j) && binaryPolynomial.get(i - j)));
            }
        }
        return new BinaryPolynomial(resultPolynomial.coefficients);
    }
    get(index) {
        return Boolean(this.coefficients[index]);
    }
    set(index, value) {
        let coefficients = this.coefficients.length < index + 1
            ? Array.from(Array(index + 1)).map((_, i) => Boolean(this.coefficients[i]))
            : this.coefficients;
        coefficients = [
            ...coefficients.slice(0, index),
            value,
            ...coefficients.slice(index + 1),
        ];
        const normalizedCoefficients = BinaryPolynomial.normalizeCoefficients(coefficients);
        this.coefficients = [...normalizedCoefficients];
        this.degree = normalizedCoefficients.length > 0 ? normalizedCoefficients.length - 1 : 0;
    }
}
BinaryPolynomial.polynomialByDegreeFactory = (degree) => {
    const coefficients = Array.from(Array(degree + 1)).map(_ => false);
    coefficients[coefficients.length - 1] = true;
    return new BinaryPolynomial(coefficients);
};
BinaryPolynomial.zeroFactory = () => {
    return new BinaryPolynomial([]);
};
