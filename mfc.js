import { rejects } from 'assert';
import EventEmmiter from 'events';

const requestTypes = [
	{
	type: 'send',
	payload: 'to send a document'
	},
	{
	type: 'receive',
	payload: 'to receive a document'
	},
	{
	type: 'sign',
	payload: 'to sign a document'
	}
	];
	
class Customer {
	constructor(params) {
		this.type = params.type
		this.payload = params.payload
	}
}

const generateIntInRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min +1)) + min;
}

const delay = (ms) => {
	return new Promise((resolve, rejects) => {
		setTimeout(resolve, ms)
	})
}
const generateNewCustomer = () => {
	const interval = generateIntInRange(1, 5) * 1000;
	const params = requestTypes[generateIntInRange(0, 2)]
	return delay(interval).then(() => new Customer(params))
}

class Handler {
	static send(payload) {
		console.log('Send request');
		console.log(`Customer need ${payload}`);
	}
	static receive(payload) {
			console.log('Recieve request');
			console.log(`Customer need ${payload}`);		
		}
	static sign(payload) {
				console.log('Sign request');
				console.log(`Customer need ${payload}`);

			}
}

const emitter = new class extends EventEmmiter {}



emitter.on('send', Handler.send)
emitter.on('recieve', Handler.receive)
emitter.on('sign', Handler.sign)


const run =  async () => {
	const customer = await generateNewCustomer()
	emitter.emit(customer.type, customer.payload)
	run()
}
run()