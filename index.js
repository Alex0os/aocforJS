const { writeFileSync } = require("fs")
const { execSync } = require("child_process");
const prompt = require("prompt-sync")({sigint : false});

function filesObject() {
	const daysObject = new Object();
	let srcFilesRoutes = execSync('find src_files/ -name "*.js" -type f', {encoding: "utf8"}).split("\n")
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
		const fileDay = fileName.match(/\d+/g);

		daysObject[fileDay] = fileName;

	}
	return daysObject;
}

function commandLineDescription(daysObject){
	let commandMessage = "---------------------------------\n"
	for (i in daysObject) {
		commandMessage += `${i}: ${daysObject[i]}\n`;
	}
	commandMessage += "---------------------------------"
	return commandMessage;
}

function openNeovim(fileToEdit) {
	// Comando para abrir una nueva terminal y ejecutar Neovim
	const currentTerminal = execSync("echo $TERM", {encoding: "utf8"});
	const isTMUX = currentTerminal.match("tmux-256color");
	
	if (isTMUX)
		execSync("tmux new-window nvim " + fileToEdit);
	else
		console.log("Sorry, TMUX is needed to do this");
}

function getAOCDayInfo(fileName) {
	console.log("Introduce 'E' to edit the file");
	console.log("---------------------------------");
	console.log("Introduce 'I' to import the file content");
	console.log("---------------------------------");
	console.log("Press CTRL + C or 'return' to get back");
	console.log("---------------------------------");

	const fileRoute = './src_files/' + fileName;

	while (true) {
		let input = prompt("--> ");

		if (input === "E") {
			openNeovim(fileRoute);
			continue;
		} 

		else if (input === "I") {
			let importedValues = require(fileRoute);
			const errorMessage = 'No values were imported from ----> ' + fileName + '\ \nCheck if a description and value are provided with the "modules.export" utility\n';

			const didImport = Object.keys(importedValues).length > 0;
			console.log(didImport ? importedValues : errorMessage);

			delete require.cache[require.resolve(fileRoute)];
			continue;
		} 

		if (!input || input === "return")
			break;
		else
			console.log("Bad input");
	}
}



function newAOCDay(dayNumber){
	const jsModuleName = `Day${dayNumber}.js`;
	const inputFileName = `inputDay${dayNumber}.txt`

	let challengeName;
	let description;

	while (true) {
		challengeName = prompt("Introduce the day challenge name: "); 
		
		if (!challengeName) {
			console.log("You must introduce a name for this AOC challenge");
			continue;
		}
		console.log("Introudce a brief description (you can press Enter to skip this)")
		description = prompt("---> "); 
		description = description === "" ? "No description provided" : description;
		break;
	}

	const challengeDetails = {
		challengeName: challengeName,
		description: description,

		testResults : {
			firstPart: null,
			secondPart: null
		},

		problemSolutions: {
			firstPart: null,
			secondPart: null
		}
	}

	const fileContent = `// This is the section where you should write your solutions\n\n\n//\n\n${JSON.stringify(challengeDetails, null, 4)}`;

	try {
		writeFileSync(jsModuleName, fileContent);
		console.log("File created and wrote successfully")
	} catch (err) {
		console.log("Error writing file:", err);
	}
}


function createNewFile() {
	// The logic is just getting started, this is for testing only
	while (true) {
		let input = prompt("Select the day that this new file is gonna complete: ");

		if (!input || input === "return")
			break;

		const validNumber = Number(input);
		if (!validNumber || Number(validNumber) > 25) {
			console.log(`"${input}" is not a valid input`);
			continue;
		}

		const command = execSync(`find src_files/ -name "Day${input}.js" -type f`,
			{encoding: "utf8"});

		if (command)
			console.log(`The file that solves the AOC day ${input} already exists`);
		else
			newAOCDay(input);
	}
}


(function main() {
	const daysObject = filesObject();
	const commandLineMessage = commandLineDescription(daysObject);

	while (true){
		console.log("Days of AOC reviewed:\n" + commandLineMessage);
		console.log("'Create': Create a new file")
		console.log("---------------------------------");
		console.log("'exit': Gets out of the command prompt");
		console.log("---------------------------------");
		let input = prompt("Introduce a displayed option: ");

		// "CTRL + C" or "exit" ends the REPL
		if (!input || input === "exit") {
			console.log("Goodbye!");
			break;
		}
		console.log("\n");
		if (input === "Create") {
			createNewFile();
			continue;
		}

		const daySelected = daysObject[input];
		if (daySelected) {
			getAOCDayInfo(daySelected);
		} else {
			console.log(`ERROR --> "${input}" is not a valid option\nPlease Try again\n`);
		}
	}
})();
