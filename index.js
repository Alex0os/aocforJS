const execCommand = require("child_process").execSync;
const prompt = require("prompt-sync")({sigint : false});


function filesObj() {
	const daysAndFilesObj = new Object();
	let srcFilesRoutes = execCommand('find src_files/ -name "*.js" -type f', {encoding: "utf8"}).split("\n")
	// "srcFilesRoutes" last element is an empty string that the "execComand()" returns by default
	srcFilesRoutes = srcFilesRoutes.slice(0, -1);

	if (!srcFilesRoutes) {
		console.log("There are no days completed");
		return;
	}

	const FOLDER_INDEX = 1;
	const FILE_INDEX = 2;
	for (route of srcFilesRoutes) {
		route = route.split("/");
		let dayFolderName = route[FOLDER_INDEX];
		let fileName = route[FILE_INDEX];

		if (daysAndFilesObj[dayFolderName]) {
			daysAndFilesObj[dayFolderName].push(fileName);
		} else {
			daysAndFilesObj[dayFolderName] = [fileName];
		}
	}
	return daysAndFilesObj;
}

function commandLineDescription(daysObj){
	let commandMessage = "---------------------------------\n"
	for (dayFolderName in daysObj) {
		commandMessage += `- ${dayFolderName}\n`;
	}
	commandMessage += "---------------------------------"
	return commandMessage;
}

function getAOCDayInfo(folderNameString, filesArray) {
	let filesInFolder = "";
	let separators = "*********************************"

	for (let i = 0; i < filesArray.length; i++){
		const dayNumber = i + 1;
		filesInFolder += String(dayNumber) + "-> " + filesArray[i] + "\n";
	}

	while (true) {
		console.log("Select one of the options by its index number:\n")
		console.log(separators + "\n" + filesInFolder + separators + "\n");

		let input = prompt("Number --> ");

		if (!input || input === "return") {
			return;
		}

		const fileSelectedIndex = Number(input) - 1;
		if (filesArray[fileSelectedIndex]){
			const importedValues = require(`./src_files/${folderNameString}/${filesArray[fileSelectedIndex]}`);
			const errorMessage = 'No values were imported from ----> ' + filesArray[fileSelectedIndex] + '\
			\nCheck if a description and value are provided with the "modules.export" utility\n';

			const didImport = Object.keys(importedValues).length >= 0;
			console.log(didImport ? importedValues : errorMessage);
		}
		else {
			console.log(`ERROR --> "${input}" is not a valid option`);
		}
	}
}



(function main() {
	const daysAndFilesObj = filesObj();
	const commandLineMessage = commandLineDescription(daysAndFilesObj);

	while (true){
		console.log("Days of AOC reviewed:\n" + commandLineMessage);
		let daySelected = prompt("Select a day to review ---> ");

		// Goodbye message if the input is "CTRL + c" or exit
		if (!daySelected || daySelected === "exit") {
			console.log("Goodbye!");
			break;
		}

		console.log("\n");

		if (daysAndFilesObj[daySelected]) {
			getAOCDayInfo(daySelected, daysAndFilesObj[daySelected]);
		} else {
			console.log(`ERROR --> "${daySelected}" is not a valid option\nPlease Try again\n`);
		}
	}
})();
