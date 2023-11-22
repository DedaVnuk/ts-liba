import { array } from './array/index';
import { number } from './number/index';
import { object } from './object/index';
import { string } from './string/index';
import { utils } from './utils/index';

export * from './types/index';

// array
export const arraySum = array.arraySum;
export const findBy = array.findBy;
export const map = array.map;
export const first = array.first;
export const last = array.last;
export const reverse = array.reverse;
export const reduce = array.reduce;
export const join = array.join;


// number
export const abs = number.abs;
export const percentageOf = number.percentageOf;


// object
export const pick = object.pick;
export const omit = object.omit;
export const keys = object.keys;
export const values = object.values;
export const entries = object.entries;


// string
export const split = string.split;
export const repeat = string.repeat;
export const format = string.format;
export const uppercase = string.uppercase;
export const lowercase = string.lowercase;
export const capitalize = string.capitalize;
export const uncapitalize = string.uncapitalize;
export const camelCase = string.camelCase;
export const pascalCase = string.pascalCase;
export const snakeCase = string.snakeCase;


// utils
export const animate = utils.animate;
export const defer = utils.defer;
export const length = utils.length;
export const curry = utils.curry;
export const countdown = utils.countdown;
export const repeater = utils.repeater;
