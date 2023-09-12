import { Func } from '../index';

export default function countdown(func: Func<[number]>, seconds: number, step = 1000) {
  let time = setTimeout(() => {
    countdown(func, seconds - 1);
  }, step)

  if(seconds < 0) {
    return clearInterval(time);
  }

  func(seconds);
}
