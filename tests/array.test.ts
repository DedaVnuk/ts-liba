import {
  sum,
  findBy,
  map,
  first,
  last,
  reverse,
  reduce,
  join,
  numberRange,
} from '../src/index';

test('numberRange', () => {
  const arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ];
  expect(numberRange(0, 20)).toEqual(arr);

  const arr2 = [-3, -2, -1, 0, 1, 2, 3];
  expect(numberRange(-3, 3)).toEqual(arr2);

  expect(numberRange(8, 3)).toEqual([]);
})

const arr = [
  { name: 'Joe', age: 20, phone: { home: '1', work: '101' } },
  { name: 'Baz', age: 12, phone: { home: '2', work: '102' } },
  { name: 'Fred', age: 20, phone: { home: '3', work: '103' } },
  { name: 'Bar', age: 32, phone: { home: '4', work: '104' } },
] as const;

test('join', () => {
  expect(join([1, 2, 3])).toBe('123');
  expect(join([])).toBe('');
  expect(join(['Welcome', 'to', 'home'], '__')).toBe('Welcome__to__home');
})

test('reduce', () => {
  expect(reduce(arr, [], (acc: string[], item) => {
    acc.push(item.name)
    return acc;
  })).toEqual(['Joe', 'Baz', 'Fred', 'Bar'])

  expect(reduce(arr, [], (acc: string[], item) => {
    if(item.name.startsWith('B')) {
      acc.push(item.name)
    }
    return acc;
  })).toEqual(['Baz', 'Bar'])

  expect(reduce([], 0, (acc, item) => acc + item)).toBe(0);
  expect(reduce([1, 2, 3], 5, (acc, item) => acc + item)).toBe(11);
})

test('reverse', () => {
  expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  expect(reverse([{ name: 'Joe' }, { name: 'Baz'}])).toEqual([{ name: 'Baz' }, { name: 'Joe' }]);
  expect(reverse([])).toEqual([]);
})

test('last', () => {
  expect(last(arr)).toEqual(arr[3]);
  expect(last([1, 2, 3])).toBe(3);
})

test('first', () => {
  expect(first(arr)).toEqual(arr[0]);
  expect(first([1, 2, 3] as const)).toBe(1);
})

test('map', () => {
  const getName = (user: typeof arr[number]) => user.name;
  const getAge = ({ age }: typeof arr[number]) => age;

  expect(map(arr, getName)).toEqual(['Joe', 'Baz', 'Fred', 'Bar']);
  expect(sum(map(arr, getAge))).toBe(84);
})

test('findBy', () => {
  expect(findBy(arr, 'name', 'Baz')).toEqual(arr[1]);
  expect(findBy(arr, 'age', 20)).toEqual(arr[0]);
  expect(findBy(arr, 'phone.home', '3')).toEqual(arr[2]);

  expect(findBy(arr, 'age', ({ age }) => age < 18)).toEqual(arr[1]);
  expect(findBy(arr, 'name', ({ name }) => name.startsWith('B'))).toEqual(arr[1]);
})

test('arraySum', () => {
  expect(sum([5, 4, 1])).toBe(10);
})
