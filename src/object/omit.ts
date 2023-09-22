import { reduce } from '../index';

export default function omit<Obj extends Record<string, any>, Keys extends (keyof Obj)[]>(obj: Obj, keys: Keys): Omit<Obj, Keys[number]> {
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
