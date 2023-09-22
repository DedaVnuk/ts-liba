import { ArrayUnion, Replace } from '../index'

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
export default function format<
  Temp extends string,
  Parts extends ArrayUnion<string>
>(template: Temp, parts: Parts) {
  return parts.reduce((acc, part, index) => {
    return String(acc).replace(`{$${index + 1}}`, `${part}`)
  }, template) as Format<Temp, Parts>
}
