export type IsNegative<Num extends number> = `${Num}` extends `-${number}` ? true : false;

export type ToNegative<Num extends number> = `-${Num}` extends `${infer N extends number}` ? N : never;

export type Abs<Num extends number> = `${Num}` extends `-${infer N extends number}` ? N : Num;

export type UINT<Num extends number> = IsNegative<Num> extends true ? never : Num;
