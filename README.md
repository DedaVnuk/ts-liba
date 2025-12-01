
# Documentation

# translate

```
default Dictionary(ISO 9):
{
	'а': 'a',
	'б': 'b',
	'в': 'v',
	'г': 'g',
	'д': 'd',
	'е': 'e',
	'ё': 'e',
	'ж': 'zh',
	'з': 'z',
	'и': 'i',
	'й': 'i',
	'к': 'k',
	'л': 'l',
	'м': 'm',
	'н': 'n',
	'о': 'o',
	'п': 'p',
	'р': 'r',
	'с': 's',
	'т': 't',
	'у': 'y',
	'ф': 'f',
	'х': 'kh',
	'ц': 'ts',
	'ч': 'ch',
	'ш': 'sh',
	'щ': 'shch',
	'ъ': '"',
	'ы': 'u',
	'ь': '\'',
	'э': 'e',
	'ю': 'yu',
	'я': 'ya',
	' ': '_',
}

type Dictionary = Record<string, string>;

type ConstructorProps = {
  dictionary?: Dictionary; 
  specialSymbolsProps?: {
    replace?: boolean;
    replacer?: string;
  }
}

class Translate

constructor(props?: ConstructorProps)

setDictionary(dictionary: Dictionary): Translate

getDictionary(): Dictionary

resetDictionary(): Translate

toggleSpecialReplace(): Translate

chars(str: string): string

word(word: string): string
```


# utils

### debounce
```
debounce<Fn extends Func<any[], any>>(func: Fn, delay: number): Func<Parameters<Fn>, Promise<ReturnType<Fn>>> 
```

### includes
```
includes<
	D extends string | ArrayUnion
>(data: D, needle: (D extends string ? Split<D, ''> : D)[number], fromIndex = 0): boolean
```

### indexOf
```
indexOf<
	D extends string | ArrayUnion
>(data: D, needle: (D extends string ? Split<D, ''> : D)[number], fromIndex = 0): number
```

### toString
```
toString<T>(value: T): string
```

### toNumber
```
toNumber<T>(value: T): number
```

### ifTrue
```
ifTrue<Fn extends Func<any[]>>(condition: boolean, fn: Fn): ReturnType<Fn> | void
```

### ifFalse
```
ifFalse<Fn extends Func<any[]>>(condition: boolean, fn: Fn): ReturnType<Fn> | void
```

### isEqual
```
isEqual<A, B>(a: A, b: B): boolean
```

### isNull
```
isNull<T>(value: T): boolean
```

### isUndefined
```
isUndefined<T>(value: T): boolean
```

### flip
```
flip<Args extends any[], Return>(fn: Func<Args, Return>): Func<Reverse<Args>, Return>
```

### always
```
always<T>(value: T): Func<[], T>
```

### alwaysTrue
```
alwaysTrue(): Func<[], true>
```

### alwaysFalse
```
alwaysFalse(): Func<[], false>
```

### alwaysNull
```
alwaysNull(): Func<[], null>
```


### nthArg
```
nthArg<N extends number>(num: N): Func<Args, Args[N]>
```

### getId
```
getId(): Func<[], number>
```

### getUID
```
getUID(len = 10): string
```

### animate
```
type AnimateProps = {
	draw: Func<[number]>;
	timeFunc?: Func<[number], number>;
	duration?: number;
};

animate({ draw, timeFunc = (time) => time, duration = 1000 }: AnimateProps): void
```

### countdown
```
countdown(func: Func<[number]>, count: number, step = 1000): void
```

### curry
```
curry<Fn extends Func<any[], any>>(func: Fn): Curry<Fn>
```

### defer
```
defer<T>(func: DeferCallback<T>, ms: number): Promise<T>
```

### length
```
length<T extends LengthArg>(value: T): T['length']
```

### repeater
```
repeater<T>(fn: Func<[number], T>, attempts: number): T | Error
```

---
# array

### chunk
```
chunk<T, Num extends number>(arr: T[], count: UINT<Num>): Array<T[]>
```

### filter
```
filter<T>(arr: ArrayUnion<T>, func: Func<[T], boolean>): T[]
```

### numberRange
```
numberRange(from: number, to: number): number[]
```

### findBy
```
findBy<
	Obj extends Record<string, any>,
	Key extends ObjectKeys<Obj>,
	Keys extends string[] = Split<Key extends string ? Key : never, '.'>,
	Need extends ObjectValueByKey<Obj, Key> | Func<[Obj], boolean> =
		| ObjectValueByKey<Obj, Key>
		| Func<[Obj], boolean>,
>(arr: ArrayUnion<Obj>, key: Key, needle: Need): Obj | undefined
```

