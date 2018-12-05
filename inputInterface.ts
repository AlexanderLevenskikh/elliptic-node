export interface ProgramInput {
    characteristic: number,
    generator: number[],
    a: number[] | string;
    b: number[] | string;
    factor?: string,
    x?: number[] | string;
    y?: number[] | string;
    x1?: number[] | string;
    y1?: number[] | string;
    x2?: number[] | string;
    y2?: number[] | string;
}
