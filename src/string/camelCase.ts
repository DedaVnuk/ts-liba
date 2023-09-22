import { Split, map, split } from '../index';
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
  const words = split(str, delimiter);

  return map(words, (word, i) => {
    if(i === 0) {
      return word;
    }

    return capitalize(word);
  })
  .join('') as CamelCase<Str, Delimiter>
}
