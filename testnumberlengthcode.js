
let inputs = {
    inputA: 123456789,
    inputB: 987654321,
    operator: "x",
}


const displayLength = 13;
let expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
let answer = inputs.inputA * inputs.inputB;

console.log(`expressionPrintout= ${expressionPrintout}`)
console.log(`expressionLength = ${expressionPrintout.toString().length}`)
console.log(`answer = ${answer}`)
console.log(`answerLength = ${answer.toString().length}`)

// THESE WILL BE REQUIRED BY PROGRAM !!! THESE WILL BE REQUIRED BY PROGRAM !!! 





function roundToX(number, decimals) {
    return Math.round(number * (10 ** decimals)) / (10 ** decimals)
}

function scientificNotation(number, decimals) {
    return number.toExponential(decimals);
}

function truncator(number) {
    let truncatedMaxLength = displayLength - 3;
    if (number.toString().length > displayLength && number > 1) {
        console.log(`scientificNotation (large) = ${scientificNotation(number, truncatedMaxLength)}`)
        return scientificNotation(number, truncatedMaxLength);
    } else if (number.toString().length > displayLength && number < 1) {
        console.log(`scientificNotation (small) = ${scientificNotation(number, truncatedMaxLength)}`)
        return roundToX(number, truncatedMaxLength);
    } else {
        console.log("Something has gone wrong with the truncator() function.");
        return number;
    }
}

function lengthCheck(number) {
    if (number.toString().length > displayLength) {
        console.log(`number.toString().length = ${number.toString().length}`)
        truncator(number);
    }
}

function expressionLengthCheck(expressionPrintout) {
    let expressionLength = expressionPrintout.length;
    let newA = inputs.inputA;
    let newB = inputs.inputB;
    console.log(`expressionLength = ${expressionLength}`)

    let halfTruncatedMaxLength = Math.floor((displayLength - 3) / 2);
    console.log(`halfTruncatedMaxLength = ${halfTruncatedMaxLength}`)
    while (expressionLength > displayLength) {
        let firstLength = newA.toString().length;
        let secondLength = newB.toString().length;
        if (firstLength >= secondLength) {
            newA = truncator(newA, halfTruncatedMaxLength);
        } else if (firstLength < secondLength) {
            newB = truncator(newB, halfTruncatedMaxLength);
        };
        expressionPrintout = `${newA} ${inputs.operator} ${newB}`
        expressionLength = expressionPrintout.length;
    };
    console.log(`newA = ${newA} ||||||||| newB = ${newB}`)
    return [newA, newB];
}


console.log(`lengthCheck(inputs.inputA) = ${lengthCheck(inputs.inputA)}`)
console.log(`lengthCheck(inputs.inputB) = ${lengthCheck(inputs.inputB)}`)

console.log(`expressionLengthCheck(expressionPrintout) = ${expressionLengthCheck(expressionPrintout)}`)










