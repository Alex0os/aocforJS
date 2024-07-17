const execCommand = require("child_process").execSync;
const prompt = require("prompt-sync")({sigint : false});


function filesArray() {
	const daysArray = new Array();
	let srcFilesRoutes = execCommand('find src_files/ -name "*.js" -type f', {encoding: "utf8"}).split("\n")
	// "srcFilesRoutes" last element is an empty string that the "execComand()" returns by default
	srcFilesRoutes = srcFilesRoutes.slice(0, -1);

	if (!srcFilesRoutes) {
		console.log("There are no days completed");
		return;
	}

	const FILE_INDEX = 1;
	for (route of srcFilesRoutes) {
		route = route.split("/");
		const fileName = route[FILE_INDEX];
		daysArray.push(fileName);

	}
	return daysArray;
}

function commandLineDescription(daysArray){
	let commandMessage = "---------------------------------\n"
	for (let i = 0; i < daysArray.length; i++) {
		commandMessage += `${i + 1}- ${daysArray[i]}\n`;
	}
	commandMessage += "---------------------------------"
	return commandMessage;
}

function getAOCDayInfo(fileString) {
	const importedValues = require(`./src_files/${fileString}`);
	const errorMessage = 'No values were imported from ----> ' + fileString + '\ \nCheck if a description and value are provided with the "modules.export" utility\n';

	while (true) {

		const didImport = Object.keys(importedValues).length >= 0;
		console.log(didImport ? importedValues : errorMessage);

		let input = prompt("Press CTRL + C or write 'return' to go back: ");
		if (!input || input === "return")
			break;
	}
}




(function main() {
	const daysArray = filesArray();
	const commandLineMessage = commandLineDescription(daysArray);
	console.log(daysArray);

	while (true){
		console.log("Days of AOC reviewed:\n" + commandLineMessage);
		let daySelected = prompt("Select a day to review ---> ");

		// Goodbye message if the input is "CTRL + c" or exit
		if (!daySelected || daySelected === "exit") {
			console.log("Goodbye!");
			break;
		}

		console.log("\n");

		if (daysArray[daySelected - 1]) {
			getAOCDayInfo(daysArray[daySelected - 1]);
		} else {
			console.log(`ERROR --> "${daySelected}" is not a valid option\nPlease Try again\n`);
		}
	}
})();
