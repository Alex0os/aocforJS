// This file will serve the purpose to execute all the source files and compare
// the results that this were given with the right ones

let testing = {"tomatoes": 5, "apples": 10, "bananas": 3, "pears": 0};

const prompt = require("prompt-sync")({sigint : false});
const firstPart = require("./src_files/Day1/firstPart");

let productsQuestion = "See if we have any fruit/vegetable in our stock -> ";

while (true){
	let product = prompt(productsQuestion);

	if (product == "firstPart"){
		console.log(firstPart());
		continue;
	}

	// Goodbye message if the input is "CTRL + c" or exit
	if (!product || product === "exit") {
		console.log("Goodbye!");
		break;
	}

	if (testing[product.toLowerCase()]){
		console.log(`We have ${testing[product.toLowerCase()]} of them`);
	} else {
		console.log(`We are out of ${product}, sorry!`);
	}
}
