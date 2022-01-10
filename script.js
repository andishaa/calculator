const displayStatus = document.querySelector('#displayStatus');
const displayHistory = document.querySelector('#displayHistory');
const decimalBtn = document.querySelector('#decimal');
const clearGlobalBtn = document.querySelector('#clearGlobal');
const clearEntryBtn = document.querySelector('#clearEntry');
const backSpaceBtn = document.querySelector('#backSpace');

let memory = '';
let inputNumber = '';
let operationQueued = '';

function init() {
    initNumberBtns();
    initOperationBtns();
    clearGlobal();
    clearEntry();
    backSpaceEraser();
}
init();

const add = (a, b) => a + b;
const subtract = (a, b) => b < 0 ? a - (-b) : a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            let result = add(num1, num2);
            return result;
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        case '=':
            if (operator === operationQueued) {
                return inputNumber;
            } else {
                return operate(operationQueued, num1, num2);
            }
            break;
        default:
            break;
    }
};

function initNumberBtns() {
    const selectedNumber = document.querySelectorAll('.numbers');

    selectedNumber.forEach(btn => {

        btn.addEventListener('click', e => {
            let chosenNumber = '';
            chosenNumber += e.target.textContent;
            numberClicked(chosenNumber);
            displayStatus.textContent = inputNumber;
        });
    });
}

const KEY_NUMBERS = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
]
const KEY_OPERATORS = [
    '*', '/', '.', '-', '+', '=', 'Enter'
]

function keyBoard() {
    document.addEventListener('keydown', event => {
        if (KEY_NUMBERS.includes(event.key)) {
            let chosenNumber = '';
            chosenNumber += event.key;
            numberClicked(chosenNumber);
            displayStatus.textContent = inputNumber;
        }
        if (KEY_OPERATORS.includes(event.key)) {
            let chosenOperator = event.key;
            if (chosenOperator === 'Enter') {
                chosenOperator = '=';
            }
            operationClicked(chosenOperator);
        }
    })
}
keyBoard();

function numberClicked(strNumber) {

    inputNumber += strNumber;

    if (inputNumber.includes('.')) {
        decimalBtn.disabled = true;
    }
}

function initOperationBtns() {

    const selectOperator = document.querySelectorAll('.operators')
    selectOperator.forEach(btn => {
        btn.addEventListener('click', e => {
            let chosenOperator = e.target.textContent;
            operationClicked(chosenOperator);
        });
    });

}

function operationClicked(operator) {
    let operationResult = 0;
    decimalBtn.disabled = false;

    if (operationQueued === '/' && inputNumber === '0') {
        let errMsg = 'Can\'t devide by 0';
        displayStatus.textContent = errMsg;
        inputNumber = '';
        return;
    }

    if (memory !== '' && inputNumber !== '') {

        operationResult = operate(operationQueued, Number(memory), Number(inputNumber));
        memory = operationResult;
    }

    operationQueued = operator;

    if (memory === '' && inputNumber !== '') {
        memory = inputNumber;
    }

    if (!Number.isInteger(memory) && typeof memory !== 'string') {
        memory = memory.toFixed(2);
    }

    inputNumber = '';

    populateDisplay();
}

function populateDisplay() {
    displayStatus.textContent = '';
    if (operationQueued === '=') {
        displayHistory.textContent = memory;
    } else {
        displayHistory.textContent = `${memory} ${operationQueued}`;
    }
}

function clearGlobal() {
    clearGlobalBtn.addEventListener('click', () => {
        inputNumber = '';
        memory = '';
        operationQueued = '';
        displayStatus.textContent = '';
        displayHistory.textContent = '';
        decimalBtn.disabled = false;
    });
}

function clearEntry() {
    clearEntryBtn.addEventListener('click', () => {
        inputNumber = '';
        displayStatus.textContent = '';
        decimalBtn.disabled = false;
    });
}

function backSpaceEraser() {
    backSpaceBtn.addEventListener('click', () => {
        inputNumber = inputNumber.slice(0, inputNumber.length - 1);
        displayStatus.textContent = inputNumber;
    });
}