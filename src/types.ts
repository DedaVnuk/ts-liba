export type Single = string | number | symbol;

export type ArrayUnion<T = unknown> = T[] | readonly T[];

export type OrNull<T> = T | null;

export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
	? true
	: false;

export type First<Arr extends ArrayUnion> = Arr[0];

export type Last<Arr extends ArrayUnion> = Arr extends readonly [...infer _, infer L] ? L
	: Arr[number];

type NegativeSlice<
	Arr extends ArrayUnion,
	Count extends number,
	ReversedArr extends ArrayUnion = Reverse<Arr>,
	Res extends unknown[] = [],
	AbsCount extends number = Abs<Count>,
> = Res['length'] extends AbsCount ? Reverse<Res>
	: ReversedArr extends [infer Last, ...infer Rest]
		? NegativeSlice<Arr, Count, Rest, [...Res, Last]>
	: never;

type PositiveSlice<
	Arr extends ArrayUnion,
	Count extends number,
	Res extends unknown[] = [],
> = Res['length'] extends Count ? Arr
	: Arr extends readonly [infer First, ...infer Rest] ? PositiveSlice<Rest, Count, [...Res, First]>
	: Arr;

export type Slice<
	Arr extends ArrayUnion,
	Count extends number,
> = IsNegative<Count> extends true ? NegativeSlice<Arr, Count> : PositiveSlice<Arr, Count>;

export type Reverse<
	Arr extends ArrayUnion,
	Res extends unknown[] = [],
> = Arr extends [] ? Res
	: Arr extends readonly [...infer Rest, infer Last]
		? Rest extends unknown[] ? Reverse<Rest, [...Res, Last]>
		: never
	: Arr;

export type Func<Args extends unknown[], Return = void> = (...args: Args) => Return;

type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (
	arg: infer I,
) => 0 ? I
	: never;

type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
	x: infer L,
) => 0 ? L
	: never;

export type UnionToTuple<T, Last = LastInUnion<T>> = [T] extends [never] ? []
	: [...UnionToTuple<Exclude<T, Last>>, Last];

export type Tuple<
	Len extends number,
	T = unknown,
	Res extends unknown[] = [],
> = Res['length'] extends Len ? Res
	: Tuple<Len, T, [...Res, T]>;
export type IsNegative<Num extends number> = `${Num}` extends `-${number}` ? true : false;

export type ToNegative<Num extends number> = `-${Num}` extends `${infer N extends number}` ? N
	: never;

export type Abs<Num extends number> = `${Num}` extends `-${infer N extends number}` ? N : Num;

export type UINT<Num extends number> = IsNegative<Num> extends true ? never : Num;

type PathPrefix<Path extends string> = Path extends '' ? '' : `${Path}.`;

type KeyIsString<Key> = Key extends string ? Key : never;

export type ObjectKeys<
	Obj extends Record<string, unknown>,
	Path extends string = '',
> = keyof {
	[
		Key in keyof Obj as Obj[Key] extends Record<string, unknown> ?
				| ObjectKeys<Obj[Key], `${PathPrefix<Path>}${KeyIsString<Key>}`>
				| `${PathPrefix<Path>}${KeyIsString<Key>}`
			: `${PathPrefix<Path>}${KeyIsString<Key>}`
	]: Obj[Key];
};

export type ObjectValueByKey<
	Obj extends Record<string, unknown>,
	Key extends ObjectKeys<Obj>,
> = Key extends `${string}.${string}`
	? Key extends `${infer First}.${infer Rest}`
		? First extends keyof Obj
			? Obj[First] extends Record<string, unknown> ? ObjectValueByKey<Obj[First], Rest>
			: never
		: never
	: never
	: Key extends keyof Obj ? Obj[Key]
	: never;

export type ObjectEntries<
	Obj extends Record<string, unknown>,
	Keys = UnionToTuple<keyof Obj>,
	Res extends Array<[string, unknown]> = [],
> = Keys extends [] ? Res
	: Keys extends [infer First extends string, ...infer Rest]
		? Rest extends string[] ? ObjectEntries<Obj, Rest, [...Res, [First, Obj[First]]]>
		: never
	: never;

export type ObjectValues<
	Obj extends Record<string, unknown>,
> = ObjectEntries<Obj>[number][1];

export type TrimLeft<Str extends string> = Str extends ` ${infer S}` ? TrimLeft<S>
	: Str;

export type TrimRight<Str extends string> = Str extends `${infer S} ` ? TrimRight<S>
	: Str;

export type Trim<Str extends string> = Str extends ` ${string}` ? Trim<TrimLeft<Str>>
	: Str extends `${string} ` ? Trim<TrimRight<Str>>
	: Str;

export type Split<
	Str extends string,
	Delimiter extends string = ' ',
	Res extends string[] = [],
> = Str extends '' ? Res
	: Str extends `${infer First}${Delimiter}${infer Words}`
		? Split<Words, Delimiter, [...Res, First]>
	: Split<'', Delimiter, [...Res, Str]>;

export type Join<
	Arr extends ArrayUnion,
	Delimiter extends string = ',',
	Res extends string = '',
> = Arr['length'] extends 0 ? Res
	: Arr extends readonly [infer First extends number | string | boolean, ...infer Rest]
		? Rest extends readonly unknown[] ? Res extends '' ? Join<Rest, Delimiter, `${Res}${First}`>
			: Join<Rest, Delimiter, `${Res}${Delimiter}${First}`>
		: never
	: string;

export type PadStart<Str extends string, Pad extends string> = Split<Str, ''>['length'] extends 1
	? `${Pad}${Str}`
	: Str;

export type Replace<
	Str extends string,
	Need extends string,
	Replacer extends string = '',
> = Str extends `${infer Before}${Need}${infer After}` ? `${Before}${Replacer}${After}`
	: Str;

export type ReplaceAll<
	Str extends string,
	Need extends string,
	Replacer extends string = '',
> = Str extends `${infer Before}${Need}${infer After}`
	? [`${Before}${Replacer}${After}`] extends [infer Replaced extends string]
		? ReplaceAll<Replaced, Need, Replacer>
	: never
	: Str;
