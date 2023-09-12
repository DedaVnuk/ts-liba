import { ArrayUnion, Last } from '../index'

export default function last<T extends ArrayUnion<any>>(arr: T): Last<T> {
  return arr[arr.length - 1];
}
