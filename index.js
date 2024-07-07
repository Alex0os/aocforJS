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
		day = file.split("/")[1];
		if (returnObject[day]) {
			returnObject[day].push(file);
		} else {
			returnObject[day] = [file];
		}
	}
	return returnObject;
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
