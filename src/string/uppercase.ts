export default function uppercase<Str extends string>(str: Str) {
  return str.toLocaleUpperCase() as Uppercase<Str>;
}
