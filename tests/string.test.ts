import {
	camelCase,
	capitalize,
	format,
	lowercase,
	pascalCase,
	repeat,
	replace,
	replaceAll,
	snakeCase,
	split,
	substring,
	trim,
	trimLeft,
	trimRight,
	uncapitalize,
	uppercase,
} from '../src/string';

test('trim', () => {
	expect(trim('   hello')).toBe('hello');
	expect(trim('   space on end ')).toBe('space on end');
	expect(trim(' ')).toBe('');
	expect(trim('')).toBe('');
	expect(trim('\n')).toBe('');
});

test('trimRight', () => {
	expect(trimRight('   hello')).toBe('   hello');
	expect(trimRight('   space on end ')).toBe('   space on end');
	expect(trimRight(' ')).toBe('');
	expect(trimRight('')).toBe('');
});

test('trimLeft', () => {
	expect(trimLeft('   hello')).toBe('hello');
	expect(trimLeft('   space on end ')).toBe('space on end ');
	expect(trimLeft(' ')).toBe('');
	expect(trimLeft('')).toBe('');
});

test('replace', () => {
	expect(replaceAll('hello_world', '_', ' ')).toBe('hello world');
	expect(replaceAll('___', '_', '#')).toBe('###');
	expect(replaceAll('foo', 'o', 't')).toBe('ftt');

	const getString = () => '  Hello   ';
	expect(replaceAll(getString(), ' ', '')).toBe('Hello');
});

test('replace', () => {
	expect(replace('hello_world', '_', ' ')).toBe('hello world');
	expect(replace('', '___', 'foo')).toBe('');
	expect(replace('foo', 'o', 't')).toBe('fto');
});

test('substring', () => {
	expect(substring('hello', 3)).toBe('lo');
	expect(substring('hello', -2)).toBe('lo');
	expect(substring('hello', 1, 3)).toBe('el');
});

test('split', () => {
	expect(split('Hello')).toEqual(['H', 'e', 'l', 'l', 'o']);
	expect(split('')).toEqual([]);
	expect(split('Welcome', 'a')).toEqual(['Welcome']);
});

test('repeat', () => {
	expect(repeat('hello', 3)).toBe('hellohellohello');
	expect(repeat('', 10)).toBe('');
	expect(repeat('Hi', 0)).toBe('');
	expect(repeat('Hi', 1)).toBe('Hi');
});

test('format', () => {
	const date = new Date('1991-08-29');
	const [year, month, day] = [
		`${date.getFullYear()}`,
		`${date.getMonth() + 1}`.padStart(2, '0'),
		`${date.getDate()}`.padStart(2, '0'),
	];

	expect(format('{$3}.{$2}.{$1}', [year, month, day])).toBe('29.08.1991');
	expect(format('', ['Hello', 'World'])).toBe('');
	expect(format('{$1}, {$2}', ['Hello', 'World'])).toBe('Hello, World');

	expect(format('{$1}, {$2}. {$4}', ['Hello', 'World', 'more', 'params'])).toBe(
		'Hello, World. params',
	);
	expect(format('{$1}: {$2}', ['This is', String(true)])).toBe('This is: true');
	expect(format('{$1}', [String({ name: 'Joe' })])).toBe('[object Object]');
});

test('snakeCase', () => {
	expect(snakeCase('get price')).toBe('get_price');
	expect(snakeCase('get token price')).toBe('get_token_price');
});

test('pascalCase', () => {
	expect(pascalCase('get_price', '_')).toBe('GetPrice');
	expect(pascalCase('get price')).toBe('GetPrice');
});

test('camelCase', () => {
	expect(camelCase('get_price', '_')).toBe('getPrice');
	expect(camelCase('get price')).toBe('getPrice');
});

test('uppercase', () => {
	expect(uppercase('Hello')).toBe('HELLO');
	expect(uppercase('My home')).toBe('MY HOME');
});

test('lowercase', () => {
	expect(lowercase('HeLLo')).toBe('hello');
	expect(lowercase('My Home')).toBe('my home');
});

test('capitalize', () => {
	expect(capitalize('hello')).toBe('Hello');
	expect(capitalize('my home')).toBe('My home');
});

test('uncapitalize', () => {
	expect(uncapitalize('Hello')).toBe('hello');
	expect(uncapitalize('HELLO')).toBe('hELLO');
});
