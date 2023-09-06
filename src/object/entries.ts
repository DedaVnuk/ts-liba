import { ObjectEntries } from '../index';

export default function entries<
  Obj extends Record<string, any>
>(obj: Obj) {
  return Object.entries(obj) as ObjectEntries<Obj>;
}
