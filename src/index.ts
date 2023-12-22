export type ArrayUnion<T> = T[] | readonly T[];

export type First<Arr extends ArrayUnion<any>> = Arr[0];

export type Last<Arr extends ArrayUnion<any>> = Arr extends readonly [...infer _, infer L]
  ? L
  : Arr[number]

type NegativeSlice<
  Arr extends ArrayUnion<any>,
  Count extends number,
  ReversedArr extends ArrayUnion<any> = Reverse<Arr>,
  Res extends any[] = [],
  AbsCount extends number = Abs<Count>
> = Res['length'] extends AbsCount
  ? Reverse<Res>
  : ReversedArr extends [infer Last, ...infer Rest]
    ? NegativeSlice<Arr, Count, Rest, [...Res, Last]>
    : never

type PositiveSlice<
  Arr extends ArrayUnion<any>,
  Count extends number,
  Res extends any[] = []
> = Res['length'] extends Count
  ? Arr
  : Arr extends readonly [infer First, ...infer Rest]
    ? PositiveSlice<Rest, Count, [...Res, First]>
    : Arr

export type Slice<
  Arr extends ArrayUnion<any>,
  Count extends number,
> = IsNegative<Count> extends true ? NegativeSlice<Arr, Count> : PositiveSlice<Arr, Count>;

export type Reverse<
  Arr extends ArrayUnion<any>,
  Res extends any[] = []
> = Arr extends []
  ? Res
  : Arr extends readonly [...infer Rest, infer Last]
    ? Rest extends any[]
      ? Reverse<Rest, [...Res, Last]>
      : never
    : Arr

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

export type Tuple<
  Len extends number,
  T = unknown,
  Res extends any[] = []
> = Res['length'] extends Len
  ? Res
  : Tuple<Len, T, [...Res, T]>
export type IsNegative<Num extends number> = `${Num}` extends `-${number}` ? true : false;

export type ToNegative<Num extends number> = `-${Num}` extends `${infer N extends number}` ? N : never;

export type Abs<Num extends number> = `${Num}` extends `-${infer N extends number}` ? N : Num;

export type UINT<Num extends number> = IsNegative<Num> extends true ? never : Num;

type PathPrefix<Path extends string> = Path extends '' ? '' : `${Path}.`;

type KeyIsString<Key> = Key extends string ? Key : never

export type ObjectKeys<
  Obj extends Record<string, any>,
  Path extends string = ''
> = keyof {
  [Key in keyof Obj as Obj[Key] extends Record<string, any>
    ? ObjectKeys<Obj[Key], `${PathPrefix<Path>}${KeyIsString<Key>}`> | `${PathPrefix<Path>}${KeyIsString<Key>}`
    : `${PathPrefix<Path>}${KeyIsString<Key>}`
  ]
    : Obj[Key] 
}

export type ObjectValueByKey<
  Obj extends Record<string, any>,
  Key extends ObjectKeys<Obj>
> = Key extends `${string}.${string}`
  ? Key extends `${infer First}.${infer Rest}`
    ? First extends keyof Obj
      ? ObjectValueByKey<Obj[First], Rest>
      : never
    : never
  : Key extends keyof Obj
    ? Obj[Key]
    : never

export type ObjectEntries<
  Obj extends Record<string, any>,
  Keys = UnionToTuple<keyof Obj>,
  Res extends Array<[string, any]> = []
> = Keys extends []
  ? Res
  : Keys extends [infer First extends string, ...infer Rest]
    ? Rest extends string[]
      ? ObjectEntries<Obj, Rest, [...Res, [First, Obj[First]]]>
      : never
    : never

export type TrimLeft<Str extends string> = Str extends ` ${infer S}`
  ? TrimLeft<S>
  : Str

export type TrimRight<Str extends string> = Str extends `${infer S} `
  ? TrimRight<S>
  : Str

export type Trim<Str extends string> = Str extends ` ${string}`
  ? Trim<TrimLeft<Str>>
  : Str extends `${string} `
    ? Trim<TrimRight<Str>>
    : Str

export type Split<
  Str extends string,
  Delimiter extends string = ' ',
  Res extends string[] = []
> = Str extends ''
  ? Res
  : Str extends `${infer First}${Delimiter}${infer Words}`
    ? Split<Words, Delimiter, [...Res, First]>
    : Split<'', Delimiter, [...Res, Str]>

export type Join<
  Arr extends ArrayUnion<any>,
  Delimiter extends string = ',',
  Res extends string = ''
