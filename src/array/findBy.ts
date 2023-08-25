import { ObjectKeys, ObjectValueByKey, Split } from '../index';

export default function findBy<
  Obj extends Record<string, any>,
  Key extends ObjectKeys<Obj>,
  Keys extends string[] = Split<Key extends string ? Key : never, '.'>
>(arr: Obj[], key: Key, needle: ObjectValueByKey<Obj, Key>) {
  const keyParts = String(key).split('.') as Keys;

  return arr.find((item) => {
    return keyParts.reduce((acc, part) => {
      return acc[part];
    }, item) === needle;
  });
}
