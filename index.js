const execCommand = require("child_process").execSync;
const prompt = require("prompt-sync")({sigint : false});

function filesObj() {
	const returnObject = {};
	let srcFiles = execCommand('find src_files/ -name "*.js" -type f', {encoding: "utf8"}).split("\n")
	// Last elemnt is an empty string that the "execComand()" returns by default
	srcFiles = srcFiles.slice(0, -1);


	if (!srcFiles) {
		console.log("There are no days completed");
		return;
	}

	for (file of srcFiles) {
		let day = file.split("/")[1];
		if (returnObject[day]) {
			returnObject[day].push(file);
		} else {
			returnObject[day] = [file];
		}
	}
	return returnObject;
}

function questionDisplay(days){
	let returnString = ""
	
	for (i in days) {
		returnString += "- " + i + "\n";
	}
	return returnString;
}


const days = filesObj();
const promptMessage = questionDisplay(days);

// Need to upgrade the layout of the message

while (true){
	console.log("Days of AOC reviewed:\n" + promptMessage);
	let daySelected = prompt("Select a day to review ---> ");

	// Goodbye message if the input is "CTRL + c" or exit
	if (!daySelected || daySelected === "exit") {
		console.log("Goodbye!");
		break;
	}

	if (days[daySelected]) {
		console.log(`The problems are:`)
		for (problem of days[daySelected]) {
			console.log(problem);
		}
	} else {
		console.log("Error");
	}

}
