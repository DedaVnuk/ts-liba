import uppercase from './uppercase';

export default function capitalize<Str extends string>(str: Str) {
  return `${uppercase(str.substring(0, 1))}${str.substring(1)}` as Capitalize<Str>;
}
