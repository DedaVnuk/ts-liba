import { Func } from '../index';

export default function repeater<T>(fn: Func<[number], T>, attempts: number): T {
  for (let i = 1; i < attempts; i++) {
    try {
      return fn(i);
    } catch (error) {
      console.error(error);
    }
  }

  throw new Error(`Function failed after ${attempts} attempts`);
}
