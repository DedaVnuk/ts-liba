export default function keys<Obj extends Record<string, any>>(obj: Obj) {
  return Object.keys(obj) as (keyof Obj)[];
}
