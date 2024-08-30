import { abs, getRandomNumber, percentageOf, twoDigits } from '../src/number';

test('twoDigits', () => {
	expect(twoDigits(10)).toBe('10');
	expect(twoDigits(1)).toBe('01');
	expect(twoDigits(0)).toBe('00');

	expect(twoDigits(100)).toBe('100');
	expect(twoDigits(9999)).toBe('9999');
	expect(twoDigits(0.5)).toBe('0.5');

	expect(twoDigits(-5)).toBe('-5');
	expect(twoDigits(-50)).toBe('-50');
});

test('getRandomNumber', () => {
	const value = getRandomNumber(0, 10);
	expect(value).toBeGreaterThanOrEqual(0);
	expect(value).toBeLessThanOrEqual(10);

	const random = getRandomNumber();
	expect(random).toBeGreaterThanOrEqual(0);
	expect(random).toBeLessThanOrEqual(1);

	const random2 = getRandomNumber(5);
	expect(random2).toBeGreaterThanOrEqual(1);
	expect(random2).toBeLessThanOrEqual(5);
});

test('percentageOf', () => {
	const getPercent = percentageOf(500);

	expect(getPercent(50)).toBe(0.1);
	expect(getPercent(10)).toBe(0.02);
	expect(getPercent(500)).toBe(1);
});

test('abs', () => {
	expect(abs(5)).toBe(5);
	expect(abs(-1)).toBe(1);
});
