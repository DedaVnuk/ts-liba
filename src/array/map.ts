import { Func } from '../index'

export default function map<T, R>(arr: T[], func: Func<[T], R>): R[] {
  return arr.reduce<R[]>((acc, item) => {
    acc.push(func(item))
    return acc;
  }, [])
}