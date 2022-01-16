const KEY_NUMBERS = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
];

const CalculatorOperations = {
    MULTIPLY: '*',
    DIVIDE: '/',
    ADD: '+',
    SUBTRACT: '-',
    EQUAL: '=',
    EXECUTE: 'Enter',
    CORRECT: 'Backspace'
};

class Calculator {
    add(a, b){
        return a + b;
    }

    subtract(a, b){
        return a - b;
    }

    multiply(a, b){
        return a * b;
    }

    divide(a, b){
        return a / b;
    }
}

const calculator = new Calculator()

const displayStatus = document.querySelector('#displayStatus');
const displayHistory = document.querySelector('#displayHistory');
const decimalBtn = document.querySelector('#decimal');
const clearGlobalBtn = document.querySelector('#clearGlobal');
const clearEntryBtn = document.querySelector('#clearEntry');
const backSpaceBtn = document.querySelector('#backSpace');
const plusMinusBtn = document.querySelector('#plusMinus');

let memory = '';
let inputNumber = '';
let operationQueued = '';

function init() {
    initNumberBtns();
    initOperationBtns();
    clearGlobal();
    clearEntry();
    backSpaceEraser();
    keyBoard();
    addRemoveMinus();
}
init();

function operate(operator, num1, num2) {
    switch (operator) {
        case CalculatorOperations.ADD:
            let result = calculator.add(num1, num2);
            return result;
        case CalculatorOperations.SUBTRACT:
            return calculator.subtract(num1, num2);
        case CalculatorOperations.MULTIPLY:
            return calculator.multiply(num1, num2);
        case CalculatorOperations.DIVIDE:
            return calculator.divide(num1, num2);
        case CalculatorOperations.EQUAL:
            if (operator === operationQueued) {
                return inputNumber;
            } else {
                return operate(operationQueued, num1, num2);
            }
    }
};

function initNumberBtns() {
    const selectedNumber = document.querySelectorAll('.numbers');

    selectedNumber.forEach(btn => {

        btn.addEventListener('click', e => {
            let chosenNumber = e.target.textContent;
            numberClicked(chosenNumber);
        });
    });
}

function keyBoard() {
    document.addEventListener('keydown', event => {
        if (KEY_NUMBERS.includes(event.key)) {
            let chosenNumber = event.key;
            numberClicked(chosenNumber);
        }

        let operatorValues = new Set(Object.values(CalculatorOperations));
        if (operatorValues.has(event.key)) {
            let chosenOperator = event.key;
            if (chosenOperator === CalculatorOperations.EXECUTE) {
                chosenOperator = CalculatorOperations.EQUAL;
            }
            if (chosenOperator === CalculatorOperations.CORRECT) {
                inputNumber = inputNumber.slice(0, inputNumber.length - 1);
                displayStatus.textContent = inputNumber;
                return;
            }
            operationClicked(chosenOperator);
        }
    })
}

function numberClicked(strNumber) {

    inputNumber += strNumber;

    if (inputNumber.includes('.')) {
        decimalBtn.disabled = true;
    }

    if (inputNumber.charAt(0) === '0' && decimalBtn.disabled === false) {
        inputNumber = '0';
    }

    displayStatus.textContent = inputNumber;

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

    if (operationQueued === CalculatorOperations.DIVIDE && inputNumber === '0') {
        displayStatus.textContent = 'Can\' divide with 0';
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
    if (operationQueued === CalculatorOperations.EQUAL) {
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

function addRemoveMinus() {
    plusMinusBtn.addEventListener('click', () => {
    
        if(inputNumber.charAt(0) !== '-') {
            inputNumber = `-${inputNumber}`
        } else {
            inputNumber = inputNumber.slice(1);
        }
        displayStatus.textContent = inputNumber;
    });
}