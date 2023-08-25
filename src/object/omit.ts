export default function omit<Obj extends Record<string, any>, Keys extends (keyof Obj)[]>(obj: Obj, keys: Keys): Omit<Obj, Keys[number]> {
  const objKeys = Object.keys(obj) as Keys;

  return objKeys.reduce((acc, key) => {
    if(keys.includes(key)) {
      return acc;
    }
    acc[key] = obj[key];
    return acc;
  }, Object.create(null))
}