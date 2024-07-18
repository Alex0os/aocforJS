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
		commandMessage += `${i + 1}.- ${daysArray[i]}\n`;
	}
	commandMessage += "---------------------------------"
	return commandMessage;
}

function getAOCDayInfo(fileString) {

	while (true) {
		let importedValues = require(`./src_files/${fileString}`);
		const errorMessage = 'No values were imported from ----> ' + fileString + '\ \nCheck if a description and value are provided with the "modules.export" utility\n';

		const didImport = Object.keys(importedValues).length > 0;
		console.log(didImport ? importedValues : errorMessage);

		delete require.cache[require.resolve(`./src_files/${fileString}`)];
		let input = prompt("Press CTRL + C or write 'return' to go back: ");


		if (!input || input === "return")
			break;
		else if (input === "try again")
			continue;
	}
}



function createNewFile() {
	// The logic is just getting started, this is for testing only
	let input = prompt("Select the day that this new file is gonna complete: ");

	const command = execCommand(`find src_files/ -name "Day${input}.js" -type f`,
								{encoding: "utf8"});

	if (command)
		console.log(command);
	else
		console.log(`No file with the name Day${input}.js found`);
}


(function main() {
	const daysArray = filesArray();
	const commandLineMessage = commandLineDescription(daysArray);

	while (true){
		console.log("Days of AOC reviewed:\n" + commandLineMessage);
		console.log("0.- Create a new file")
		console.log("---------------------------------");
		let input = prompt("Select an option by its number: ");

		// "CTRL + C" or "exit" ends the REPL
		if (!input || input === "exit") {
			console.log("Goodbye!");
			break;
		}
		console.log("\n");
		if (input === "0") {
			createNewFile();
			continue;
		}

		const daySelected = daysArray[Number(input) - 1];
		if (daySelected) {
			getAOCDayInfo(daySelected);
		} else {
			console.log(`ERROR --> "${input}" is not a valid option\nPlease Try again\n`);
		}
	}
})();
