// dprint-ignore
import { Abs, PadStart, UINT } from './types';

// #number

export function getRandomNumber(min = 0, max = 1, decimals = 2) {
	if(min >= max) {
		[min, max] = [max, min];
	}

	const factor = Math.pow(10, decimals);
	const randomNumber = Math.random() * (max - min) + min;
	return Math.round(randomNumber * factor) / factor;
}

export function abs<T extends number>(num: T) {
	return Math.abs(num) as Abs<T>;
}

export function percentageOf<T extends number>(total: UINT<T>) {
	return <V extends number>(value: UINT<V>) => value / total;
}

export function twoDigits<T extends number>(num: T) {
	return num.toString().padStart(2, '0') as PadStart<`${T}`, '0'>;
}
