import bigInt from 'big-integer';
import { Coordinate } from '../coordinate';

describe('coordinate tests', () => {
    it('addition', () => {
        const a = new Coordinate('2');
        const b = new Coordinate('21321321321321321331321321');
        const module = new Coordinate('21321321321321321331321324');
        const resultValue = bigInt('21321321321321321331321323');

        expect(a.add(b, module).getValue().eq(resultValue)).toBeTruthy();
    });

    it('subtraction', () => {
        const a = new Coordinate('21321321321321321331321323');
        const b = new Coordinate('2');
        const module = new Coordinate('21321321321321321331321324');

        const subtractionResult = a.sub(b, module).getValue();

        expect(subtractionResult.toString()).toEqual('21321321321321321331321321');
    });

    it('reverse element', () => {
        const a = new Coordinate('5');
        const module = new Coordinate('7');

        const divisionResult = a.getReverseElement(module);

        expect(divisionResult.getValue().toString()).toEqual('3');
    });

    it('reverse negative element', () => {
        const a = new Coordinate('-5');
        const module = new Coordinate('7');

        const result = a.getReverseElement(module);

        expect(result.getValue().toString()).toEqual('4');
    });

    it('division', () => {
        const a = new Coordinate('5');
        const b = new Coordinate('2');
        const module = new Coordinate('7');

        const divisionResult = a.divide(b, module);

        expect(divisionResult.getValue().toString()).toEqual('6');
    });

    it('module: positive value', () => {
        const a = new Coordinate('12');
        const module = new Coordinate('7');

        const result = a.mod(module);

        expect(result.getValue().toString()).toEqual('5');
    });

    it('module: negative value', () => {
        const a = new Coordinate('-15');
        const module = new Coordinate('7');

        const result = a.mod(module);

        expect(result.getValue().toString()).toEqual('6');
    });

    it('module: zero result', () => {
        const a = new Coordinate('14');
        const module = new Coordinate('7');

        const result = a.mod(module);

        expect(result.getValue().toString()).toEqual('0');
    });

    it('multiplication', () => {
        const a = new Coordinate('10');
        const b = new Coordinate('-2');
        const module = new Coordinate('9');

        const multiplicationResult = a.multiply(b, module).getValue();

        expect(multiplicationResult.toString()).toEqual('7');
    });
});
