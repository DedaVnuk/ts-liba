import { Join, Split } from '../index';

export default function snakeCase<
  Str extends string,
  Delimiter extends string = ' '
>(str: Str, delimiter = ' ' as Delimiter) {
  return str
    .split(delimiter)
    .join('_') as Join<Split<Str, Delimiter>, '_'>
}
