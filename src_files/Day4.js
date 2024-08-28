const fs = require("fs");
const fileInput = fs.readFileSync('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/inputDay4.txt', 'utf8');

const testInput = 
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

// PART 1
function getCardScore(winNums, yourNums) {
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

	for (let i = 0; i < input.length; i++) {
		// For an empty line
		if (!input[i])
			continue;

		let cards = input[i];

		cards = cards.split(":")[1];
		cards = cards.split("|");
		const winningNumbers = cards[0].match(/\d+/g);
		const yourNumbers = cards[1].match(/\d+/g);

		totalScore += getCardScore(winningNumbers, yourNumbers);
	}
	return totalScore;
}

// PART 2

function gamePoints(game, gameIdx) {
	// For an empty line
	if (!game)
		return 0;

	let score = 0;

	game = game.split(":")[1];
	game = game.split("|");
	const winningNumbers = new Map();
	game[0].match(/\d+/g).map(x => winningNumbers[x] = true);
	const yourNumbers = game[1].match(/\d+/g);

	yourNumbers.map(number => {
		if (winningNumbers[number])
			score++;
	});

	return new Array(score).fill(gameIdx + 1).map((x, i) => x + i);
}

function parseGames(input) {
	input = input.split("\n").filter(row => row.length);

	const processing = new Array(input.length).fill(0).map((_, i) => i + 1);
	const seen = {};
	const count = {};

	while (processing.length) {
		const idx = processing.pop();
		count[idx] = count[idx] ? count[idx] + 1 : 1;
		const points = seen[idx] ? seen[idx] : gamePoints(input[idx - 1], idx);
		seen[idx] = points;

		points.forEach(x => {
			processing.push(x)
		})
	}

	return Object.keys(count).reduce((acc, x) => { return acc + count[x] }, 0)
}


module.exports = {
	"challengeName" : "ScratchCards",

	"description" : "The problem is about taking a set of cards, where each card\n" +
	"has 2 groups of numbers, the second group is the group of winning numbers\n" +
	"and the first is the numbers that the card offers. Each card represents a game\n" +
	"where you have to see what numbers of the first group are in the second one",

	"testsResults" : {
		"firstPart": scratchCardTotal(testInput),
		"secondPart": parseGames(testInput)
	},

	"prolemSolutions" : {
		"firstPart": scratchCardTotal(fileInput),
		"secondPart": parseGames(fileInput)
	}
}

