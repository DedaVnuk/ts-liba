// dprint-ignore
import { split } from './string';
import {
	ArrayUnion,
	First,
	Func,
	Join,
	Last,
	ObjectKeys,
	ObjectValueByKey,
	Reverse,
	UINT,
} from './types';
import { isEqual } from './utils';

// #array

export function chunk<T, Num extends number>(arr: ArrayUnion<T>, count: UINT<Num>) {
	const initialValue = [...arr];
	const res: Array<T[]> = [];

	if(count === 0) {
		return res;
	}

	while(initialValue.length > 0) {
		res.push(initialValue.splice(0, count));
	}

	return res;
}

export function filter<T>(arr: ArrayUnion<T>, func: Func<[T], boolean>) {
	return arr.filter(func);
}

export function numberRange(from: number, to: number) {
	const result: number[] = [];
	if(to <= from) {
		return result;
	}

	for(let i = from; i <= to; i++) {
		result.push(i);
	}

	return result;
}

/**
 * Obj extends Record<string, unknown>
 *
 * @param arr - Obj[]
 * @param key - ObjectKeys<Obj>
 * @param needle - ObjectValueByKey<Obj, Key> | Func<[Obj], boolean>
 * @returns - Obj | undefined
 */
export function findBy<
	Obj extends Record<string, unknown>,
	Key extends ObjectKeys<Obj>,
	Need extends ObjectValueByKey<Obj, Key> | Func<[Obj], boolean> =
		| ObjectValueByKey<Obj, Key>
		| Func<[Obj], boolean>,
>(arr: ArrayUnion<Obj>, key: Key, needle: Need): Obj | undefined {
	if(typeof needle === 'function') {
		return arr.find(needle as Func<[Obj], boolean>);
	}

	const keyParts = split(String(key), '.');
	return arr.find((item) => {
		const value = reduce(
			keyParts,
			Object.create(null),
			(acc, keyPart) => acc[keyPart] ?? item[keyPart],
		);

		return isEqual(value, needle);
	});
}

export function first<T extends ArrayUnion>(arr: T): First<T> {
	return arr[0];
}

export function join<
	Arr extends ArrayUnion,
	Sep extends string = '',
>(arr: Arr, separator: Sep = '' as Sep) {
	return arr.join(separator) as Join<Arr, Sep>;
}

export function last<T extends ArrayUnion>(arr: T) {
	return arr.at(-1) as Last<T>;
}

export function map<T, R>(arr: ArrayUnion<T>, func: Func<[T, number], R>): R[] {
	return reduce<T, R[]>(arr, [], (acc, item, index) => {
		acc.push(func(item, index));
		return acc;
	});
}

export function reduce<T, Acc>(
	arr: ArrayUnion<T>,
	initialValue: Acc,
	func: Func<[Acc, T, number], Acc>,
) {
	let result = initialValue;

	for(let i = 0; i < arr.length; i++) {
		result = func(result, arr[i]!, i);
	}

	return result;
}

export function reverse<T extends unknown, Arr extends ArrayUnion<T>>(arr: Arr) {
	const res: T[] = [];

	for(let i = arr.length - 1; i >= 0; i--) {
		res.push(arr[i] as T);
	}

	return res as Reverse<Arr>;
}

export function sum(arr: ArrayUnion<number>): number {
	return reduce(arr, 0, (acc, num) => acc + num);
}
