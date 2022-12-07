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

const patch = str => {
	str = str.toString();
	return str.length === 2
		? str
		: `0${str}`;
}

export const useTime = () => {

	const formatDuration = s => {

		let hours = Math.floor(((s % 31536000) % 86400) / 3600),
			minutes = Math.floor((((s % 31536000) % 86400) % 3600) / 60),
			seconds = (((s % 31536000) % 86400) % 3600) % 60;

		return `${patch(hours)}:${patch(minutes)}:${patch(seconds)}`;
	}

	const fromNow = timestamp => {
		return dayjs(timestamp).locale('zh-cn').fromNow();
	}

	const formatTimestamp = timestamp => {
		return timestamp
			? dayjs(timestamp).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
			: null;
	};

	const isInMinutes = (timestamp, minutes = 3) => {
		return dayjs().diff(timestamp, 'minute') < minutes;
	}

	return {
		formatDuration,
		fromNow,
		formatTimestamp,
		isInMinutes
	};
}