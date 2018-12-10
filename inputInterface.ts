export interface ProgramInput<T extends number[] | string> {
    module: T,
    a: T;
    b: T;
    factor?: string,
    x?: T;
    y?: T;
    x1?: T;
    y1?: T;
    x2?: T;
    y2?: T;
}
