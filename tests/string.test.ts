import {
  uppercase,
  lowercase,
  capitalize,
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
  format,
  repeat,
  split,
} from '../src/index';

test('split', () => {
  expect(split('Hello')).toEqual(['H', 'e', 'l', 'l', 'o']);
  expect(split('')).toEqual([]);
  expect(split('Welcome', 'a')).toEqual(['Welcome']);
})

test('repeat', () => {
  expect(repeat('hello', 3)).toBe('hellohellohello');
  expect(repeat('', 10)).toBe('');
  expect(repeat('Hi', 0)).toBe('');
  expect(repeat('Hi', 1)).toBe('Hi');
})

test('format', () => {
  const date = new Date('1991-08-29');
  const [year, month, day] = [`${date.getFullYear()}`, `${date.getMonth() + 1}`.padStart(2, '0'), `${date.getDate()}`.padStart(2, '0')];

  expect(format('{$3}.{$2}.{$1}', [year, month, day])).toBe('29.08.1991');
  expect(format('', ['Hello', 'World'])).toBe('');
  expect(format('{$1}, {$2}', ['Hello', 'World'])).toBe('Hello, World');

  expect(format('{$1}, {$2}. {$4}', ['Hello', 'World', 'more', 'params'])).toBe('Hello, World. params');
  expect(format('{$1}: {$2}', ['This is', String(true)])).toBe('This is: true');
  expect(format('{$1}', [String({ name: 'Joe' })])).toBe('[object Object]')
})

test('snakeCase', () => {
  expect(snakeCase('get price')).toBe('get_price');
  expect(snakeCase('get token price')).toBe('get_token_price');
})

test('pascalCase', () => {
  expect(pascalCase('get_price', '_')).toBe('GetPrice');
  expect(pascalCase('get price')).toBe('GetPrice');
})

test('camelCase', () => {
  expect(camelCase('get_price', '_')).toBe('getPrice');
  expect(camelCase('get price')).toBe('getPrice');
})

test('uppercase', () => {
  expect(uppercase('Hello')).toBe('HELLO');
  expect(uppercase('My home')).toBe('MY HOME');
})

test('lowercase', () => {
  expect(lowercase('HeLLo')).toBe('hello');
  expect(lowercase('My Home')).toBe('my home');
})

test('capitalize', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('my home')).toBe('My home');
})

test('uncapitalize', () => {
  expect(uncapitalize('Hello')).toBe('hello');
  expect(uncapitalize('HELLO')).toBe('hELLO');
})
