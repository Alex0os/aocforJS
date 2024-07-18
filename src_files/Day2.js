const { testsResults } = require("./Day1");

let puzzleInput = require("fs").readFileSync("/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day 2/inputDay2.txt", "utf8");

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

//PART 1
function numberOfValidGames(fileInput){
	// The last element of "gamesArray" is an empty string. The conondrum is
	// solved at the start of the "forEach" method
	let gamesArray = fileInput.split("\n");
	let answer = 0;

	const validAmounts = {
		red : 12,
		green : 13,
		blue : 14
	};

	gamesArray.forEach((game, index) => {
		// The logic of this code marks an empty string as valid, so to
		// avoid adding the ID of an empty string, this conditional is used
		if (game === "") return; 

		let isValidGame = true;
		const amountsAndColors = game.split(' ');

		for (let i = 0; i < amountsAndColors.length; i++) {
			const isAColor = amountsAndColors[i].match(/(red|blue|green)/g);
			const isAnAmount = Number(amountsAndColors[i - 1]);

			if (isAColor && isAnAmount > validAmounts[isAColor]) {
				isValidGame = false;
				break
			}
		}

		if (isValidGame) {
			const gameID = index + 1
			answer += gameID;
		}
	});
	return answer
}


//PART 2
function powerOfASetOfCubes(fileInput){
	const gamesArray = fileInput.split("\n");
	let result = 0;

	gamesArray.forEach(game => {
		const amountsAndColors = game.split(" ");
		const leastAmountsForValidGame = {
			red: 0,
			blue: 0,
			green: 0
		};

		for (let i = 0; i < amountsAndColors.length; i++) {
			const isAColor = amountsAndColors[i].match(/(red|blue|green)/g);
			const isAnAmount = Number(amountsAndColors[i - 1]);

			if (isAColor && leastAmountsForValidGame[isAColor] < isAnAmount) {
				leastAmountsForValidGame[isAColor] = isAnAmount;
			}
		}
		let powerOfAmounts = 1;
		Object.values(leastAmountsForValidGame).map(x => powerOfAmounts *= x);
		result += powerOfAmounts;
	});
	return result;
}


module.exports = {
	dayName: "Cube Conondrum",
	description: "No Description yet",

	testsResults: {
		firstPart: numberOfValidGames(testInput),
		secondPart: powerOfASetOfCubes(testInput)
	},

	problemSolutions: {
		firstPart: numberOfValidGames(puzzleInput),
		secondPart: powerOfASetOfCubes(puzzleInput)
	}
}
