import { ObjectKeys, ObjectValueByKey, Split, Func } from '../index';

/**
 * Obj extends Record<string, any>
 * 
 * @param arr - Obj[]
 * @param key - ObjectKeys<Obj>
 * @param needle - ObjectValueByKey<Obj, Key> | Func<[Obj], boolean>
 * @returns - Obj | undefined
 */
export default function findBy<
  Obj extends Record<string, any>,
  Key extends ObjectKeys<Obj>,
  Keys extends string[] = Split<Key extends string ? Key : never, '.'>,
  Need  extends ObjectValueByKey<Obj, Key> | Func<[Obj], boolean> = ObjectValueByKey<Obj, Key> | Func<[Obj], boolean>,
>(arr: Obj[], key: Key, needle: Need) {
  const keyParts = String(key).split('.') as Keys;

  return arr.find((item) => {
    const res = keyParts.reduce((acc, part) => {
      return acc[part];
    }, item);

    return typeof needle === 'function' ? needle(item) : res === needle as ObjectValueByKey<Obj, Key>;
  });
}
