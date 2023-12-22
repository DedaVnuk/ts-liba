import {
  yearDayNumber,
} from '../src/index';

test('yearDayNumber', () => {
  expect(yearDayNumber(new Date('2023-01-01'))).toBe(1);
  expect(yearDayNumber(new Date('2023-01-30'))).toBe(30);
})
