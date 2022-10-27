
import moment from 'moment'
import 'moment-timezone';
import EventEmmiter from 'events'
import 'moment-precise-range-plugin'

const emmiter = new EventEmmiter()

const [ dateStringInFuture] =process.argv.slice(2)
const DATE_FORMAT_PATTERN = 'YYYY-MM-DD HH:mm:ss';

const getDateFromDateString = (dateString) => {
	const [hour, day, month, year] = dateString.split('-');
	return new Date(year,month - 1, day, hour);
};


const showRemainingTime = (dateInFuture) => {
	const dateNow = new Date ();
	if (dateNow >= dateInFuture) {
		emmiter.emit('timerEnd');
	}
	 else {
		const currentDateFormatted = moment(dateNow, DATE_FORMAT_PATTERN);

		const futureDateFormatted = moment(dateInFuture, DATE_FORMAT_PATTERN);
		const diff = moment.preciseDiff(currentDateFormatted, futureDateFormatted);

		console.clear();
		console.log(diff);
	 }
};

const showTimeDone = (timerId) => {
	clearInterval(timerId);
	console.log('Таймер истёк');
}

const dateInFuture = getDateFromDateString(dateStringInFuture);

const timerId = setInterval(() => {
	emmiter.emit('timerTick', dateInFuture);
}, 1000)

emmiter.on('timerTick', showRemainingTime);
emmiter.on('timerEnd', () => {
	showTimeDone(timerId);
});