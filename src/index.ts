import { array } from './array/index';
import { utils } from './utils/index';

export * from './types/index';

// array
export const arraySum = array.arraySum;


// utils
export const length = utils.length;

export default {
  ...array,
  ...utils,
};
