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
  Arr extends string[],
  Delimiter extends string = ',',
  Res extends string = ''
> = Arr extends []
  ? Res
  : Arr extends [infer First extends string, ...infer Rest]
    ? Rest extends string[]
      ? Res extends ''
        ? Join<Rest, Delimiter, `${Res}${First}`>
        : Join<Rest, Delimiter, `${Res}${Delimiter}${First}`>
      : never
    : never