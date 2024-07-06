// This file will serve the purpose to execute all the source files and compare
// the results that this were given with the right ones

const prompt = require("prompt-sync")({sigint : false});

const days = {
	1 : ["Day1: Trebuchet?", require("/home/Matixannder/Desktop/AdventOfCode/JS/src_files/Day1/firstPart")()]
}
const TITLE = 0;
const RESULT = 1;

let displayQuestion = "Select from the days that have been completed: ";

while (true){

	let product = prompt(displayQuestion);

	// Goodbye message if the input is "CTRL + c" or exit
	if (!product || product === "exit") {
		console.log("Goodbye!");
		break;
	}

	if (days[product]) {
		console.log(`${days[product][TITLE]} --> ${days[product][RESULT]}`);
	}

}
