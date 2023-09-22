import { Join, Tuple } from '../index';

export type Repeat<
  Str extends string,
  Count extends number,
> = Join<Tuple<Count, Str>, ''>

export default function repeat<T extends string, N extends number>(str: T, count: N) {
  return str.repeat(count) as Repeat<T, N>;
}
