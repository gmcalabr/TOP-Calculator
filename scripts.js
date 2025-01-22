
const add = (a, b) => (Number(a) + Number(b));
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const power = (a, b) => (a ** b);

let inputs = {
    inputA: undefined,
    inputB: undefined,
    operator: undefined,
};

let newNum = false;

const buttons = document.querySelectorAll('button');
const upperDisplay = document.getElementById("upperDisplay");
const lowerDisplay = document.getElementById("lowerDisplay");
const display = document.querySelectorAll('display');



// NEW SECTION$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



function clearOperators() {
    inputs.operator = undefined;
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.classList.toggle('highlighted', false);
    });
}

function highlightOperator(buttonPress) {
    inputs.operator = buttonPress.text;
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {    
        button.classList.toggle('highlighted', button.innerHTML == buttonPress.text);
    });
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

    let answerLength = answer.toString().length;
    let decimals = 10;
    if (answerLength > 12) {
        decimals = decimals - (answerLength - 15);
    }

    return roundToX(answer, decimals);
}

function pushlowerDisplay(str) {
    let readout = lowerDisplay.innerHTML;
    if (newNum) readout = "";
    readout = readout + str;
    lowerDisplay.innerHTML = readout;
    newNum = false;
}

function clearlowerDisplay() {
    lowerDisplay.innerHTML = "";
    clearOperators();
    newNum = false;
}

function clearupperDisplay(buttonPress) {
    upperDisplay.innerHTML = "";
}

function generateRandom() {
    let randomNumber = roundToX(Math.random(), 10);
    return randomNumber
}

function roundToX(num, decimals) {
    return Math.round(num * (10 ** decimals)) / (10 ** decimals);
}


// NEW SECTION$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




function clearButton() {
    clearlowerDisplay();
    clearupperDisplay();

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
    
        let expressionPrintout = `${inputs.inputA} ${inputs.operator} ${inputs.inputB}`
        upperDisplay.innerHTML = expressionPrintout;
        let answer = doMath(inputs);
    
        pushlowerDisplay(answer);
        inputs.inputA = answer;
        inputs.inputB = undefined;
        inputs.operator = undefined;
    
        clearOperators();
    }
}

function operatorButton(buttonPress) {

    let readout = lowerDisplay.innerHTML;
    if (readout) {    
        clearOperators();
        highlightOperator(buttonPress);
        inputs.inputA = readout;
        newNum = true;
    };
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



// NEW SECTION$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



function determineAction(buttonPress) {
        if (buttonPress.type == "number") {
            pushlowerDisplay(buttonPress.text);
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
    };
    return conversionMap[key] || key;
}

function operateKey(key) {
    const relevantKeys = ["Backspace", "Escape", "Enter", "*"];
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
