import { ICoordinate } from './coordinateInterface';
import { one, zero } from 'big-integer';

export interface DivisionResult extends IDivisionResult<BinaryPolynomial> {
    result: BinaryPolynomial;
    residue: BinaryPolynomial;
}

export interface IDivisionResult<T> {
    result: T;
    residue: T;
}

export class BinaryPolynomial implements ICoordinate<BinaryPolynomial> {
    private coefficients: boolean[];
    private degree: number;

    constructor(coefficients: boolean[]) {
        const normalizedCoefficients = BinaryPolynomial.normalizeCoefficients(coefficients);
        this.coefficients = [ ...normalizedCoefficients ];
        this.degree = normalizedCoefficients.length > 0 ? normalizedCoefficients.length - 1 : 0;
    }

    static polynomialByDegreeFactory = (degree: number): BinaryPolynomial => {
        const coefficients = Array.from(Array(degree + 1)).map(_ => false);
        coefficients[ coefficients.length - 1 ] = true;

        return new BinaryPolynomial(coefficients);
    };

    static normalizeCoefficients(coefficients: boolean[]): boolean[] {
        let endIndex = -1;
        coefficients.forEach((c, index: number) => endIndex = c ? index : endIndex);
        if (endIndex === -1) {
            return [];
        }

        return coefficients.slice(0, endIndex + 1);
    }

    static zeroFactory = (): BinaryPolynomial => {
        return new BinaryPolynomial([]);
    };

    public getCoefficients() {
        return this.coefficients;
    }

    public getDegree() {
        return this.degree;
    }

    public notNull(): boolean {
        return this.degree !== 0 || this.get(0);
    }

    public isEqual(binaryPolinmoal: BinaryPolynomial): boolean {
        if (this.degree !== binaryPolinmoal.degree) {
            return false;
        }
        const hasDifferentCoefficients = this.coefficients
            .some((c: boolean, index: number) => c !== binaryPolinmoal.coefficients[ index ]);

        return !hasDifferentCoefficients;
    }

    public add(binaryPolynomial: BinaryPolynomial): BinaryPolynomial {
        const degree = Math.max(binaryPolynomial.degree, this.degree);
        const coefficients = Array.from(Array(degree + 1)).map((_: any, index: number) => {
            return binaryPolynomial.get(index) !== this.get(index);
        });

        return new BinaryPolynomial(BinaryPolynomial.normalizeCoefficients(coefficients));
    }

    public sub(binaryPolynomial: BinaryPolynomial): BinaryPolynomial {
        return this.add(binaryPolynomial);
    }

    public divide(binaryPolynomial: BinaryPolynomial, module: BinaryPolynomial): BinaryPolynomial {
        return this
            .multiply(binaryPolynomial.getReverseElement(module), module);
    }

    public multiply(binaryPolynomial: BinaryPolynomial, module: BinaryPolynomial): BinaryPolynomial {
        return this
            ._multiply(binaryPolynomial)
            .mod(module);
    }

    public mod(module: BinaryPolynomial): BinaryPolynomial {
        return this._divide(module).residue;
    }

    public getReverseElement(module: BinaryPolynomial): BinaryPolynomial {
        const value = this.mod(module);

        let a = value.mod(module);
        let b = module;

        let q, r, divResult;
        let k = BinaryPolynomial.zeroFactory(),
            r1 = BinaryPolynomial.polynomialByDegreeFactory(0),
            r2 = BinaryPolynomial.zeroFactory();

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

    public _divide(dividerPolynomial: BinaryPolynomial): DivisionResult {
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

    public _multiply(binaryPolynomial: BinaryPolynomial): BinaryPolynomial {
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

    private get(index: number): boolean {
        return Boolean(this.coefficients[ index ]);
    }

    private set(index: number, value: boolean) {
        let coefficients = this.coefficients.length < index + 1
            ? Array.from(Array(index + 1)).map((_, i) => Boolean(this.coefficients[ i ]))
            : this.coefficients;

        coefficients = [
            ...coefficients.slice(0, index),
            value,
            ...coefficients.slice(index + 1),
        ];

        const normalizedCoefficients = BinaryPolynomial.normalizeCoefficients(coefficients);
        this.coefficients = [ ...normalizedCoefficients ];
        this.degree = normalizedCoefficients.length > 0 ? normalizedCoefficients.length - 1 : 0;
    }

    public toString() {
        const filtered = this.getCoefficients().map((c, index) => {
            return c ?
                index === 0 ? '1'
                    : index === 1 ? 'x' : `x^${index}`
                : null;
        }).filter(Boolean);

        if (filtered.length === 0) {
            return '0';
        }

        return filtered.join(' + ');
    }
}
