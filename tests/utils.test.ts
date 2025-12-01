import { map } from '../src/array';
import { pick } from '../src/object';
import {
	always,
	alwaysFalse,
	alwaysNull,
	alwaysTrue,
	animate,
	countdown,
	curry,
	debounce,
	defer,
	flip,
	getId,
	getUID,
	ifFalse,
	ifTrue,
	includes,
	indexOf,
	isEqual,
	isNull,
	isUndefined,
	length,
	nthArg,
	repeater,
	toNumber,
	toString,
} from '../src/utils';
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

global.window = global as any;
global.window.requestAnimationFrame = (cb: FrameRequestCallback) => {
	setTimeout(cb, 1000 / 60);
	return 1000 / 60;
};

describe('animate', () => {
	test('draw func', () => {
		const draw = jest.fn((num: number) => num);
		// const draw = jest.fn((num: number) => console.log('animate', num));
		animate({ draw, duration: 100 });

		jest.runAllTimers();
		expect(draw).toBeCalled();
	});

	// test('draw {n} time calls', () => {
	// 	const drawNth = jest.fn((num: number) => num);
	// 	// const drawNth = jest.fn((num: number) => console.log('animate {n} time', num));

	// 	animate({ draw: drawNth, duration: 100 });
	// 	jest.runAllTimers();

	// 	expect(drawNth).toBeCalledTimes(3);
	// });
});

test('defer', () => {
	const fn = jest.fn((a: number) => a * 2);

	defer(fn, 300);

	jest.runAllTimers();
	expect(fn).toBeCalledTimes(1);
	expect(fn(5)).toBe(10);
	expect(fn(5)).not.toBe(5);
});

describe('debounce', () => {
	let func: jest.Mock;
	let debouncedFunc: Function;

	beforeEach(() => {
		func = jest.fn();
		debouncedFunc = debounce(func, 1000);
	});

	test('debounce just once', () => {
		for(let i = 0; i < 100; i++) {
			debouncedFunc();
		}

		jest.runAllTimers();
		expect(func).toBeCalledTimes(1);
		jest.clearAllTimers();
	});
});

test('includes', () => {
	expect(includes([1, 2, 3], 2)).toBeTruthy();
	expect(includes([1, 2, 3], 2, 2)).toBeFalsy();

	const getArr = () => [1, 2, 3];
	expect(includes(getArr(), 5)).toBeFalsy();

	expect(includes('hello', 'e')).toBeTruthy();

	const getStr = () => 'hello';
	expect(includes(getStr(), 'w')).toBeFalsy();
});

test('indexOf', () => {
	expect(indexOf('hello', 'l')).toBe(2);
	expect(indexOf('hello', 'l', 4)).toBe(-1);

	const getStr = () => 'hello';
	expect(indexOf(getStr(), 'w')).toBe(-1);

	expect(indexOf([1, 2, 3], 2)).toBe(1);
	expect(indexOf([1, 2, 3], 2, 2)).toBe(-1);
	expect(indexOf([1, 2, 3], 5)).toBe(-1);
});

test('toString', () => {
	expect(map([1, 2, 3], toString)).toEqual(['1', '2', '3']);
	expect(toString(null)).toBe('null');
	expect(toString(true)).toBe('true');
	expect(toString(NaN)).toBe('NaN');
	expect(toString('hello')).toBe('hello');
	expect(toString([])).toBe('');
	expect(toString({})).toBe('[object Object]');
});

test('toNumber', () => {
	expect(toNumber('12')).toBe(12);
	expect(toNumber('id-12')).toBe(NaN);
	expect(toNumber('3.14')).toBe(3.14);
	expect(toNumber('hello')).toBe(NaN);
	expect(toNumber(null)).toBe(0);
	expect(toNumber(undefined)).toBe(NaN);
	expect(toNumber([])).toBe(0);
	expect(toNumber({})).toBe(NaN);
});

test('if{condition}', () => {
	const notCalled = () => {};

	expect(ifTrue(true, () => 5 + 3)).toBe(8);
	expect(ifTrue(false, notCalled)).toBeUndefined();

	expect(ifFalse(false, () => pick({ name: 'Baz', age: 20 }, ['name']))).toEqual({ name: 'Baz' });
	expect(ifFalse(true, notCalled)).toBeUndefined();
});

