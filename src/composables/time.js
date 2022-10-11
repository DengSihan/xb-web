import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// const patch = str => {
// 	str = str.toString();
// 	return str.length === 2
// 		? str
// 		: `0${str}`;
// }

export const useTime = () => {

	// const formatPromoteTime = raw => {
	// 	let hours = Math.trunc(raw / (60*60)),
	// 		minutes = (raw % (60*60)) / 60;
	// 	return `${patch(hours)}:${patch(minutes)}`;
	// }

	// const parsePromoteTime = time => {
	// 	let [hours, minutes] = time.split(':');
	// 	hours = parseInt(hours);
	// 	minutes = parseInt(minutes);
	// 	return hours * 60*60 + minutes * 60;
	// }

	const fromNow = timestamp => {
		return dayjs(timestamp).locale('zh-cn').fromNow();
	}

	const formatTimestamp = timestamp => {
		return timestamp
			? dayjs(timestamp).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
			: null;
	};

	return {
		// formatPromoteTime,
		// parsePromoteTime,
		fromNow,
		formatTimestamp,
	};
}