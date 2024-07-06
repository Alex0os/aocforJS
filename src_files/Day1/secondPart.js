const numsWords = {
	"one" : "1",
	"two" : "2",
	"three" : "3",
	"four" : "4",
	"five" : "5",
	"six" : "6",
	"seven" : "7",
	"eight" : "8",
	"nine" : "9"
};

const fs = require("fs");
const data = fs.readFileSync('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/Day1/secondPart.txt', 'utf8');

function travelNumsWords(numsObject, line){
	for (word in numsWords){
		if (line.includes(word)) {
			if (numsObject.num1) {
				console.log(numsObject.num1)
				numsObject.num2 = numsWords[word];
				continue;
			}
			numsObject.num1 = numsWords[word];
		}
	}

	if (numsObject.num1 && numsObject.nums2){
		//console.log(numsObject.num1 + numsObject.num2);
		numsObject.result += Number(numsObject.num1 + numsObject.num2);
		numsObject.num1 = undefined;
		numsObject.num2 = undefined;
	} else if (numsObject.num1 && !numsObject.nums2) {
		//console.log(numsObject.num1 + numsObject.num1);
		numsObject.result += Number(numsObject.num1 + numsObject.num1);
		numsObject.num1 = undefined;
		numsObject.num2 = undefined;
	}
}

function getNumsFromWords(){
	let nums = {
		result : 0,
		num1 : undefined,
		num2 : undefined,
	}

	let line = "";
	for (char of data){
		if (char === "\n"){
			travelNumsWords(nums, line);
			line = "";
			continue;
		}

		line += char;
	}

	return nums.result;
}

console.log(getNumsFromWords());
// Me da 154, lo cual es un resultado incorrecto
