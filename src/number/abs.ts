import { Abs } from '../index';

export default function abs<T extends number>(num: T) {
  return Math.abs(num) as Abs<T>;
}