test('isEqual', () => {
	expect(isEqual('a', 'a')).toBeTruthy();
	expect(isEqual('a', 'b')).toBeFalsy();
	expect(isEqual('a', 'hello')).toBeFalsy();

	const a = null;
	expect(isNull(a!)).toBeTruthy();
	expect(isNull('not null')).toBeFalsy();
	expect(isNull('')).toBeFalsy();
	expect(isNull(0)).toBeFalsy();
	expect(isNull(NaN)).toBeFalsy();

	expect(isUndefined(a)).toBeFalsy();
	expect(isUndefined(undefined)).toBeTruthy();
	expect(isUndefined(false)).toBeFalsy();

	const obj1 = { name: 'a' };
	const obj2 = { name: 'a' };
	expect(isEqual(obj1, obj2)).toBeTruthy();

	expect(isEqual({ name: 'Joe', age: 20 }, { name: 'Joe', admin: false })).toBeFalsy();
	expect(isEqual({ name: 'Joe' }, { name: 'Joe', admin: false })).toBeFalsy();

	const arr1 = [1];
	const arr2 = [1];
	expect(isEqual(arr1, arr2)).toBeTruthy();
	expect(isEqual([1, 2, 3], ['a', 'b', 'c'])).toBeFalsy();

	expect(isEqual(true, true)).toBeTruthy();
	expect(isEqual(false, 0)).toBeFalsy();
	expect(isEqual(undefined!, false)).toBeFalsy();

	expect(isEqual([], [])).toBeTruthy();
	expect(isEqual([1, 'hello'], [])).toBeFalsy();
	expect(isEqual({}, {})).toBeTruthy();
	expect(isEqual(null, {})).toBeFalsy();
	expect(isEqual('', '')).toBeTruthy();

	expect(isEqual(NaN, 1)).toBeFalsy();
	expect(isEqual(NaN, undefined)).toBeFalsy();
});

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
});

test('always', () => {
	const alwaysFn = always('Hello');
	expect(alwaysFn()).toBe('Hello');
});

test('alwaysTrue', () => {
	const fn = alwaysTrue();
	expect(fn()).toBe(true);
});

test('alwaysFalse', () => {
	const fn = alwaysFalse();
	expect(fn()).toBe(false);
});

test('alwaysNull', () => {
	const fn = alwaysNull();
	expect(fn()).toBe(null);
});

test('nthArg', async () => {
	const arr = ['a', 'b', 'c'];

	const indexes = arr.map(nthArg(1));
	expect(indexes).toEqual([0, 1, 2]);
});

test('getUID', () => {
	expect(getUID()).toHaveLength(10);
	expect(getUID(3)).toHaveLength(3);
	expect(getUID(50)).toHaveLength(50);

	const [uid, uid2] = [getUID(), getUID()];
	expect(uid).not.toEqual(uid2);
});

test('getId', () => {
	const id = getId();

	const idsArr = [id(), id(), id()];
	expect(idsArr).toEqual([1, 2, 3]);

	const userId = getId();
	expect(userId()).toBe(1);
	expect(userId()).toBe(2);
});

describe('countdown', () => {
	test('one time called', () => {
		const fn = jest.fn((i) => i);
		// const fn = jest.fn((i) => console.log('coundown', i));
		countdown(fn, 1);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	test('{n} time call', () => {
		// const fn = jest.fn((i) => console.log('{n}', i));
		const fn = jest.fn((i) => i);
		countdown(fn, 3, 300);

		jest.runAllTimers();

		expect(fn).toHaveBeenCalledTimes(3);
	});
});

test('repeater', async () => {
	const fn = jest.fn();
	repeater(fn, 3);
	expect(fn).toBeCalledTimes(1);

	const successedAfterRepeat = jest.fn((count: number) => {
		if(count === 3) {
			return 'Successed';
		}

		throw new Error(`Error with repeat: ${count}`);
	});

	const result = repeater(successedAfterRepeat, 5);
	expect(successedAfterRepeat).toBeCalledTimes(3);
	expect(result).toBe('Successed');

	const failedFn = jest.fn((count: number) => {
		throw new Error(`Error with repeat: ${count}`);
	});

	const failedFnResult = repeater(failedFn, 3);
	expect(failedFn).toBeCalledTimes(3);
	expect(failedFnResult).toBeInstanceOf(Error);

	const fetchFn = jest.fn((count: number) => {
		if(count > 2) {
			throw new Error(`Fail`);
		}

		return Promise.resolve('Promise resolved');
	});
	const fetchFnResult = await repeater(fetchFn, 3);
	expect(fetchFn).toBeCalledTimes(2);
	expect(fetchFnResult).toBe('Promise resolved');
});

test('curry', () => {
	const sum = (a: number, b: number) => a + b;
	const curriedSum = curry(sum);

	expect(sum(4, 5)).toBe(9);

	expect(curriedSum(3, 1)).toBe(4);
	expect(curriedSum(3)(1)).toBe(4);
});

test('length', () => {
	expect(length('hello')).toBe(5);

	expect(length([{ name: 'A' }, { name: 'B' }])).toBe(2);
});
