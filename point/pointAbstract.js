export class PointAbstract {
    constructor(x, y, module, isInfinityPoint = false) {
        // @ts-ignore
        this.x = x.mod(module);
        // @ts-ignore
        this.y = y.mod(module);
        this.module = module;
        this.isInfinityPoint = isInfinityPoint;
    }
    isInfinity() {
        return this.isInfinityPoint;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    isEqual(point) {
        return this.x.isEqual(point.x) && this.y.isEqual(point.y);
    }
    isSymmetricAlongYAxis(point) {
        return this.x.isEqual(point.x) && !this.y.isEqual(point.y);
    }
}
