export * from './string';
export * from './object';
export * from './array';
export * from './number';

export type Func<Args extends unknown[], Return = void> = (...args: Args) => Return;

type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (
  arg: infer I,
) => 0
  ? I
  : never;

type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
  x: infer L,
) => 0
  ? L
  : never;

export type UnionToTuple<T, Last = LastInUnion<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last];
