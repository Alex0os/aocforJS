const fs = require("fs");
const readFile = fs.readFileSync;

let fileInput = readFile('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day 1/inputDay1.txt', 'utf8');

const testFirstPart = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const testSecondPart = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;


function getNumsResult(input) {
	let result = 0;
	let arrayNums = []

	let firstNum;
	let secondNum;

	for (char of input){
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


function wordsIntoNumbers(input) {
	input = input.split("\n");

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

	input.forEach(line => {
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

console.log(getNumsResult(testFirstPart));
console.log(wordsIntoNumbers(testSecondPart));

console.log(getNumsResult(fileInput));
console.log(wordsIntoNumbers(fileInput));

/* 
	* 142
	* 281
	* 55130
	* 54985
*/
module.exports = {
}

