// Me da como resultado undefined

//import { readFileSync} from "fs"; 
// Requiere configuración adicional desde package.json, debido a que las
// parecen tener acceso solamente a un convenio de modulos

const fs = require("fs");
const readFile = fs.readFileSync;

// Quiero aprender sobre promesas y programación asincrona en JS para poder
// usar promesas y que la función me devuelva un valor

// "readFile" es una función asincrona, el console.log() al final se ejecuta
// antes de que la función pueda devolver los datos correspondientes;

// readFileSyn es la versión sincrona de la función mencionada anteriormente

let data = readFile('/home/Matixannder/Desktop/AdventOfCode/JS/input_files/calibrationDoc.txt', 'utf8');


function getNumsResult() {
	let result = 0;
	let arrayNums = []

	let firstNum;
	let secondNum;

	for (char of data){
		if ((char === '\n') && (!secondNum)){
			arrayNums.push(firstNum + firstNum);
			firstNum = undefined;
		} else if ((char === '\n') && (secondNum)){
			arrayNums.push(firstNum + secondNum);
			firstNum = undefined;
			secondNum = undefined;
		}

		if ((char >= '0' && char <= '9') && (firstNum)){
			secondNum = char;
		} else if ((char >= '0' && char <= '9') && (!firstNum)){
			firstNum = char;
		}
	}

	arrayNums.map((num) => result += Number(num));
	return result;
}

module.exports = getNumsResult;
