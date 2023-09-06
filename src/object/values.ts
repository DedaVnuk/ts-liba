import { ObjectKeys, ObjectValueByKey } from '../index';

export default function values<Obj extends Record<string, any>>(obj: Obj) {
  return Object.values(obj) as ObjectValueByKey<Obj, ObjectKeys<Obj>>[];
}
