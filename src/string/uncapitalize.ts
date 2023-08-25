import lowercase from './lowercase';

export default function uncapitalize<Str extends string>(str: Str) {
  return `${lowercase(str.substring(0, 1))}${str.substring(1)}` as Uncapitalize<Str>
}
