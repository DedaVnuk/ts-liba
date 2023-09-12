import { UINT } from '../index';

export default function percentageOf<T extends number>(total: UINT<T>) {
  return <V extends number>(value: UINT<V>) => value / total;
}
