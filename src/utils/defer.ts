import { Func } from '../index';

export type DeferCallback<T> = Func<[number], T>

export default function defer<T>(func: DeferCallback<T>, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(func(ms)), ms));
}
