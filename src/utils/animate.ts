import { Func } from '../index';

type AnimateProps = {
  draw: Func<[number]>;
  timeFunc?: Func<[number], number>;
  duration?: number;
}

export default function animate({ draw, timeFunc = (time) => time, duration = 1000 }: AnimateProps) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    let timeFraction = (time - start) / duration;
    if(timeFraction > 1) {
      timeFraction = 1;
    };

    let progress = timeFunc(timeFraction);

    draw(progress);

    if(timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}