> = Arr['length'] extends 0
  ? Res
  : Arr extends readonly [infer First extends number | string | boolean, ...infer Rest]
    ? Rest extends readonly any[]
      ? Res extends ''
        ? Join<Rest, Delimiter, `${Res}${First}`>
        : Join<Rest, Delimiter, `${Res}${Delimiter}${First}`>
      : never
    : string

export type Replace<
  Str extends string,
  Need extends string,
  Replacer extends string = '',
> = Str extends `${infer Before}${Need}${infer After}`
  ? `${Before}${Replacer}${After}`
  : Str



type AnimateProps = {
  draw: Func<[number]>;
  timeFunc?: Func<[number], number>;
  duration?: number;
}

export function animate({ draw, timeFunc = (time) => time, duration = 1000 }: AnimateProps) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    let timeFraction = (time - start) / duration;
    if(timeFraction > 1) {
      timeFraction = 1;
    };

    let progress = timeFunc(timeFraction);

    draw(progress);

    if(timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

export function countdown(func: Func<[number]>, seconds: number, step = 1000) {
  let time = setTimeout(() => {
    countdown(func, seconds - 1);
  }, step)

  if(seconds < 0) {
    return clearInterval(time);
  }

  func(seconds);
}


type PartialExceptFirst<Args extends any[]> = Args extends [infer First, ...infer Rest]
  ? [Required<First>, ...Partial<Rest>]
  : []

type GetArgs<
  FnArgs extends any[],
  Params extends any[],
> = PartialExceptFirst<Params extends [] ? FnArgs : Slice<FnArgs, Params['length']>>

export type Curry<
  Fn extends Func<any[], any>,
  Params extends any[] = []
> = Fn extends (...args: infer FnParams) => infer FnReturn
  ? FnParams['length'] extends Params['length']
    ? FnReturn
    : <Args extends GetArgs<Parameters<Fn>, Params>>
      (...args: Args) => Args['length'] extends Parameters<Fn>['length']
        ? ReturnType<Fn>
        :
        <Args2 extends GetArgs<Parameters<Fn>, [...Args, ...Params]>>
          (...args2: Args2) => Curry<Fn, [...Params, ...Args, ...Args2]>
  : never

export function curry<
  Fn extends Func<any[], any>,
>(func: Fn) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return (...args2) => curried(...[...args, ...args2]);
    }
  } as Curry<Fn>
}


export type DeferCallback<T> = Func<[number], T>

export function defer<T>(func: DeferCallback<T>, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(func(ms)), ms));
}
type LengthArg = { length: number };

export function length<T extends LengthArg>(value: T): T['length'] {
  return value.length;
}


export function repeater<T>(fn: Func<[number], T>, attempts: number): T {
  for (let i = 1; i < attempts; i++) {
    try {
      return fn(i);
    } catch (error) {
      console.error(error);
    }
  }

  throw new Error(`Function failed after ${attempts} attempts`);
}



/**
 * Obj extends Record<string, any>
 * 
 * @param arr - Obj[]
 * @param key - ObjectKeys<Obj>
 * @param needle - ObjectValueByKey<Obj, Key> | Func<[Obj], boolean>
 * @returns - Obj | undefined
 */
export function findBy<
  Obj extends Record<string, any>,
  Key extends ObjectKeys<Obj>,
  Keys extends string[] = Split<Key extends string ? Key : never, '.'>,
  Need  extends ObjectValueByKey<Obj, Key> | Func<[Obj], boolean> = ObjectValueByKey<Obj, Key> | Func<[Obj], boolean>,
>(arr: ArrayUnion<Obj>, key: Key, needle: Need) {
  const keyParts = String(key).split('.') as Keys;

  return arr.find((item) => {
    const res: any = reduce(keyParts, item, (acc, part) => acc[part]);
    return typeof needle === 'function' ? needle(item) : res === needle;
  });
}


export function first<T extends ArrayUnion<any>>(arr: T): First<T> {
  return arr[0];
}


export function join<
  Arr extends ArrayUnion<any>,
  Sep extends string = ''
>(arr: Arr, separator: Sep = '' as Sep) {
  return arr.join(separator) as Join<Arr, Sep>;
}


export function last<T extends ArrayUnion<any>>(arr: T): Last<T> {
  return arr[arr.length - 1];
}



export function map<T, R>(arr: ArrayUnion<T>, func: Func<[T, number], R>): R[] {
  return reduce<T, R[]>(arr, [], (acc, item, index) => {
    acc.push(func(item, index));
    return acc;
  });
}


