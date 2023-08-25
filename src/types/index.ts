export * from './string';
export * from './object';

export type Func<Args extends unknown[], Return = void> = (...args: Args) => Return;
