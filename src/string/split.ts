import { Split } from '../index';

export default function split<
  Str extends string,
  Delimiter extends string = ''
>(str: Str, delimiter: Delimiter = '' as Delimiter) {
  return str.split(delimiter) as Split<Str, Delimiter>;
}
