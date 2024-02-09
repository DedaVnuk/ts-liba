import { abs, getRandomNumber, percentageOf } from '../src/number';

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