### first
```
first<T extends ArrayUnion<any>>(arr: T): First<T>
```

### join
```
join<
	Arr extends ArrayUnion<any>,
	Sep extends string = '',
>(arr: Arr, separator: Sep = '' as Sep): Join<Arr, Sep>
```

### last
```
last<T extends ArrayUnion<any>>(arr: T): Last<T>
```

### map
```
map<T, R>(arr: ArrayUnion<T>, func: Func<[T, number], R>): R[]
```

### reduce
```
reduce<T, Acc>(
	arr: ArrayUnion<T>,
	initialValue: Acc,
	func: Func<[Acc, T, number], Acc>,
): Acc
```

### reverse
```
reverse<T extends unknown, Arr extends ArrayUnion<T>>(arr: Arr): Reverse<Arr>
```

### sum
```
sum(arr: ArrayUnion<number>): number
```

---
# number

### twoDigits
```
twoDigits<T extends number>(num: T): PadStart<T, '0'>
```

### getRandomNumber
```
getRandomNumber(min = 0, max = 1, decimals = 2): number
```

### abs
```
abs<T extends number>(num: T): Abs<T>
```

### percentageOf
```
percentageOf<T extends number>(total: UINT<T>): Func<[UINT<number>], number>
```

---
# object

### isObject
```
isObject(value: unknown): value is Record<string, unknown>
```

### entries
```
entries<Obj extends Record<string, any>>(obj: Obj): ObjectEntries<Obj>
```

### keys
```
keys<Obj extends Record<string, any>>(obj: Obj): (keyof Obj)[]
```

### omit
```
omit<Obj extends Record<string, any>, Keys extends (keyof Obj)[]>(
	obj: Obj,
	keys: Keys,
): Omit<Obj, Keys[number]>
```

### pick
```
pick<Obj extends Record<string, any>, Keys extends ArrayUnion<keyof Obj>>(
	obj: Obj,
	keys: Keys,
): Pick<Obj, Keys[number]>
```

### values
```
values<Obj extends Record<string, any>>(obj: Obj): ObjectValues<Obj>[]
```

# string

### trim
```
trim<Str extends string>(str: Str): Trim<Str>
```

### trimRight
```
trimRight<Str extends string>(str: Str): TrimRight<Str>
```

### trimLeft
```
trimLeft<Str extends string>(str: Str): TrimLeft<Str>
```

### replace
```
replace<
	Str extends string,
	P extends string,
	R extends string
>(str: Str, pattern: P, replacement: R): Replace<Str, P, R> {
```

### replaceAll
```
replaceAll<
	Str extends string,
	P extends string,
	R extends string
>(str: Str, pattern: P, replacement: R): ReplaceAll<Str, P, R> {
```

### substring
```
substring<T extends string>(str: T, start: number, end = str.length): string
```

### camelCase
```
camelCase<
	Str extends string,
	Delimiter extends string = ' ',
>(str: Str, delimiter = ' ' as Delimiter): CamelCase<Str, Delimiter>
```

### capitalize
```
capitalize<Str extends string>(str: Str): Capitalize<Str>
```

### format
```
/**
 * @param template - exapmle: '{$1}-{$2}-{$3}'
 * @param parts - example: [year, month, day]
 * @returns - example: 'year-month-day'
 */
format<
	Temp extends string,
	Parts extends ArrayUnion<string>,
>(template: Temp, parts: Parts): string
```

### lowercase
```
lowercase<Str extends string>(str: Str): Lowercase<Str>
```

### pascalCase
```
pascalCase<
	Str extends string,
	Delimiter extends string = ' ',
>(str: Str, delimiter = ' ' as Delimiter): Capitalize<CamelCase<Str, Delimiter>
```

### repeat
```
repeat<T extends string, N extends number>(str: T, count: N): Repeat<T, N>
```

### snakeCase
```
snakeCase<
	Str extends string,
	Delimiter extends string = ' ',
>(str: Str, delimiter = ' ' as Delimiter): string
```

### split
```
split<
	Str extends string,
	Delimiter extends string = '',
>(str: Str, delimiter: Delimiter = '' as Delimiter): Split<Str, Delimiter>
```

### uncapitalize
```
uncapitalize<Str extends string>(str: Str): Uncapitalize<Str>
```

### uppercase
```
uppercase<Str extends string>(str: Str)
```
---
# date

### yearDayNumber
```
yearDayNumber(now = new Date()): number
```
