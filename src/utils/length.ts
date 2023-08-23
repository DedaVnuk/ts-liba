type LengthArg = { length: number };

export default function length<T extends LengthArg>(value: T): T['length'] {
  return value.length;
}
