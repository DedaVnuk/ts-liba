import {
  abs,
  percentageOf,
  getRandomNumber,
} from '../src/index';

test('getRandomNumber', () => {
  const value = getRandomNumber(0, 10);
  expect(value).toBeGreaterThanOrEqual(0);
  expect(value).toBeLessThanOrEqual(10);
})

test('percentageOf', () => {
  const getPercent = percentageOf(500);

  expect(getPercent(50)).toBe(0.1);
  expect(getPercent(10)).toBe(0.02);
  expect(getPercent(500)).toBe(1);
})

test('abs', () => {
  expect(abs(5)).toBe(5);
  expect(abs(-1)).toBe(1);
})