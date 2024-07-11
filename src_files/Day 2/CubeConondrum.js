let text = require("fs").readFileSync("/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day2/firstPart.txt", "utf8").replace(/Game \d+: /, "");
let input = text.split("\n").slice(0, -1);


let answer = 0;
let red = 12;
let green = 13;
let blue = 14;

//PART 1
input.forEach(line => {
	let validGame = true;

	// For each line in the input, the line will be split into multiple elments
	// that were separated by spaces
	let sets = line.split(' ');
	for (let i = 0; i < sets.length; i++) {
			if (sets[i].match(/^red/g) && Number(sets[i - 1]) > red) {
				validGame = false;
				break;
			} else if (sets[i].match(/^green/g) && Number(sets[i - 1]) > green) {
				validGame = false;
				break;
			} else if (sets[i].match(/^blue/g) && Number(sets[i - 1]) > blue) {
				validGame = false;
				break;
			}
	}
	answer += validGame ? Number(sets[1].split(':')[0]) : 0;
});

module.exports = {
	description: "No description provided yet",
	result: answer
}
