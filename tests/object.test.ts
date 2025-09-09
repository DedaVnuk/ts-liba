import { entries, keys, omit, pick, values } from '../src/object';

const obj = {
	name: 'Joe',
	age: 20,
	admin: false,
};

test('entries', () => {
	expect(entries(obj)).toEqual([['name', 'Joe'], ['age', 20], ['admin', false]]);
});

test('values', () => {
	expect(values(obj)).toEqual(['Joe', 20, false]);
});

test('keys', () => {
	expect(keys(obj)).toEqual(['name', 'age', 'admin']);
});

test('pick', () => {
	expect(pick(obj, ['name'])).toEqual({ name: 'Joe' });
	expect(pick(obj, ['name', 'age'])).toEqual({ name: 'Joe', age: 20 });
});

test('omit', () => {
	expect(omit(obj, ['admin'])).toEqual({ name: 'Joe', age: 20 });
	expect(omit(obj, ['name', 'age'])).toEqual({ admin: false });
});
