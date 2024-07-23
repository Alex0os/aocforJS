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


function surroundingCoordinates([y, x], inputLength, linesLength) {
	const operandCoordinates = [
		[-1, -1], [0, -1], [1, -1],
		[-1, 0], [1, 0],
		[-1, 1], [0, 1], [1, 1]];

	const newCoordinates = [];

	operandCoordinates.forEach(([i, j]) => {
		let newX = y + i;
		let newY = x + j;

		const less = newX < 0 || newY < 0;
		const more = newX >= inputLength || newY >= linesLength;
		
		if (less || more)
			return;

		newCoordinates.push([newX, newY]);
	})
	return newCoordinates;
}

function isANumber(char){
	return !isNaN(parseInt(char));
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
	const linesLength = input[0].length;

	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			if (isANumber(input[y][x])) {
				currentNumber += input[y][x];
				const surroundings = surroundingCoordinates([y, x], inputLength, linesLength);
				let surroundingSymbols = [];
				surroundings.map(([i, j]) => surroundingSymbols.push(input[i][j]));
				checked = checked ? checked : anySymbolAround(surroundingSymbols);
			} 
			if (!isANumber(input[y][x])) {
				if (checked) {
					sum += Number(currentNumber);
					currentNumber = "";
					checked = false;
				} else {
					currentNumber = "";
					checked = false;
				}
			}
		}
	}
	return sum;
}


module.exports = {
	challengeName : "Gear Ratios",

	description : `No description provided`,

	testsResults : {
		firstPart: numsAdjacentToSymbols(testInput),
		secondPart: null
	},

	prolemSolutions : {
		firstPart: numsAdjacentToSymbols(fileInput),
		secondPart: null
	}
}

