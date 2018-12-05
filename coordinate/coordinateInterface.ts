export interface ICoordinate<T> {
    notNull(): boolean;
    isEqual(coordinate: ICoordinate<T>): boolean;
    add(coordinate: ICoordinate<T>, module: ICoordinate<T>): ICoordinate<T>;
    sub(coordinate: ICoordinate<T>, module: ICoordinate<T>): ICoordinate<T>;
    divide(coordinate: ICoordinate<T>, module: ICoordinate<T>): ICoordinate<T>;
    multiply(coordinate: ICoordinate<T>, module: ICoordinate<T>): ICoordinate<T>;
    mod(module: ICoordinate<T>): ICoordinate<T>;
    getReverseElement(module: ICoordinate<T>): ICoordinate<T>;
}