export function reduce<T, Acc>(arr: ArrayUnion<T>, initialValue: Acc, func: Func<[Acc, T, number], Acc>) {
  let result = initialValue;

  for(let i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result = func(result, arr[i]!, i);
    }
  }

  return result;
}


export function reverse<T extends unknown, Arr extends ArrayUnion<T>>(arr: Arr) {
  const res: T[] = [];

  for(let i = arr.length - 1; i >= 0; i--) {
    res.push(arr[i] as T);
  }

  return res as Reverse<Arr>
}



export function sum(arr: ArrayUnion<number>): number {
  return reduce(arr, 0, (acc, num) => acc + num);
}


export function abs<T extends number>(num: T) {
  return Math.abs(num) as Abs<T>;
}


export function percentageOf<T extends number>(total: UINT<T>) {
  return <V extends number>(value: UINT<V>) => value / total;
}


export function entries<
  Obj extends Record<string, any>
>(obj: Obj) {
  return Object.entries(obj) as ObjectEntries<Obj>;
}
export function keys<Obj extends Record<string, any>>(obj: Obj) {
  return Object.keys(obj) as (keyof Obj)[];
}


export function omit<Obj extends Record<string, any>, Keys extends (keyof Obj)[]>(obj: Obj, keys: Keys): Omit<Obj, Keys[number]> {
  const objKeys = Object.keys(obj) as Keys;

  const fn = (acc: Obj, key: keyof Obj) => {
    if(keys.includes(key)) {
      return acc;
    }
    acc[key] = obj[key];
    return acc;
  }

  return reduce(objKeys, Object.create(null), fn);
}



export function pick<Obj extends Record<string, any>, Keys extends ArrayUnion<keyof Obj>>(obj: Obj, keys: Keys): Pick<Obj, Keys[number]> {
  const fn = (acc: Obj, key: keyof Obj) => {
    acc[key] = obj[key];
    return acc;
  }

  return reduce(keys, Object.create(null), fn);
}


export function values<Obj extends Record<string, any>>(obj: Obj) {
  return Object.values(obj) as ObjectValueByKey<Obj, ObjectKeys<Obj>>[];
}




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

export function camelCase<
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


export function capitalize<Str extends string>(str: Str) {
  return `${uppercase(str.substring(0, 1))}${str.substring(1)}` as Capitalize<Str>;
}


export type Format<
  Temp extends string,
  Parts extends ArrayUnion<string>,
> = Parts extends []
  ? Temp
  : Parts extends readonly [...infer Rest, infer Last extends string]
    ? Rest extends string[]
      ? Format<
          Replace<Temp, `{$${Parts['length']}}`, Last>,
          Rest
        >
      : never
    : string

/**
 * 
 * @param template - exapmle: '{$1}-{$2}-{$3}'
 * @param parts - example: [year, month, day]
 * @returns - example: 'year-month-day'
 */
export function format<
  Temp extends string,
  Parts extends ArrayUnion<string>
>(template: Temp, parts: Parts) {
  return parts.reduce((acc, part, index) => {
    return String(acc).replace(`{$${index + 1}}`, `${part}`)
  }, template) as Format<Temp, Parts>
}
export function lowercase<Str extends string>(str: Str) {
  return str.toLocaleLowerCase() as Lowercase<Str>;
}



export function pascalCase<
  Str extends string,
  Delimiter extends string = ' '
>(str: Str, delimiter = ' ' as Delimiter) {
  return str
    .split(delimiter)
    .map(capitalize)
    .join('') as Capitalize<CamelCase<Str, Delimiter>>
}


export type Repeat<
  Str extends string,
  Count extends number,
> = Join<Tuple<Count, Str>, ''>

export function repeat<T extends string, N extends number>(str: T, count: N) {
  return str.repeat(count) as Repeat<T, N>;
}


export function snakeCase<
  Str extends string,
  Delimiter extends string = ' '
>(str: Str, delimiter = ' ' as Delimiter) {
  return str
    .split(delimiter)
    .join('_') as Join<Split<Str, Delimiter>, '_'>
}


export function split<
  Str extends string,
  Delimiter extends string = ''
>(str: Str, delimiter: Delimiter = '' as Delimiter) {
  return str.split(delimiter) as Split<Str, Delimiter>;
}


export function uncapitalize<Str extends string>(str: Str) {
  return `${lowercase(str.substring(0, 1))}${str.substring(1)}` as Uncapitalize<Str>
}
export function uppercase<Str extends string>(str: Str) {
  return str.toLocaleUpperCase() as Uppercase<Str>;
}

