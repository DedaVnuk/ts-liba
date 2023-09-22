import { Func, ArrayUnion, reduce } from '../index'

export default function map<T, R>(arr: ArrayUnion<T>, func: Func<[T, number], R>): R[] {
  return reduce<T, R[]>(arr, [], (acc, item, index) => {
    acc.push(func(item, index));
    return acc;
  });
}
