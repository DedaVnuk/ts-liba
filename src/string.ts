// dprint-ignore
import { join, map, reduce } from './array';
// dprint-ignore
import { ArrayUnion, Join, Replace, ReplaceAll, Split, Trim, TrimLeft, TrimRight, Tuple } from './types';

// #string

export function trim<Str extends string>(str: Str) {
	return str.trim() as Trim<Str>;
}

export function trimRight<Str extends string>(str: Str) {
	return str.trimEnd() as TrimRight<Str>;
}

export function trimLeft<Str extends string>(str: Str) {
	return str.trimStart() as TrimLeft<Str>;
}

export function replace<
	Str extends string,
	P extends string,
	R extends string,
>(str: Str, pattern: P, replacement: R) {
	return str.replace(pattern, replacement) as Replace<Str, P, R>;
}

export function replaceAll<
	Str extends string,
	P extends string,
	R extends string,
>(str: Str, pattern: P, replacement: R) {
	const chars = reduce(split(str), [] as string[], (acc, char) => {
		acc.push(pattern === char ? replacement : char);
		return acc;
	});

	return join(chars) as ReplaceAll<Str, P, R>;
}

export function substring<T extends string>(str: T, start: number, end = str.length) {
	return start >= 0 ? str.substring(start, end) : str.substring(end + start);
}

export type CamelCase<
	Str extends string,
	Delimiter extends string = ' ',
	Words extends string[] = Split<Str, Delimiter>,
	Res extends string = '',
> = Words extends [] ? Res
	: Words extends [infer First extends string, ...infer Rest]
		? Rest extends string[] ? Res extends '' ? CamelCase<Str, Delimiter, Rest, `${Res}${First}`>
			: CamelCase<Str, Delimiter, Rest, `${Res}${Capitalize<First>}`>
		: never
	: never;

export function camelCase<
	Str extends string,
	Delimiter extends string = ' ',
>(str: Str, delimiter = ' ' as Delimiter) {
	const words = split(str, delimiter);

	return map(words, (word, i) => i === 0 ? word : capitalize(word))
		.join('') as CamelCase<Str, Delimiter>;
}

export function capitalize<Str extends string>(str: Str) {
	return `${uppercase(substring(str, 0, 1))}${substring(str, 1)}` as Capitalize<Str>;
}

export type Format<
	Temp extends string,
	Parts extends ArrayUnion<string>,
> = Parts extends [] ? Temp
	: Parts extends readonly [...infer Rest, infer Last extends string]
		? Rest extends string[] ? Format<
				Replace<Temp, `{$${Parts['length']}}`, Last>,
				Rest
			>
		: never
	: string;

/**
 * @param template - exapmle: '{$1}-{$2}-{$3}'
 * @param parts - example: [year, month, day]
 * @returns - example: 'year-month-day'
 */
export function format<
	Temp extends string,
	Parts extends ArrayUnion<string>,
>(template: Temp, parts: Parts): Format<Temp, Parts> {
	return parts.reduce((acc, part, index) => {
		return String(acc).replace(`{$${index + 1}}`, `${part}`);
	}, template) as Format<Temp, Parts>;
}

export function lowercase<Str extends string>(str: Str) {
	return str.toLocaleLowerCase() as Lowercase<Str>;
}

export function pascalCase<
	Str extends string,
	Delimiter extends string = ' ',
>(str: Str, delimiter = ' ' as Delimiter) {
	const splited = split(str, delimiter);
	const mapped = map(splited, capitalize);

	return join(mapped, '') as Capitalize<CamelCase<Str, Delimiter>>;
}

export type Repeat<
	Str extends string,
	Count extends number,
> = Join<Tuple<Count, Str>, ''>;

export function repeat<T extends string, N extends number>(str: T, count: N) {
	return str.repeat(count) as Repeat<T, N>;
}

export function snakeCase<
	Str extends string,
	Delimiter extends string = ' ',
>(str: Str, delimiter = ' ' as Delimiter): Join<Split<Str, Delimiter>, '_'> {
	const splited = split(str, delimiter);
	return join(splited, '_');
}

export function split<
	Str extends string,
	Delimiter extends string = '',
>(str: Str, delimiter: Delimiter = '' as Delimiter) {
	return str.split(delimiter) as Split<Str, Delimiter>;
}

export function uncapitalize<Str extends string>(str: Str) {
	return `${lowercase(str.substring(0, 1))}${str.substring(1)}` as Uncapitalize<Str>;
}
export function uppercase<Str extends string>(str: Str) {
	return str.toLocaleUpperCase() as Uppercase<Str>;
}
