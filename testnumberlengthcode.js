
let inputs = {
    inputA: 0,
    inputB: 0,
    operator: "x",
}

const lowerDisplayLength = 17;
const upperDisplayLength = 26;
let expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
let answer = inputs.inputA * inputs.inputB;

// THESE WILL BE REQUIRED BY PROGRAM !!! THESE WILL BE REQUIRED BY PROGRAM !!! 

function roundToX(number, decimals) {
    number = parseFloat(number);
    return Math.round(number * (10 ** decimals)) / (10 ** decimals)
}

function scientificNotation(number, decimals) {
    number = parseFloat(number);
    return number.toExponential(decimals);
}

function truncate(number, truncatedMaxLength = lowerDisplayLength) {
    if (number.toString().length < truncatedMaxLength) {
        return number;
    } else if (number.toString().length > truncatedMaxLength && number > 10000) {
        return scientificNotation(number, truncatedMaxLength - 6);
    } else if (number.toString().length > truncatedMaxLength && number <= 10000 && number >= 0.00001) {
        return roundToX(number, (truncatedMaxLength - 2));
    } else if (number.toString().length > truncatedMaxLength && number < 0.00001) {
        return scientificNotation(number, truncatedMaxLength - 5);
    } else {
        console.log("ERR")
        return number;
    }
}

function truncateExpression() {

    let expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
    let newA = inputs.inputA, newB = inputs.inputB, counter = 0;
    let truncatedMaxLength = Math.floor((upperDisplayLength - 3) / 2);
    
    while (expressionPrintout.length >= upperDisplayLength) {
        
        counter += 1;
        if (counter > 5) break;

        let newALength = newA.toString().length;
        let newBLength = newB.toString().length;

        if (newALength >= newBLength) {
            newA = truncate(newA, truncatedMaxLength);
        } else if (newALength < newBLength) {
            newB = truncate(newB, truncatedMaxLength);
        };
        
        expressionPrintout = `${newA} ${inputs.operator} ${newB}`
        expressionLength = expressionPrintout.length;
    };

    return `${newA} ${inputs.operator} ${newB}`
}





// inputs = {
//     inputA: 123456789,
//     inputB: 987654321,
//     operator: "x",
// }

// expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
// answer = inputs.inputA * inputs.inputB;
// newPrintout = truncateExpression(expressionPrintout);

// console.log(`AAAAAtruncateExpression(expressionPrintout) = ${newPrintout}`)






// inputs = {
//     inputA: 0.123456789,
//     inputB: 0.987654321,
//     operator: "/",
// }

// expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
// answer = inputs.inputA / inputs.inputB;

// console.log(`AAAAAtruncate(inputs.inputA) = ${truncate(inputs.inputA)}`)
// console.log(`AAAAAtruncate(inputs.inputB) = ${truncate(inputs.inputB)}`)
// console.log(`AAAAAtruncate(answer) = ${truncate(answer)}`)
// console.log(`AAAAAtruncateExpression(expressionPrintout) = ${truncateExpression(expressionPrintout)}`)







// inputs = {
//     inputA: 0.00000123456789,
//     inputB: 0.00000987654321,
//     operator: "/",
// }

// expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
// answer = inputs.inputA / inputs.inputB;

// console.log(`AAAAAtruncate(inputs.inputA) = ${truncate(inputs.inputA)}`)
// console.log(`AAAAAtruncate(inputs.inputB) = ${truncate(inputs.inputB)}`)
// console.log(`AAAAAtruncate(answer) = ${truncate(answer)}`)
// console.log(`AAAAAtruncateExpression(expressionPrintout) = ${truncateExpression(expressionPrintout)}`)







// inputs = {
//     inputA: 1234567890123456,
//     inputB: 5,
//     operator: "x",
// }

// expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
// answer = inputs.inputA * inputs.inputB;

