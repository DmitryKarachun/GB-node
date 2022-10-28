#!/usr/bin/env node

const fs = require("fs/promises");
const {lstatSync} = require('fs')
const readline = require("readline");
const yargs = require("yargs");
const path = require("path");
const inquirer = require('inquirer');

let currentDirectory = process.cwd();

console.log(currentDirectory);

const options = yargs
.positional('d',{
	describe:'Path to directory',
	default: process.cwd(),
})
.positional('p', {
	describe:'Pattern',
	default:'',
}).argv;
console.log(options);

class ListItem {
	constructor(path, fileName) {
		this.path = path;
		this.fileName = fileName;
	}
	get isDir() {
		return lstatSync(this.path).isDirectory();
	}
}

const run = async () => {
	const list = await fs.readdir(currentDirectory);
	const items = list.map(fileName => 
		new ListItem(path.join(currentDirectory, fileName), fileName));

		const item = await inquirer
		.prompt([
			{
				name:'fileName',
				type: 'list',
				message: `Choose ${currentDirectory}`,
				choices: items.map(item => ({name: item.fileName, value: item})),
			}
		])
		.then(answer => answer.fileName);

	if (item.isDir) {
		currentDirectory = item.path;
		return await run();
	}	else {
		const data = await fs.readFile(item.path, 'utf-8');

		if (options.p == null) console.log(data);
		else {
			const regExp = new RegExp(options.p, 'igm');
			console.log(data.match(regExp));
		}
	}
}

run();



// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// rl.question("Введите путь до файла:", (inputedPath) => {
// 	const filePath = path.join(__dirname, inputedPath);
// 	fs.readFile(filePath, "utf8", (err, data) => {
// 		console.log(data.slice(0, 150));
// 		rl.close();
// 	});
// });

// rl.on("close", () => {
// 	process.exit;
// });

// const isFile = fileName => { return fs.lstatSync(fileName).isFile() };
// const list = fs.readdirSync(currentDirectory).filter(isFile);

// inquirer
// 	.prompt([{
// 		name: "fileName",
// 		type: "list",
// 		message: "Choose file:",
// 		choices: list,
// 	}])
// 	.then((answer) => {
// 		console.log(answer.fileName);
// 		const filePath = path.join(__dirname, answer.fileName);
// 		fs.readFile(filePath, 'utf8', (err, data) => {
// 			console.log(data);
// 		});
// 	});



