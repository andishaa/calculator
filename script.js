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
    inputNumber = '';

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

    operate(operator, num1, num2) {
        switch (operator) {
            case CalculatorOperations.ADD:
                let result = this.add(num1, num2);
                return result;
            case CalculatorOperations.SUBTRACT:
                return this.subtract(num1, num2);
            case CalculatorOperations.MULTIPLY:
                return this.multiply(num1, num2);
            case CalculatorOperations.DIVIDE:
                return this.divide(num1, num2);
            case CalculatorOperations.EQUAL:
                if (operator === operationQueued) {
                    return this.inputNumber;
                } else {
                    return this.operate(operationQueued, num1, num2);
                }
        }
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
// let inputNumber = '';
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
                calculator.inputNumber = calculator.inputNumber.slice(0, calculator.inputNumber.length - 1);
                displayStatus.textContent = calculator.inputNumber;
                return;
            }
            operationClicked(chosenOperator);
        }
    })
}

function numberClicked(strNumber) {

    calculator.inputNumber += strNumber;

    if (calculator.inputNumber.includes('.')) {
        decimalBtn.disabled = true;
    }

    if (calculator.inputNumber.charAt(0) === '0' && decimalBtn.disabled === false) {
        calculator.inputNumber = '0';
    }

    displayStatus.textContent = calculator.inputNumber;

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

    if (operationQueued === CalculatorOperations.DIVIDE && calculator.inputNumber === '0') {
        displayStatus.textContent = 'Can\' divide with 0';
        calculator.inputNumber = '';
        return;
    }

    if (memory !== '' && calculator.inputNumber !== '') {

        operationResult = calculator.operate(operationQueued, Number(memory), Number(calculator.inputNumber));
        memory = operationResult;
    }

    operationQueued = operator;

    if (memory === '' && calculator.inputNumber !== '') {
        memory = calculator.inputNumber;
    }

    if (!Number.isInteger(memory) && typeof memory !== 'string') {
        memory = memory.toFixed(2);
    }

    calculator.inputNumber = '';

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
        calculator.inputNumber = '';
        memory = '';
        operationQueued = '';
        displayStatus.textContent = '';
        displayHistory.textContent = '';
        decimalBtn.disabled = false;
    });
}

function clearEntry() {
    clearEntryBtn.addEventListener('click', () => {
        calculator.inputNumber = '';
        displayStatus.textContent = '';
        decimalBtn.disabled = false;
    });
}

function backSpaceEraser() {
    backSpaceBtn.addEventListener('click', () => {
        calculator.inputNumber = calculator.inputNumber.slice(0, calculator.inputNumber.length - 1);
        displayStatus.textContent = calculator.inputNumber;
    });
}

function addRemoveMinus() {
    plusMinusBtn.addEventListener('click', () => {
    
        if(calculator.inputNumber.charAt(0) !== '-') {
            calculator.inputNumber = `-${calculator.inputNumber}`
        } else {
            calculator.inputNumber = calculator.inputNumber.slice(1);
        }
        displayStatus.textContent = calculator.inputNumber;
    });
}