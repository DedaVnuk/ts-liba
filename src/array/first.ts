import { ArrayUnion, First } from '../index';

export default function first<T extends ArrayUnion<any>>(arr: T): First<T> {
  return arr[0];
}
