import { arraySum, findBy } from '../src/index';

const arr = [
  { name: 'Joe', age: 20, phone: { home: '1', work: '101' } },
  { name: 'Baz', age: 12, phone: { home: '2', work: '102' } },
  { name: 'Fred', age: 20, phone: { home: '3', work: '103' } },
  { name: 'Bar', age: 32, phone: { home: '4', work: '104' } },
]

test('findBy', () => {
  expect(findBy(arr, 'name', 'Baz')).toEqual(arr[1]);
  expect(findBy(arr, 'age', 20)).toEqual(arr[0]);
  expect(findBy(arr, 'phone.home', '3')).toEqual(arr[2]);
})

test('arraySum', () => {
  expect(arraySum([5, 4, 1])).toBe(10);
})
