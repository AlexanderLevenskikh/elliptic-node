import { Coordinate } from './coordinate/coordinate';
import { Curve } from './curve/curve';
import { FieldTypeEnum } from './fieldTypeEnum';
import { Point } from './point/point';

const a: Coordinate = new Coordinate('2');
const b: Coordinate = new Coordinate('3');
const module: Coordinate = new Coordinate('97');
const curve = new Curve<Coordinate>(FieldTypeEnum.prime, false, a, b, module);

const x1 = new Coordinate('17');
const y1 = new Coordinate('10');
const pointA = new Point(x1, y1, module);

const x2 = new Coordinate('16');
const y2 = new Coordinate('10');
const pointB = new Point(x2, y2, module);
const pointC = new Point(Coordinate.zeroCoordinateFactory(), Coordinate.zeroCoordinateFactory(), module, true);

console.log(curve.isPointLiesOnCurve(pointA));
console.log(curve.isPointLiesOnCurve(pointC));
