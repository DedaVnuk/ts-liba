// dprint-ignore
import { reduce } from './array';
// dprint-ignore
import { ArrayUnion, ObjectEntries, ObjectValues } from './types';

// #object

export function entries<
	Obj extends Record<string, any>,
>(obj: Obj) {
	return Object.entries(obj) as ObjectEntries<Obj>;
}

export function keys<Obj extends Record<string, any>>(obj: Obj) {
	return Object.keys(obj) as (keyof Obj)[];
}

export function omit<Obj extends Record<string, any>, Keys extends (keyof Obj)[]>(
	obj: Obj,
	keys: Keys,
): Omit<Obj, Keys[number]> {
	return reduce(keys, { ...obj }, (acc, key) => {
		delete acc[key];
		return acc;
	});
}

export function pick<Obj extends Record<string, any>, Keys extends ArrayUnion<keyof Obj>>(
	obj: Obj,
	keys: Keys,
): Pick<Obj, Keys[number]> {
	return reduce(keys, Object.create(null), (acc: Obj, key: keyof Obj) => {
		acc[key] = obj[key];
		return acc;
	});
}

export function values<Obj extends Record<string, any>>(obj: Obj) {
	return Object.values(obj) as ObjectValues<Obj>[];
}
