import { Abs, IsNegative } from '../index'

export type ArrayUnion<T> = T[] | readonly T[];

export type First<Arr extends ArrayUnion<any>> = Arr[0];

export type Last<Arr extends ArrayUnion<any>> = Arr extends readonly [...infer _, infer L]
  ? L
  : Arr[number]

type NegativeSlice<
  Arr extends ArrayUnion<any>,
  Count extends number,
  ReversedArr extends ArrayUnion<any> = Reverse<Arr>,
  Res extends any[] = [],
  AbsCount extends number = Abs<Count>
> = Res['length'] extends AbsCount
  ? Reverse<Res>
  : ReversedArr extends [infer Last, ...infer Rest]
    ? NegativeSlice<Arr, Count, Rest, [...Res, Last]>
    : never

type PositiveSlice<
  Arr extends ArrayUnion<any>,
  Count extends number,
  Res extends any[] = []
> = Res['length'] extends Count
  ? Arr
  : Arr extends readonly [infer First, ...infer Rest]
    ? PositiveSlice<Rest, Count, [...Res, First]>
    : Arr

export type Slice<
  Arr extends ArrayUnion<any>,
  Count extends number,
> = IsNegative<Count> extends true ? NegativeSlice<Arr, Count> : PositiveSlice<Arr, Count>;

export type Reverse<
  Arr extends ArrayUnion<any>,
  Res extends any[] = []
> = Arr extends []
  ? Res
  : Arr extends readonly [...infer Rest, infer Last]
    ? Rest extends any[]
      ? Reverse<Rest, [...Res, Last]>
      : never
    : Arr

