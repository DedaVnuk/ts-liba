import { ArrayUnion, reduce } from '../index';

export default function pick<Obj extends Record<string, any>, Keys extends ArrayUnion<keyof Obj>>(obj: Obj, keys: Keys): Pick<Obj, Keys[number]> {
  const fn = (acc: Obj, key: keyof Obj) => {
    acc[key] = obj[key];
    return acc;
  }

  return reduce(keys, Object.create(null), fn);
}
