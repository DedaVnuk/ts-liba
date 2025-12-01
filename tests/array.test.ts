import {
	chunk,
	filter,
	findBy,
	first,
	join,
	last,
	map,
	numberRange,
	reduce,
	reverse,
	sum,
} from '../src/array';
import { nthArg } from '../src/utils';

test('chunk', () => {
	const arr = [1, 2, 3, 4, 5];
	expect(chunk(arr, 2)).toEqual([[1, 2], [3, 4], [5]]);
	expect(chunk(arr, 4)).toEqual([[1, 2, 3, 4], [5]]);

	expect(chunk(arr, 0)).toEqual([]);
	expect(chunk(arr, 10)).toEqual([[...arr]]);

	const arr2: unknown[] = [];
	expect(chunk(arr2, 0)).toEqual([]);
	expect(chunk(arr2, 5)).toEqual([]);

	const arr3 = [1, 'a', 2, 'b', { name: 'Joe', age: 20 }];
	expect(chunk(arr3, 2)).toEqual([[1, 'a'], [2, 'b'], [{ name: 'Joe', age: 20 }]]);
});

test('filter', () => {
	const arr = [1, 2, '3', 4, false, true, 0];
	expect(filter(arr, (item) => typeof item !== 'string')).toEqual([1, 2, 4, false, true, 0]);

	expect(filter(arr, Boolean)).toEqual([1, 2, '3', 4, true]);
	expect(filter(arr, (item) => Number(item) > 10)).toEqual([]);

	expect(filter([], Boolean)).toEqual([]);

	const users = [
		{ name: 'Joe', age: 14 },
		{ name: 'Baz', age: 24 },
		{ name: 'Jany', age: 18 },
	];
	const moreThen18 = ({ age }: typeof users[number]) => age > 18;
	expect(filter(users, moreThen18)).toEqual([{ name: 'Baz', age: 24 }]);
});

test('numberRange', () => {
	const arr = new Array(21).fill('').map(nthArg(1));
	expect(numberRange(0, 20)).toEqual(arr);

	const arr2 = [-3, -2, -1, 0, 1, 2, 3];
	expect(numberRange(-3, 3)).toEqual(arr2);

	expect(numberRange(8, 3)).toEqual([]);
});

const arr = [
	{ name: 'Joe', age: 20, phone: { home: '1', work: '101' }, friends: [1, 2, 3] },
	{ name: 'Baz', age: 12, phone: { home: '2', work: '102' }, friends: [2] },
	{ name: 'Fred', age: 20, phone: { home: '3', work: '103' }, friends: [1, 3] },
	{ name: 'Bar', age: 32, phone: { home: '4', work: '104' }, friends: [3] },
] as const;

test('join', () => {
	expect(join([1, 2, 3])).toBe('123');
	expect(join([])).toBe('');
	expect(join(['Welcome', 'to', 'home'], '__')).toBe('Welcome__to__home');
});

test('reduce', () => {
	expect(reduce([0, 1, 0, 2, null], [], (acc: string[], item) => {
		acc.push(`${item}`);
		return acc;
	})).toEqual(['0', '1', '0', '2', 'null']);

	expect(reduce(arr, [], (acc: string[], item) => {
		acc.push(item.name);
		return acc;
	})).toEqual(['Joe', 'Baz', 'Fred', 'Bar']);

	expect(reduce(arr, [], (acc: string[], item) => {
		if(item.name.startsWith('B')) {
			acc.push(item.name);
		}
		return acc;
	})).toEqual(['Baz', 'Bar']);

	expect(reduce([], 0, (acc, item) => acc + item)).toBe(0);
	expect(reduce([1, 2, 3], 5, (acc, item) => acc + item)).toBe(11);
});

test('reverse', () => {
	expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
	expect(reverse([{ name: 'Joe' }, { name: 'Baz' }])).toEqual([{ name: 'Baz' }, { name: 'Joe' }]);
	expect(reverse([])).toEqual([]);
});

test('last', () => {
	expect(last(arr)).toEqual(arr[3]);
	expect(last([1, 2, 3])).toBe(3);
});

test('first', () => {
	expect(first(arr)).toEqual(arr[0]);
	expect(first([1, 2, 3] as const)).toBe(1);
});

test('map', () => {
	const getName = (user: typeof arr[number]) => user.name;
	const getAge = ({ age }: typeof arr[number]) => age;

	expect(map(arr, getName)).toEqual(['Joe', 'Baz', 'Fred', 'Bar']);
	expect(sum(map(arr, getAge))).toBe(84);
});

test('findBy', () => {
	expect(findBy(arr, 'name', 'Baz')).toEqual(arr[1]);
	expect(findBy(arr, 'age', 20)).toEqual(arr[0]);
	expect(findBy(arr, 'friends', [2])).toEqual(arr[1]);
	expect(findBy(arr, 'phone.home', '3')).toEqual(arr[2]);

	expect(findBy(arr, 'age', ({ age }) => age < 18)).toEqual(arr[1]);
	expect(findBy(arr, 'name', ({ name }) => name.startsWith('B'))).toEqual(arr[1]);
});

test('arraySum', () => {
	expect(sum([5, 4, 1])).toBe(10);
});
