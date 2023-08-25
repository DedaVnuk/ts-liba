import { pick, omit } from '../src/index';

const obj = {
  name: 'Joe',
  age: 20,
  admin: false,
}

test('pick', () => {
  expect(pick(obj, ['name'])).toEqual({ name: 'Joe' });
  expect(pick(obj, ['name', 'age'])).toEqual({ name: 'Joe', age: 20 });
})

test('omit', () => {
  expect(omit(obj, ['admin'])).toEqual({ name: 'Joe', age: 20 });
  expect(omit(obj, ['name', 'age'])).toEqual({ admin: false });
})
