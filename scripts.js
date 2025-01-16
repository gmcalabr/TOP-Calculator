
const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const power = (a, b) => (a ** b);

let inputA 
let inputB
let operator
let inputs = {
    inputA: undefined,
    inputB: undefined,
    operator: undefined,
};
let answer
let newNum = false;

const buttons = document.querySelectorAll('button');
const expressionScreen = document.getElementById("expressionScreen");
const inputsScreen = document.querySelector('inputsScreen');





// subfunctions________________________________________________
function clearOperators() {
    inputs.operator = undefined;
    const operatorButtons = document.getElementsByClassName('operator');
    for (let operatorButton of operatorButtons) {
        operatorButton.classList.toggle('highlighted', false);
        // console.log(operatorButton.classList)
        // console.log(`${operatorButton.innerHTML} [[[off]]]`)
    }
}

function highlightOperator(buttonPress) {
    inputs.operator = buttonPress.text;
    const operatorButtons = document.getElementsByClassName('operator');
    for (let operatorButton of operatorButtons) {    
        if (operatorButton.innerHTML == buttonPress.text) {
            operatorButton.classList.toggle('highlighted', true);
            // console.log(`${operatorButton.innerHTML} [[[on]]]`)
            // console.log(operatorButton.classList)
            // console.log(inputs.operator);
        }
    }
}

function doMath(inputs) {
    if (inputs.operator == "/") {
        answer = divide(inputs.inputA, inputs.inputB)
    } else if (inputs.operator == "x") {
        answer = multiply(inputs.inputA, inputs.inputB)
    } else if (inputs.operator == "-") {
        answer = subtract(inputs.inputA, inputs.inputB)
    } else if (inputs.operator == "+") {
        answer = add(inputs.inputA, inputs.inputB)
    };
    console.log(answer);
    clearExpressionScreen();
    pushExpressionScreen(answer);
}
// subfunctions________________________________________________





// button press functions______________________________________

function pushExpressionScreen(num) {
    let readout = expressionScreen.innerHTML;
    if (newNum) readout = "";
    readout = readout + num;
    // console.log(readout);
    expressionScreen.innerHTML = readout;
    newNum = false;
    // console.log(newNum);
}

function operatorButton(buttonPress) {
    clearOperators();
    highlightOperator(buttonPress);
    let readout = expressionScreen.innerHTML;
    inputs.inputA = readout;
    // console.log(`inputA = ${inputs.inputA}`);
    newNum = true;
    // console.log(newNum);
}

function pushinputsScreen(buttonPress) {

    newNum = false;
}

function clearExpressionScreen() {
    expressionScreen.innerHTML = "";
    clearOperators();
    newNum = false;

}

function clearinputsScreen(buttonPress) {
    
}

function clearData() {
    
}

function equals() {
    newNum = false;
    let readout = expressionScreen.innerHTML;
    inputs.inputB = readout;
    console.table(inputs);
    doMath(inputs);
}

// button press functions________________________________________







function determineAction(buttonPress) {
        // console.log('Button clicked: ', buttonPress.text)
        // console.log('Button class: ', buttonPress.type)

        if (buttonPress.type == "number") {
            pushExpressionScreen(buttonPress.text);
        } else if (buttonPress.type == "special") {

        } else if (buttonPress.type == "operator") {
            operatorButton(buttonPress);
        } else if (buttonPress.type == "clear") {
            clearExpressionScreen();
        } else if (buttonPress.type == "backspace") {

        } else if (buttonPress.type == "enter") {
            equals();
        }      
}

buttons.forEach(button => {
    button.addEventListener("click", function() {
        buttonPress = {
            text: this.innerHTML,
            type: this.className,
        }
        // console.log('Button clicked: ', buttonPress.text)
        // console.log('Button class: ', buttonPress.type)
        
        determineAction(buttonPress);
    })
})