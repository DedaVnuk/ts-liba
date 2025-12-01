// dprint-ignore
import { reduce } from './array';
// dprint-ignore
import { ArrayUnion, ObjectEntries, ObjectType, ObjectValues } from './types';

// #object

export function isObject(value: unknown): value is ObjectType {
	return (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value)
	);
}

export function entries<
	Obj extends ObjectType,
>(obj: Obj) {
	return Object.entries(obj) as ObjectEntries<Obj>;
}

export function keys<Obj extends ObjectType>(obj: Obj) {
	return Object.keys(obj) as (keyof Obj)[];
}

export function omit<Obj extends ObjectType, Keys extends (keyof Obj)[]>(
	obj: Obj,
	keys: Keys,
): Omit<Obj, Keys[number]> {
	return reduce(keys, { ...obj }, (acc, key) => {
		delete acc[key];
		return acc;
	});
}

export function pick<Obj extends ObjectType, Keys extends ArrayUnion<keyof Obj>>(
	obj: Obj,
	keys: Keys,
): Pick<Obj, Keys[number]> {
	return reduce(keys, Object.create(null), (acc: Obj, key: keyof Obj) => {
		acc[key] = obj[key];
		return acc;
	});
}

export function values<Obj extends ObjectType>(obj: Obj) {
	return Object.values(obj) as ObjectValues<Obj>[];
}
