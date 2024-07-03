// This file will serve the purpose to execute all the source files and compare
// the results that this were given with the right ones

let testing = {"tomatoes": 5, "apples": 10, "bananas": 3, "pears": 0};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let productsQuestion = "See if we have any fruit/vegetable in our stock -> ";

function askQuestion(){

	// Ask for the fruit/vegetable that they're looking for
	rl.question(productsQuestion, product => {
		if (testing[product.toLowerCase()]) {
			console.log(`We have ${testing[product.toLowerCase()]} of them`);
			askQuestion()
		} else {
			console.log(`We are out of ${product}, sorry!`);
			askQuestion();
		}
	});

	// Print a message when the users press "CTRL + c" to exit
	rl.on('SIGINT', () => {
		console.log("\nbye bye");
		rl.close();
	});
}

askQuestion();
