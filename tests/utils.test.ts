import {
  length,
  curry,
  countdown,
  repeater,
} from '../src/index';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

test('countdown', () => {
  countdown(jest.fn, 3);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

  jest.clearAllTimers();
})

test('repeater', () => {
  const fn = jest.fn();
  repeater(fn, 3);
  expect(fn).toBeCalledTimes(1);


  const successedAfterRepeat = jest.fn((count: number) => {
    if(count === 3) {
      return 'Successed';
    }
  
    throw new Error(`Error with repeat: ${count}`)
  })

  const result = repeater(successedAfterRepeat, 5);
  expect(successedAfterRepeat).toBeCalledTimes(3);
  expect(result).toBe('Successed');

  const failedFn = jest.fn((count: number) => {
    throw new Error(`Error with repeat: ${count}`)
  })

  const failedFnResult = repeater(failedFn, 3);
  expect(failedFn).toBeCalledTimes(3);
  expect(failedFnResult).toBeInstanceOf(Error);
})

test('curry', () => {
  const sum = (a: number, b: number) => a + b;
  const curriedSum = curry(sum);

  expect(sum(4, 5)).toBe(9);

  expect(curriedSum(3, 1)).toBe(4);
  expect(curriedSum(3)(1)).toBe(4);
})

test('length', () => {
  expect(length('hello')).toBe(5);

  expect(length([{ name: 'A' }, { name: 'B' }])).toBe(2);
})