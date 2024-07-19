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

module.exports = {
	challengeName : "Gear Ratios",

	description : `No description provided`,

	testsResults : {
		firstPart: null,
		secondPart: null
	},

	prolemSolutions : {
		firstPart: null,
		secondPart: null
	}
}

