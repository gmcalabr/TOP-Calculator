// Declaration Section !!! Declaration Section !!! Declaration Section !!! Declaration Section !!! 

let inputs = {
    inputA: undefined,
    inputB: undefined,
    operator: undefined,
};

const upperDisplay = document.getElementById("upperDisplay");
const lowerDisplay = document.getElementById("lowerDisplay");
const display = document.querySelectorAll('display');
const upperDisplayLengthMax = 26;
const upperDisplayLengthMin = 14;
const lowerDisplayLengthMax = 17;
const lowerDisplayLengthMin = 9;
let upperDisplayLength = upperDisplayLengthMax;
let lowerDisplayLength = lowerDisplayLengthMax;

const buttons = document.querySelectorAll('button');
let newNum = false;

const add = (a, b) => (Number(a) + Number(b));
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const power = (a, b) => (a ** b);

// Declaration Section !!! Declaration Section !!! Declaration Section !!! Declaration Section !!! 
// Display Length Functions Section !!!!!!!!!!!!!! Display Length Functions Section !!!!!!!!!!!!!!

function resizeDisplay (width) {
    upperDisplay.style.maxWidth = `${width}px`;
    lowerDisplay.style.maxWidth = `${width}px`;
}

function roundToX(number, decimals) {
    number = parseFloat(number);
    return Math.round(number * (10 ** decimals)) / (10 ** decimals)
}

function scientificNotation(number, decimals) {
    number = parseFloat(number);
    if (decimals >= 100 || decimals <=0 ) {
        return number;
    } else {
        return number.toExponential(decimals);
    }
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
        return number;
    }
}

function generateExpression() {

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

// Display Length Functions Section !!!!!!!!!!!!!! Display Length Functions Section !!!!!!!!!!!!!!
// SubFunctions Section !!! SubFunctions Section !!! SubFunctions Section !!! SubFunctions Section ! 

function clearLowerDisplay() {
    lowerDisplay.innerHTML = "";
    clearOperators();
    newNum = false;
}

function clearOperators() {
    inputs.operator = undefined;
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.classList.toggle('highlighted', false);
    });
}

function clearUpperDisplay(buttonPress) {
    upperDisplay.innerHTML = "";
}

function doMath(inputs) {
    let answer;
    if (inputs.inputB == 0 && inputs.operator == "/") {
        let message = "You broke it. You know what you did...";
        return message;
    }
    if (inputs.operator == "/") {
        answer = divide(inputs.inputA, inputs.inputB)
    } else if (inputs.operator == "x") {
        answer = multiply(inputs.inputA, inputs.inputB)
    } else if (inputs.operator == "-") {
        answer = subtract(inputs.inputA, inputs.inputB)
    } else if (inputs.operator == "+") {
        answer = add(inputs.inputA, inputs.inputB)
    };
    
    return answer;
}

function generateRandom() {
    let randomNumber = roundToX(Math.random(), 10);
    return randomNumber
}

function highlightOperator(buttonPress) {
    inputs.operator = buttonPress.text;
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {    
        button.classList.toggle('highlighted', button.innerHTML == buttonPress.text);
    });
}

function pushLowerDisplay(str) {
    let readout = lowerDisplay.innerHTML;
    if (newNum) readout = "";
    if (readout === "" && str == ".") {
        str = "0."
    }
    readout = readout + str;
    lowerDisplay.innerHTML = readout;
    newNum = false;
}

// SubFunctions Section !!! SubFunctions Section !!! SubFunctions Section !!! SubFunctions Section !
// Button Functions Section !!!!!! Button Functions Section !!!!!! Button Functions Section !!!!!!

function clearButton() {
    clearLowerDisplay();
    clearUpperDisplay();

    for (let key in inputs) {
        inputs[key] = undefined;
    }

    newNum = false;
}

