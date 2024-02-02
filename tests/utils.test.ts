import {
  length,
  curry,
  countdown,
  repeater,
  getId,
  getUID,
  nthArg,
  always,
  alwaysTrue,
  alwaysFalse,
  alwaysNull,
  flip,
  pick,
} from '../src/index';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

test('flip', () => {
  const fn = (arr: number[], multiplier: number) => arr.map((item) => item * multiplier);
  const flipedFn = flip(fn);

  const arr = [1, 2, 3];
  expect(flipedFn(2, arr)).toEqual([2, 4, 6]);
  expect(flipedFn(3, arr)).toEqual([3, 6, 9]);


  const obj = { name: 'Joe', age: 20, admin: false };
  const pickFn = flip(pick);

  expect(pickFn(['name'], obj)).toEqual({ name: 'Joe' });
  expect(pick(obj, ['name'])).toEqual({ name: 'Joe' });
})

test('always', () => {
  const alwaysFn = always('Hello');
  expect(alwaysFn()).toBe('Hello');
})

test('alwaysTrue', () => {
  const fn = alwaysTrue();
  expect(fn()).toBe(true);
})

test('alwaysFalse', () => {
  const fn = alwaysFalse();
  expect(fn()).toBe(false);
})

test('alwaysNull', () => {
  const fn = alwaysNull();
  expect(fn()).toBe(null);
})


test('nthArg', async () => {
  const arr = ['a', 'b', 'c'];

  const indexes = arr.map(nthArg(1));
  expect(indexes).toEqual([0, 1, 2]);
})

test('getUID', () => {
  expect(getUID()).toHaveLength(10);
  expect(getUID(3)).toHaveLength(3);
  expect(getUID(50)).toHaveLength(50);

  const [uid, uid2] = [getUID(), getUID()];
  expect(uid).not.toEqual(uid2);
})

test('getId', () => {
  const id = getId();

  const idsArr = [id(), id(), id()];
  expect(idsArr).toEqual([1, 2, 3]);

  const userId = getId();
  expect(userId()).toBe(1);
  expect(userId()).toBe(2);
})

test('countdown', () => {
  countdown(jest.fn, 3);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

  jest.clearAllTimers();
})

test('repeater', async () => {
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


  const fetchFn = jest.fn((count: number) => {
    if(count > 2) {
      throw new Error(`Fail`);
    }

    return Promise.resolve('Promise resolved');
  })
  const fetchFnResult = await repeater(fetchFn, 3);
  expect(fetchFn).toBeCalledTimes(2);
  expect(fetchFnResult).toBe('Promise resolved');
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