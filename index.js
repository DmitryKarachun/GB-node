const fs = require('fs')
const readline = require('readline')

const ACCESS_LOG ='./access.log'
const readStream = fs.createReadStream(ACCESS_LOG, 'utf8');
const writeStream1 = fs.createWriteStream('./89.123.1.41_request.log')
const writeStream2 = fs.createWriteStream('./34.48.240.111_request.log')

let numStr = 0;

const rl = readline.createInterface({
	input: readStream,
	terminal:true
})


rl.on('line', (line) => {
	if (line.includes("89.123.1.41")) {
		writeStream1.write(line + "\n")
	}

	if (line.includes("34.48.240.111")) {
		writeStream2.write(line + "\n")
	}
	console.log(++numStr);
})