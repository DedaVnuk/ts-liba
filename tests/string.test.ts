import {
  uppercase,
  lowercase,
  capitalize,
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
} from '../src/index';

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
