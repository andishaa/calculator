const displayStatus = document.querySelector('#displayStatus');
const displayHistory = document.querySelector('#displayHistory');
const decimalBtn = document.querySelector('#decimal');
const clearGlobalBtn = document.querySelector('#clearGlobal');

let memory = '';
let inputNumber = '';
let operationQueued = '';

function init() {
    initNumberBtns();
    initOperationBtns();
    clearGlobal();
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
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
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

function numberClicked(strNumber) {
    if (inputNumber.includes('.')) {
        decimalBtn.disabled = true;
    }

    inputNumber += strNumber;

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

    displayStatus.textContent = memory;
    displayHistory.textContent = `${memory} ${operationQueued}`;
    inputNumber = '';
}

function clearGlobal() {
    clearGlobalBtn.addEventListener('click', () => {
        inputNumber = '';
        memory = '';
        operationQueued = '';
        displayStatus.textContent = '';
        displayHistory.textContent = '';
    });
}