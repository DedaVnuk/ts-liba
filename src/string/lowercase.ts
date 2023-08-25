export default function lowercase<Str extends string>(str: Str) {
  return str.toLocaleLowerCase() as Lowercase<Str>;
}
