const execCommand = require("child_process").execSync;
const prompt = require("prompt-sync")({sigint : false});

const FOLDER_INDEX = 1;
const FILE_INDEX = 2;

function filesObj() {
	const daysAndFilesObj = new Object();
	let srcFilesRoutes = execCommand('find src_files/ -name "*.js" -type f', {encoding: "utf8"}).split("\n")
	// Last element is an empty string that the "execComand()" returns by default
	srcFilesRoutes = srcFilesRoutes.slice(0, -1);

	if (!srcFilesRoutes) {
		console.log("There are no days completed");
		return;
	}

	for (route of srcFilesRoutes) {
		route = route.split("/");
		let dayFolder = route[FOLDER_INDEX];
		let problem = route[FILE_INDEX];

		if (daysAndFilesObj[dayFolder]) {
			daysAndFilesObj[dayFolder].push(problem);
		} else {
			daysAndFilesObj[dayFolder] = [problem];
		}
	}
	return daysAndFilesObj;
}

function questionDisplay(days){
	let returnString = "---------------------------------\n"
	for (i in days) {
		returnString += "- " + i + "\n";
	}
	returnString += "---------------------------------"
	return returnString;
}

function getDayInfo(day, files) {
	let message = "";
	let separators = "*********************************"

	for (let i = 0; i < files.length; i++){
		message += String(i + 1) + "-> " + files[i] + "\n";
	}

	while (true) {
		console.log("Select one of the options by its index number:\n")
		console.log(separators + "\n" + message + separators + "\n");

		let input = prompt("Number --> ");

		if (!input || input === "return") {
			return;
		}

		if (files[Number(input) - 1]){
			const importedValues = require(`./src_files/${day}/${files[Number(input) - 1]}`);
			const errorInfo = 'No values were imported from ----> ' + files[Number(input) - 1] + '\
			\nCheck if a description and value are provided with the "modules.export" utility\n';

			const info = Object.keys(importedValues).length ? importedValues : errorInfo;
			console.log(info);
		}
		else {
			console.log(`ERROR --> "${input}" is not a valid option`);
		}
	}
}


const days = filesObj();
const promptMessage = questionDisplay(days);

(function main() {
	while (true){
		console.log("Days of AOC reviewed:\n" + promptMessage);
		let daySelected = prompt("Select a day to review ---> ");

		// Goodbye message if the input is "CTRL + c" or exit
		if (!daySelected || daySelected === "exit") {
			console.log("Goodbye!");
			break;
		}

		console.log("\n");

		if (days[daySelected]) {
			getDayInfo(daySelected, days[daySelected]);
		} else {
			console.log(`ERROR --> "${daySelected}" is not a valid option\nPlease Try again\n`);
		}
	}
})();
