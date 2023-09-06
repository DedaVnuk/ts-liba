import { Func, Slice } from '../index';

type PartialExceptFirst<Args extends any[]> = Args extends [infer First, ...infer Rest]
  ? [Required<First>, ...Partial<Rest>]
  : []

type GetArgs<
  FnArgs extends any[],
  Params extends any[],
> = PartialExceptFirst<Params extends [] ? FnArgs : Slice<FnArgs, Params['length']>>

export type Curry<
  Fn extends Func<any[], any>,
  Params extends any[] = []
> = Fn extends (...args: infer FnParams) => infer FnReturn
  ? FnParams['length'] extends Params['length']
    ? FnReturn
    : <Args extends GetArgs<Parameters<Fn>, Params>>
      (...args: Args) => Args['length'] extends Parameters<Fn>['length']
        ? ReturnType<Fn>
        :
        <Args2 extends GetArgs<Parameters<Fn>, [...Args, ...Params]>>
          (...args2: Args2) => Curry<Fn, [...Params, ...Args, ...Args2]>
  : never

export default function curry<
  Fn extends Func<any[], any>,
>(func: Fn) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return (...args2) => curried(...[...args, ...args2]);
    }
  } as Curry<Fn>
}