function equals() {

    let readout = lowerDisplay.innerHTML;
    inputs.inputB = readout;

    if (inputs.inputA && inputs.inputB && inputs.operator && newNum == false) {
        newNum = true;

        let expressionPrintout = generateExpression();
        upperDisplay.innerHTML = expressionPrintout;

        let answer = doMath(inputs);

        inputs.inputA = answer;
        inputs.inputB = undefined;
        inputs.operator = undefined;

        answer = truncate(answer);
        pushLowerDisplay(answer);

        clearOperators();
    }
}

function numberButton(str) {
    let readout = lowerDisplay.innerHTML;
    if (str === "." && lowerDisplay.innerHTML.includes(".") && !newNum) {
        console.log("hi");
        str = "";
    }
    pushLowerDisplay(str);
}

function operatorButton(buttonPress) {

    let readout = lowerDisplay.innerHTML;

    if (inputs.operator) {
        clearOperators();
        highlightOperator(buttonPress);
    } else if (readout && !inputs.operator) {
        clearOperators();
        highlightOperator(buttonPress);
        inputs.inputA = readout;
        newNum = true
    }
}

function specialButton(string) {

    if (string == "BS") {
        let readout = lowerDisplay.innerHTML;
        if (readout) {
            readout = readout.slice(0, -1);
            lowerDisplay.innerHTML = readout;
        }

    } else if (string == "+/-") {
        let readout = lowerDisplay.innerHTML;
        if (!newNum) {
            if (readout.charAt(0) != "-") {
                readout = `-${readout}`
                lowerDisplay.innerHTML = readout;
            } else {
                readout = readout.slice(0 + 1);
                lowerDisplay.innerHTML = readout;
            }
        }
    } else if (string == "Rand") {
        let readout = generateRandom();
        lowerDisplay.innerHTML = readout;
    }
}

// Button Functions Section !!!!!! Button Functions Section !!!!!! Button Functions Section !!!!!!
// Main functions !!! Main functions !!! Main functions !!! Main functions !!! Main functions !!! 

function determineAction(buttonPress) {
        if (buttonPress.type == "number") {
            numberButton(buttonPress.text);
        } else if (buttonPress.type == "clear") {
            clearButton();
        } else if (buttonPress.type == "equals") {
            equals();
        } else if (buttonPress.type == "operator") {
            operatorButton(buttonPress);
        } else if (buttonPress.type == "special") {
            specialButton(buttonPress.text);
        }
}

function keyConverter(key) {
    const conversionMap = {
        "Backspace": "BS",
        "Escape": "AC",
        "Enter": "=",
        "*": "x",
        ",": ".",
    };
    return conversionMap[key] || key;
}

function operateKey(key) {
    const relevantKeys = ["Backspace", "Escape", "Enter", "*", ","];
    if (relevantKeys.includes(key)) {
        key = keyConverter(key);
    }

    buttons.forEach(button => {
        if (button.innerHTML == key) {
            button.click();
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 150);
        }
    })
}

buttons.forEach(button => {
    button.addEventListener("click", function() {
        buttonPress = {
            text: this.innerHTML,
            type: this.className,
        }        
        determineAction(buttonPress);
    });
})

document.addEventListener('keydown', (event) => {
    let key = event.key;
    operateKey(key);
});

const container = document.getElementById('display-row');
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width >= 360) {
            upperDisplayLength = upperDisplayLengthMax;
            lowerDisplayLength = lowerDisplayLengthMax;
            resizeDisplay(width);
        } else if (width < 360 && width > 193.5) {
            let ratio = (width - 193.5) / (360 - 193.5);
            upperDisplayLength = Math.round(upperDisplayLengthMin + ratio * (upperDisplayLengthMax - upperDisplayLengthMin));
            lowerDisplayLength = Math.round(lowerDisplayLengthMin + ratio * (lowerDisplayLengthMax - lowerDisplayLengthMin));
            resizeDisplay(width);
        } else {
            upperDisplayLength = upperDisplayLengthMin;
            lowerDisplayLength = lowerDisplayLengthMin;
            resizeDisplay(width);
        }
    }
});
  
resizeObserver.observe(container);

// Main functions !!! Main functions !!! Main functions !!! Main functions !!! Main functions !!! 

