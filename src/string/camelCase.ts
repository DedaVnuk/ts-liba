import { Split } from '../index';
import capitalize from './capitalize';

export type CamelCase<
  Str extends string,
  Delimiter extends string = ' ',
  Words extends string[] = Split<Str, Delimiter>,
  Res extends string = ''
> = Words extends [] 
  ? Res
  : Words extends [infer First extends string, ...infer Rest]
    ? Rest extends string[]
      ? Res extends ''
        ? CamelCase<Str, Delimiter, Rest, `${Res}${First}`>
        : CamelCase<Str, Delimiter, Rest, `${Res}${Capitalize<First>}`>
      : never
    : never

export default function camelCase<
  Str extends string,
  Delimiter extends string = ' '
>(str: Str, delimiter = ' ' as Delimiter) {
  return str
    .split(delimiter)
    .map((word, i) => {
      if(i === 0) {
        return word;
      }

      return capitalize(word);
    })
    .join('') as CamelCase<Str, Delimiter>
}
