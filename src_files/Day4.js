const fs = require("fs");
const fileInput = fs.readFileSync('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/inputDay4.txt', 'utf8');

const testInput = 
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`


// La primera es la lista de los numeros ganadores, la segunda es la lista de
// numeros que tienes

function getGameScore(winNums, yourNums) {
	let score = 0;

	yourNums.forEach(num => {
		if (winNums.includes(num) && score) 
			score *= 2;
		else if (winNums.includes(num) && !score) 
			score++;
	});
	return score;
}

function scratchCardTotal(input) {
	input = input.split("\n");

	let totalScore = 0;

	for (let i = 0; i < input.length - 2; i++) {
		let game = input[i];

		game = game.split(":")[1];
		game = game.split("|");
		const winningNumbers = game[0].match(/\d+/g);
		const yourNumbers = game[1].match(/\d+/g);

		totalScore += getGameScore(winningNumbers, yourNumbers);
	}
	return totalScore;
}

console.log(scratchCardTotal(testInput));
console.log(scratchCardTotal(fileInput));
