import { Abs, IsNegative } from '../index'

type NegativeSlice<
  Arr extends any[],
  Count extends number,
  ReversedArr extends any[] = Reverse<Arr>,
  Res extends any[] = [],
  AbsCount extends number = Abs<Count>
> = Res['length'] extends AbsCount
  ? Reverse<Res>
  : ReversedArr extends [infer Last, ...infer Rest]
    ? NegativeSlice<Arr, Count, Rest, [...Res, Last]>
    : never

type PositiveSlice<
  Arr extends any[],
  Count extends number,
  Res extends any[] = []
> = Res['length'] extends Count
  ? Arr
  : Arr extends [infer First, ...infer Rest]
    ? PositiveSlice<Rest, Count, [...Res, First]>
    : never

export type Slice<
  Arr extends any[],
  Count extends number,
> = IsNegative<Count> extends true ? NegativeSlice<Arr, Count> : PositiveSlice<Arr, Count>;

export type Reverse<
  Arr extends any[],
  Res extends any[] = []
> = Arr extends []
  ? Res
  : Arr extends [...infer Rest, infer Last]
    ? Rest extends any[]
      ? Reverse<Rest, [...Res, Last]>
      : never
    : never
