import EventEmitter from "events";
import moment from "moment";
import 'moment-precise-range-plugin'

const emitter = new EventEmitter();

const [dataStringInFutures] = process.argv.slice(2);
const DATA_FORMAT = 'YYYY-MM-DD-HH:mm:ss';


const  getDateFromDateString = (dataFuturesString) => {
	const [hour, day, month, year] = dataFuturesString.split('-');
	return new Date(year, month - 1, day, hour);
}

const showRemainingTime = (dateInFuture) => {
	const dateNow = new Date();
	if (dateNow >= dateInFuture) {
		emitter.emit('end');
	} else {
	const currentTime = moment(dateNow, DATA_FORMAT);
	const futureTime = moment(dateInFuture, DATA_FORMAT);

	
	const difference = moment.preciseDiff(currentTime, futureTime);
	console.clear()
	console.log(difference );
	
}}

const timerEnd = (timerInterval) => {
	clearInterval(timerInterval);
	console.log('таймер истёк');
}

const dateInFuture = getDateFromDateString(dataStringInFutures);

const timerInterval = setInterval(() => {
	emitter.emit('tick', dateInFuture)
}, 1000)

emitter.on('tick', showRemainingTime);
emitter.on('end', () =>{timerEnd(timerInterval)} );