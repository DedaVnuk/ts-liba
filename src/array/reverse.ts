import { ArrayUnion, Reverse } from '../index';

export default function reverse<Arr extends ArrayUnion<any>>(arr: Arr) {
  const res = [];

  for(let i = arr.length - 1; i >= 0; i--) {
    res.push(arr[i]);
  }

  return res as Reverse<Arr>
}
