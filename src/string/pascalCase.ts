import { CamelCase } from './camelCase';
import capitalize from './capitalize';

export default function pascalCase<
  Str extends string,
  Delimiter extends string = ' '
>(str: Str, delimiter = ' ' as Delimiter) {
  return str
    .split(delimiter)
    .map(capitalize)
    .join('') as Capitalize<CamelCase<Str, Delimiter>>
}
