import { ArrayUnion, reduce } from '../index';

export default function sum(arr: ArrayUnion<number>): number {
  return reduce(arr, 0, (acc, num) => acc + num);
}
