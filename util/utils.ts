import moment from 'moment';
export const getTimerFormat = (timer: number) => {
	var d = moment.duration(timer, 'seconds');
	var s = (d.hours() > 0 ? d.hours() + 'h ' : '')
		+ (d.minutes() > 0 ? d.minutes() + 'm ' : '')
		+ (d.minutes() < 5 && d.hours() < 1 ? d.seconds() + 's ' : '');
	return s;
};
