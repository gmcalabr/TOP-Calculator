
const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const power = (a, b) => (a ** b);

let inputA 
let inputB
let operator

const buttons = document.querySelectorAll('button');
const expressionScreen = document.getElementById("expressionScreen");
const answerScreen = document.querySelector('answerScreen');

function enter(inputA, inputB, operator) {
    // launch calculation
}


// subfunctions________________________________________________
function clearOperators() {
    const operatorButtons = document.getElementsByClassName('operator');
    for (let operatorButton of operatorButtons) {
        operatorButton.classList.toggle('highlighted', false);
        // console.log(operatorButton.classList)
        // console.log(`${operatorButton.innerHTML} [[[off]]]`)
    }
}

function highlightOperator(buttonPress) {
    const operatorButtons = document.getElementsByClassName('operator');
    for (let operatorButton of operatorButtons) {    
        if (operatorButton.innerHTML == buttonPress.text) {
            operatorButton.classList.toggle('highlighted', true);
            // console.log(`${operatorButton.innerHTML} [[[on]]]`)
            // console.log(operatorButton.classList)
        }
    }
}

// subfunctions________________________________________________

// button press functions______________________________________

function pushExpressionScreen(buttonPress) {
    let readout = expressionScreen.innerHTML;
    readout = readout + buttonPress.text;
    // console.log(readout);
    expressionScreen.innerHTML = readout;
}

function expressionButton(buttonPress) {
    clearOperators();
    highlightOperator(buttonPress);

}

function pushAnswerScreen(buttonPress) {
    
}

function clearExpressionScreen() {
    expressionScreen.innerHTML = "";
}

function clearAnswerScreen(buttonPress) {
    
}

function clearData() {
    
}

// button press functions________________________________________

function determineAction(buttonPress) {
        // console.log('Button clicked: ', buttonPress.text)
        // console.log('Button class: ', buttonPress.type)

        if (buttonPress.type == "number") {
            pushExpressionScreen(buttonPress);
        } else if (buttonPress.type == "special") {
            pushExpressionScreen(buttonPress);
        } else if (buttonPress.type == "operator") {
            expressionButton(buttonPress);
        } else if (buttonPress.type == "clear") {
            clearExpressionScreen();
        } else if (buttonPress.type == "backspace") {

        } else if (buttonPress.type == "enter") {

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