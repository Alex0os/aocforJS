let fileInput = require("fs").readFileSync("/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day 2/firstPart.txt", "utf8");

//PART 1
function numberOfValidGames(){
	// I may be stupid, but I can't find another way to make the "split()" method
	// to return the array of games without the last element being an empty
	// string that end up screwing the compilation of the file, so I just use slice()
	let gamesArray = fileInput.split("\n").slice(0, -1);
	let answer = 0;

	const validAmounts = {
		red : 12,
		green : 13,
		blue : 14
	};

	gamesArray.forEach(game => {
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
			const gameID = Number(amountsAndColors[1].split(':')[0]);
			answer += gameID;
		}
	});
	return answer
}

console.log(numberOfValidGames()); // 2156
module.exports = {
	description: "No description provided yet",
	result: numberOfValidGames()
}
