// dprint-ignore
import { reduce } from './array';
// dprint-ignore
import { keys } from './object';
// dprint-ignore
import { Func, Reverse, Single, Slice } from './types';

// #utils

export function ifTrue<Fn extends Func<any[]>>(condition: boolean, fn: Fn): ReturnType<Fn> | void {
	return condition ? fn() : void 0;
}

export function ifFalse<Fn extends Func<any[]>>(condition: boolean, fn: Fn): ReturnType<Fn> | void {
	return condition ? void 0 : fn();
}

export function isEqual<A, B>(a: A, b: B): boolean {
	if(typeof a !== typeof b) {
		return false;
	}

	if(a === null && b === null) {
		return true;
	}

	if(Array.isArray(a) && Array.isArray(b)) {
		if(a.length !== b.length) {
			return false;
		}

		for(let i = 0; i < a.length; i++) {
			if(!isEqual(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}

	if(typeof a === 'object' && typeof b === 'object') {
		if(a === null || b === null) {
			return false;
		}
		const keysA = keys(a);
		const keysB = keys(b);

		if(keysA.length !== keysB.length) {
			return false;
		}

		const uniqueKeys = [...new Set([...keysA, ...keysB])];
		return reduce(uniqueKeys, true, (_, key) => isEqual(a[key as keyof A], b[key as keyof B]));
	}

	return (a as Single) === (b as Single);
}

export function isNull<T>(value: T) {
	return isEqual(value, null);
}

export function isUndefined<T>(value: T) {
	return isEqual(value, undefined);
}

export function flip<Args extends any[], Return>(
	fn: Func<Args, Return>,
): Func<Reverse<Args>, Return> {
	return (...args) => fn(...args.reverse() as Parameters<typeof fn>);
}

export function always<T>(value: T) {
	return () => value;
}

export function alwaysTrue() {
	return always(true);
}

export function alwaysFalse() {
	return always(false);
}

export function alwaysNull() {
	return always(null);
}

export function nthArg<N extends number>(num: N) {
	return <Args extends any[]>(...args: Args): Args[N] => args[num];
}

export function getId() {
	let id = 1;
	return () => id++;
}

export function getUID(len = 10) {
	const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let uid = '';

	for(let i = 0; i < len; i++) {
		const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
		uid += alphanumericChars[randomIndex];
	}

	return uid;
}

type AnimateProps = {
	draw: Func<[number]>;
	timeFunc?: Func<[number], number>;
	duration?: number;
};

export function animate({ draw, timeFunc = (time) => time, duration = 1000 }: AnimateProps) {
	const start = performance.now();

	requestAnimationFrame(function frameAnimate(time) {
		// timeFraction от 0 до 1
		const timeFraction = Math.min((time - start) / duration, 1);

		const progress = timeFunc(timeFraction);
		draw(progress);

		if(timeFraction < 1) {
			requestAnimationFrame(frameAnimate);
		}
	});
}

export function countdown(func: Func<[number]>, count: number, step = 1000) {
	let time = setTimeout(() => {
		countdown(func, count - 1);
	}, step);

	if(count < 0) {
		return clearInterval(time);
	}

	func(count);
}

type PartialExceptFirst<Args extends any[]> = Args extends [infer First, ...infer Rest]
	? [Required<First>, ...Partial<Rest>]
	: [];

type GetArgs<
	FnArgs extends any[],
	Params extends any[],
> = PartialExceptFirst<Params extends [] ? FnArgs : Slice<FnArgs, Params['length']>>;

export type Curry<
	Fn extends Func<any[], any>,
	Params extends any[] = [],
> = Fn extends (...args: infer FnParams) => infer FnReturn
	? FnParams['length'] extends Params['length'] ? FnReturn
	: <Args extends GetArgs<Parameters<Fn>, Params>>(
		...args: Args
	) => Args['length'] extends Parameters<Fn>['length'] ? ReturnType<Fn>
		: <Args2 extends GetArgs<Parameters<Fn>, [...Args, ...Params]>>(
			...args2: Args2
		) => Curry<Fn, [...Params, ...Args, ...Args2]>
	: never;

export function curry<
	Fn extends Func<any[], any>,
>(func: Fn) {
	return function curried(...args) {
		if(args.length >= func.length) {
			return func(...args);
		} else {
			return (...args2) => curried(...[...args, ...args2]);
		}
	} as Curry<Fn>;
}

export type DeferCallback<T> = Func<[number], T>;

export function defer<T>(func: DeferCallback<T>, ms: number): Promise<T> {
	return new Promise((resolve) => setTimeout(() => resolve(func(ms)), ms));
}
type LengthArg = { length: number; };

export function length<T extends LengthArg>(value: T): T['length'] {
	return value.length;
}

export function repeater<T>(fn: Func<[number], T>, attempts: number): T | Error {
	if(attempts <= 0) {
		return new Error(`Function failed`);
	}

	try {
		return fn(attempts);
	} catch (error) {
		return repeater<T>(fn, attempts - 1);
	}
}
