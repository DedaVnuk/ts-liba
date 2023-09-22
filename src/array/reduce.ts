import { ArrayUnion, Func } from '../index';

export default function reduce<T, Acc>(arr: ArrayUnion<T>, initialValue: Acc, func: Func<[Acc, T, number], Acc>) {
  let result = initialValue;

  for(let i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result = func(result, arr[i]!, i);
    }
  }

  return result;
}
