import colors from 'colors';
import readline from 'readline';

function isPrimeNumber(a, b) {
	let result = [];
	nextPrime:
	for (let i = a; i <= b; i++) { // Для всех i...
		for (let j = 2; j < i; j++) { // проверить, делится ли число..
			if (i % j == 0) continue nextPrime; // не подходит, берём следующее
		}
		result.push(+i);
	}
	return result;

}
console.log('Введите диапазон простых чисел от и до');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let idColor = 0;

function colorsPrint (arr) {
	const colorsType = ['green', 'yellow', 'red'];
	console.log( colors[colorsType[idColor]](arr));

	if (idColor === colorsType.length - 1) {
		idColor = 0;
	} else {
		idColor++;
	}
}

rl.question('Введите первое число, от: ', (num1) => {
	rl.question('Введите второе число, до : ', (num2) => {

		if (Math.sign(num1) < 0 || Math.sign(num2) < 0  ) {
			console.log('Ведите положительное число');
			rl.close();
			return false;
		}
		if (!Number.isInteger(+num1) || !Number.isInteger(+num2)) {
			console.warn(colors.red('Введенные данные не являются числами'));
			rl.close();
			return false;
		}

		let arr = isPrimeNumber(+num1, +num2);

		if (arr.length === 0) {
			console.log(colors.red('Простых чисел в данном диапозоне нет'))
			rl.close();
		} else {
			console.log(`Вывожу простые числа в диапозоне с ${num1} по ${num2}`);
			for (let index = 0; index < arr.length; index++) {
				colorsPrint(arr[index]);
				// console.log(arr[index]);
				
			}
		}
		rl.close();
	});
});


