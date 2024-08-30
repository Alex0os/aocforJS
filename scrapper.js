 const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

let userName;
let password;

async function getInput(driver, day) {
	const notValid = !day || (0 > parseInt(day) || parseInt(day) > 26)
	if (notValid) {
		console.log("You entered an invalid day number");
		return;
	}

	await driver.get("https://adventofcode.com/2023/day/" + day + "/input");
	const challengeInput = await driver.findElement(By.css("pre")).getText();
	console.log(challengeInput);
}


(async function example() {
	let driver = new Builder()
		.forBrowser(Browser.FIREFOX)
		.build();

	await driver.get("https://adventofcode.com/auth/github");

	const emailInput = await driver.findElement(By.name("login"));
	const passwordInput = await driver.findElement(By.name("password"));
	const submitButton = await driver.findElement(By.name("commit"));

	await emailInput.sendKeys(userName);
	await passwordInput.sendKeys(password);
	await submitButton.click();

	await driver.wait(until.titleIs("Advent of Code 2023"), 10000)
	await getInput(driver, 1);
	await driver.quit();
})();
