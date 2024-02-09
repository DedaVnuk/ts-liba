// #date

const MILLISECONDS = 1000;
const MINUTE = MILLISECONDS * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export function yearDayNumber(now = new Date()) {
	const start = new Date(now.getFullYear(), 0, 0);
	const diff = now.valueOf() - start.valueOf();
	return Math.floor(diff / DAY);
}
