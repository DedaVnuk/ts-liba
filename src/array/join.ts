import { ArrayUnion, Join } from '../index';

export default function join<
  Arr extends ArrayUnion<any>,
  Sep extends string = ''
>(arr: Arr, separator: Sep = '' as Sep) {
  return arr.join(separator) as Join<Arr, Sep>;
}
