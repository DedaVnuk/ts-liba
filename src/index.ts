import { array } from './array/index';
import { object } from './object/index';
import { string } from './string/index';
import { utils } from './utils/index';

export * from './types/index';

// array
export const arraySum = array.arraySum;
export const findBy = array.findBy;
export const map = array.map;


// object
export const pick = object.pick;
export const omit = object.omit;
export const keys = object.keys;
export const values = object.values;
export const entries = object.entries;


// string

export const format = string.format;
export const uppercase = string.uppercase;
export const lowercase = string.lowercase;
export const capitalize = string.capitalize;
export const uncapitalize = string.uncapitalize;
export const camelCase = string.camelCase;
export const pascalCase = string.pascalCase;
export const snakeCase = string.snakeCase;


// utils
export const length = utils.length;
export const curry = utils.curry;

export default {
  ...array,
  ...object,
  ...string,
  ...utils,
};
