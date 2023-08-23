import { length } from '../src/index'

test('length', () => {
  expect(length('hello')).toBe(5);

  expect(length([{ name: 'A' }, { name: 'B' }])).toBe(2);
})