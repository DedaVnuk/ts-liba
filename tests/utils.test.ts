import {
  length,
  curry,
} from '../src/index'

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