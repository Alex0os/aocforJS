const fs = require("fs");
const readFile = fs.readFileSync;

let data = readFile('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day 1/fisrtPart.txt', 'utf8');


function getNumsResult() {
	let result = 0;
	let arrayNums = []

	let firstNum;
	let secondNum;

	for (char of data){
		if ((char === '\n') && (!secondNum)){
			arrayNums.push(firstNum + firstNum);
			firstNum = undefined;
		} else if ((char === '\n') && (secondNum)){
			arrayNums.push(firstNum + secondNum);
			firstNum = undefined;
			secondNum = undefined;
		}

		if ((char >= '0' && char <= '9') && (firstNum)){
			secondNum = char;
		} else if ((char >= '0' && char <= '9') && (!firstNum)){
			firstNum = char;
		}
	}

	arrayNums.map((num) => result += Number(num));
	return result;
}

// Part 2

const testInput = ` two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

function wordsIntoNumbers(input_buffer) {
	input_buffer = input_buffer.split("\n");

	let total = 0;

	const numberWords = {
		"zero": "0",
		"one": "1",
		"two": "2",
		"three": "3",
		"four": "4",
		"five": "5",
		"six": "6",
		"seven": "7",
		"eight": "8",
		"nine": "9"};

	input_buffer.forEach(line => {
		if (!line) {
			return;
		}

		let word = "";
		numbersInLine = [];

		for (char of line) {
			if (Number(char)){
				numbersInLine.push(char);
				continue;
			}
			word += char;

			for (key in numberWords) {
				if (word.match(key)) {
					numbersInLine.push(numberWords[key]);
					word = char;
					break;
				}
			}

		}
		const firstPlusLast = numbersInLine[0] + numbersInLine[numbersInLine.length - 1];
		total += Number(firstPlusLast);
	});
	return total;
}

console.log(wordsIntoNumbers(data));

module.exports = {
	description : "It works!!",
	result : `This is the result ---> ${getNumsResult()}`,
}

