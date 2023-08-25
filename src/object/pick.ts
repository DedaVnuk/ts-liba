export default function pick<Obj extends Record<string, any>, Keys extends (keyof Obj)[]>(obj: Obj, keys: Keys): Pick<Obj, Keys[number]> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, Object.create(null))
}
