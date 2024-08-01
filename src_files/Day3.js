const fs = require("fs");

let fileInput = fs.readFileSync('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/inputDay3.txt', 'utf8');


const testInput = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`


// PART 1

function surroundingCoordinates([y, x], inputLength, linesLength) {
	const operandCoordinates = [
		[-1, -1], [0, -1], [1, -1],
		[-1, 0], [1, 0],
		[-1, 1], [0, 1], [1, 1]];

	const newCoordinates = [];

	operandCoordinates.forEach(([i, j]) => {
		let newX = x + i;
		let newY = y + j;

		const less = newX < 0 || newY < 0;
		const more = newX >= linesLength || newY >= inputLength;
		
		if (less || more)
			return;

		newCoordinates.push([newY, newX]);
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

	for (let y = 0; y < inputLength; y++) {
		for (let x = 0; x < linesLength; x++) {
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


// PART 2



// check if any surrounding characters are symbols
function checkStarsAround(input, gearMap, rowIndex, charIndex, currentNumber) { 
	let hasGear = false;

	for (let y = rowIndex - 1; y <= rowIndex + 1; y++) {
		for (let x = charIndex - currentNumber.length - 1; x <= charIndex; x++) {
			if (input[y] && input[y][x] && input[y][x] === "*") {
				hasGear = true;
				const current = gearMap.get(`${x},${y}`) ?? [];
				current.push(parseInt(currentNumber));
				gearMap.set(`${x},${y}`, current);
			}
		}
	}
	return hasGear;
}

function hasGears(input) {
	input = input.split("\n").map((line) => line.split(""));

	let total = 0;
	const gearMap = new Map();

	input.forEach((line, rowIndex) => {
		let currentNumber = "";
		line.forEach((char, charIndex) => {
			// if char is a digit, append to current currentNumber
			if (char.match(/\d/)) {
				currentNumber += char;
			}

			let hasGear = false;

			if ((currentNumber.length > 0 && !char.match(/\d/)) || charIndex === line.length - 1) {
				if (charIndex === line.length - 1 && char.match(/\d/)) 
					charIndex++;
				
				hasGear = checkStarsAround(input, gearMap, rowIndex, charIndex, currentNumber);
				currentNumber = "";
			}
		});
	});

	gearMap.forEach((values, key) => { 
		if (values.length === 2) {
			total += values[0] * values[1];
		}
	});
	return total;
}






module.exports = {
	"challengeName" : "Gear Ratios",

	"description" : `No description provided`,

	"testsResults" : {
		"firstPart": numsAdjacentToSymbols(testInput),
		"secondPart": hasGears(testInput)
	},

	"prolemSolutions" : {
		"firstPart": numsAdjacentToSymbols(fileInput),
		"secondPart": hasGears(fileInput)
	}
}

