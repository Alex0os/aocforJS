const fs = require("fs");
const readFile = fs.readFileSync;

let data = readFile('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day1/fisrtPart.txt', 'utf8');


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

module.exports = {
	description : "This is the description",
	result : `This is the result ---> ${getNumsResult()}`,
}