// console.log(`AAAAAtruncate(inputs.inputA) = ${truncate(inputs.inputA)}`)
// console.log(`AAAAAtruncate(inputs.inputB) = ${truncate(inputs.inputB)}`)
// console.log(`AAAAAtruncate(answer) = ${truncate(answer)}`)
// console.log(`AAAAAtruncateExpression(expressionPrintout) = ${truncateExpression(expressionPrintout)}`)














// let lowerDisplayLength = 13;

// function roundToX(number, decimals) {
//     return Math.round(number * (10 ** decimals)) / (10 ** decimals)
// }

// function scientificNotation(number, decimals) {
//     return number.toExponential(decimals);
// }

// function truncate(number) {
//     let truncatedMaxLength = lowerDisplayLength - 7;
//     if (number.toString().length > lowerDisplayLength && number > 10000) {
//         // console.log(`scientificNotation(large) = ${scientificNotation(number, truncatedMaxLength)}`)
//         return scientificNotation(number, truncatedMaxLength);
//     } else if (number.toString().length > lowerDisplayLength && number <= 10000 && number >= 0.00001) {
//         // console.log(`roundToX(number) = ${roundToX(number, truncatedMaxLength)}`)
//         return roundToX(number, (truncatedMaxLength + 5));
//     } else if (number.toString().length > lowerDisplayLength && number < 0.00001) {
//         // console.log(`scientificNotation (small) = ${scientificNotation(number, truncatedMaxLength)}`)
//         return scientificNotation(number, truncatedMaxLength);
//     } else {
//         // console.log("No Truncation Necessary");
//         return number;
//     }
// }


// let testVeryLargeNumber = 1234567890123456789;
// let testVeryLargeNumberTruncated = truncate(testVeryLargeNumber);
// console.log(`testVeryLargeNumberTruncated = ${testVeryLargeNumberTruncated}`);

// let testLargeNumber = 123456;
// let testLargeNumberTruncated = truncate(testLargeNumber);
// console.log(`testLargeNumberTruncated = ${testLargeNumberTruncated}`);

// let testMediumNumber = 123.4567890123456;
// let testMediumNumberTruncated = truncate(testMediumNumber);
// console.log(`testMediumNumberTruncated = ${testMediumNumberTruncated}`);

// let testSmallNumber = 0.01234567890123456789;
// let testSmallNumberTruncated = truncate(testSmallNumber);
// console.log(`testSmallNumberTruncated = ${testSmallNumberTruncated}`);

// let testVerySmallNumber = 0.0000000000000001234567890123456789;
// let testVerySmallNumberTruncated = truncate(testVerySmallNumber);
// console.log(`testVerySmallNumberTruncated = ${testVerySmallNumberTruncated}`);










// const lowerDisplayLength = 17;

// function roundToX(number, decimals) {
//     number = parseFloat(number);
//     return Math.round(number * (10 ** decimals)) / (10 ** decimals)
// }

// function scientificNotation(number, decimals) {
//     number = parseFloat(number);
//     return number.toExponential(decimals);
// }

// function truncate(number, truncatedMaxLength = lowerDisplayLength) {
//     if (number.toString().length < truncatedMaxLength) {
//         return number;
//     } else if (number.toString().length > truncatedMaxLength && number > 10000) {
//         return scientificNotation(number, truncatedMaxLength - 6);
//     } else if (number.toString().length > truncatedMaxLength && number <= 10000 && number >= 0.00001) {
//         return roundToX(number, (truncatedMaxLength - 2));
//     } else if (number.toString().length > truncatedMaxLength && number < 0.00001) {
//         return scientificNotation(number, truncatedMaxLength - 5);
//     } else {
//         console.log("ERR")
//         return number;
//     }
// }


// let input = 0.12345678901234568;
// let inputLength = input.toString().length;
// let answer = truncate(input);
// let answerLength = answer.toString().length;
// console.log(`The full length input is: ${input}`)
// console.log(`The truncated answer is: ${answer}`)
// console.log(`The full input length is: ${inputLength}`)
// console.log(`The answer length is: ${answerLength}`)



