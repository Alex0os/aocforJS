const fs = require("fs");
const readFile = fs.readFileSync;

let fileInput = readFile('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/inputDay3.txt', 'utf8');

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`


function surroundingCoordinates([x, y], inputLength, lineLength) {
	const operandCoordinates = [
		[-1, -1], [0, -1], [1, -1],
		[-1, 0], [1, 0],
		[-1, 1], [0, 1], [1, 1]];

	const newCoordinates = [];

	operandCoordinates.forEach(([i, j]) => {
		let newX = x + i;
		let newY = y + j;

		const less = newX < 0 || newY < 0;
		const more = newX > inputLength || newY > lineLength;
		
		if (less || more)
			return;

		newCoordinates.push([newX, newY]);
	})
	return newCoordinates;
}

function anySymbolAround(symbolsAround) {
	for (char of symbolsAround) {
		if (char && char !== "." && char !== "0" && !Number(char)) { 
			return true;
		}
	}
	return false;
}


function numsAdjacentToSymbols(input) {
	let sum = 0;

	input = input.split("\n");
	input = input.map(line => line += ".");

	let checked = false;
	let currentNumber = "";

	const inputLength = input.length;
	for (let x = 0; x < input.length; x++) {
		currentNumber = "";
		checked = false;
		const currentState = sum;
		const lineLength = input[x].length;
		const validNums = [];
		for (let y = 0; y < input[x].length; y++) {
			if (Number(input[x][y]) || input[x][y] === "0") {
				currentNumber += input[x][y];
				const surroundings = surroundingCoordinates([x, y], inputLength, lineLength);
				let surroundingSymbols = [];
				surroundings.map(([i, j]) => surroundingSymbols.push(input[i][j]));
				console.log(`${currentNumber} --> ${surroundingSymbols}`);
				checked = checked ? checked : anySymbolAround(surroundingSymbols);
			} 
			else if (!Number(input[x][y]) && currentNumber && input[x][y]!== "0") {
				if (checked) {
					//console.log("The part number is: " + currentNumber);
					validNums.push(Number(currentNumber));
					console.log(currentNumber);
					sum += Number(currentNumber);
					currentNumber = "";
					checked = false;
				} else {
					currentNumber = "";
					checked = false;
				}
			}
		}
		const total = validNums.reduce((acc, num) => acc + num, 1);
		console.log(`${currentState} + ${total} (${JSON.stringify(validNums)}) --> ${sum}`);
		//console.log(input[x]);
	}
	return sum;
}

console.log(numsAdjacentToSymbols(fileInput));

module.exports = {
	challengeName : "Gear Ratios",

	description : `No description provided`,

	testsResults : {
		secondPart: null
	},

	prolemSolutions : {
		firstPart: null,
		secondPart: null
	}
}

