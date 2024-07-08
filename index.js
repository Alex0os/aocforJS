const execCommand = require("child_process").execSync;
const prompt = require("prompt-sync")({sigint : false});

function filesObj() {
	const returnObject = {};
	let srcFiles = execCommand('find src_files/ -name "*.js" -type f', {encoding: "utf8"}).split("\n")
	// Last element is an empty string that the "execComand()" returns by default
	srcFiles = srcFiles.slice(0, -1);

	if (!srcFiles) {
		console.log("There are no days completed");
		return;
	}

	for (file of srcFiles) {
		const route = file.split("/");
		let day = route[1];
		let problem = route[2];
		if (returnObject[day]) {
			returnObject[day].push(problem);
		} else {
			returnObject[day] = [problem];
		}
	}
	return returnObject;
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

	console.log(`The problems are:`)
	console.log("\n*********************************")

	for (let i = 0; i < files.length; i++){
		console.log(String(i + 1) + "-> " + files[i]);
	}
	console.log("*********************************\n")

	let input = prompt("Select a file to review: ");

	if (files.includes(input)){
		console.log(execCommand(`ls -l "src_files/${day}/${input}"`, {encoding: "utf8"}));
	}
	else {
		console.log("Error");
	}
}


const days = filesObj();
const promptMessage = questionDisplay(days);


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
		console.log("Error");
	}
}
