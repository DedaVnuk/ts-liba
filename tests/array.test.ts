import {
  arraySum,
  findBy,
  map,
  first,
  last,
} from '../src/index';

const arr = [
  { name: 'Joe', age: 20, phone: { home: '1', work: '101' } },
  { name: 'Baz', age: 12, phone: { home: '2', work: '102' } },
  { name: 'Fred', age: 20, phone: { home: '3', work: '103' } },
  { name: 'Bar', age: 32, phone: { home: '4', work: '104' } },
]

test('last', () => {
  expect(last(arr)).toEqual(arr[3]);
  expect(last([1, 2, 3])).toBe(3);
})

test('first', () => {
  expect(first(arr)).toEqual(arr[0]);
  expect(first([1, 2, 3] as const)).toBe(1);
})

test('map', () => {
  const getName = (user: typeof arr[0]) => user.name;
  const getAge = ({ age }: typeof arr[0]) => age;

  expect(map(arr, getName)).toEqual(['Joe', 'Baz', 'Fred', 'Bar']);
  expect(arraySum(map(arr, getAge))).toBe(84);
})

test('findBy', () => {
  expect(findBy(arr, 'name', 'Baz')).toEqual(arr[1]);
  expect(findBy(arr, 'age', 20)).toEqual(arr[0]);
  expect(findBy(arr, 'phone.home', '3')).toEqual(arr[2]);

  expect(findBy(arr, 'age', ({ age }) => age < 18)).toEqual(arr[1]);
  expect(findBy(arr, 'name', ({ name }) => name.startsWith('B'))).toEqual(arr[1]);
})

test('arraySum', () => {
  expect(arraySum([5, 4, 1])).toBe(10);
})
