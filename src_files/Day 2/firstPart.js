const fs = require("fs");
const { clearLine } = require("readline");
const readFile = fs.readFileSync;



let fileContent = readFile('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day2/firstPart.txt', "utf8");

const availableForEachType = {
	red: 12,
	green: 13,
	blue: 14
};

function isValid(gameSet){
	gameSet.forEach(element => {
		const numbers = element.match(/\d+/g);
		const colors = element.match(/(green|red|blue)/g);

		for (let i = 0; i < colors.length; i++){
			if (availableForEachType[colors[i]] < Number(numbers[i])){
				return 0;
			}
		}
	});
	return gameSet.length
}

(function cubeConondrum() {
	let result = 0;

	fileContent = fileContent.split("\n").slice(0, -1);
	//const pattern = /^(\w+)\s(\d+)/;
	for (line of fileContent){
		line = line.replace(/^Game \d+: /, "").split("; ");
		result += isValid(line);
	}
	console.log(result);
})();
