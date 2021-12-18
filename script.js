let memory = '';
let inputNumber = '';
let operationQueued = '';

function init() {
    initNumberBtns();
    initOperationBtns();
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
            return operate(operationQueued,num1,num2);
            break;
        default:
            break;
    }
};

const displayStatus = document.querySelector('#displayStatus');

function initNumberBtns() {
    const selectedNumber = document.querySelectorAll('.numbers');

    selectedNumber.forEach(btn => {

        btn.addEventListener('click', e => {
            let chosenNumber = '';
            chosenNumber += e.target.textContent;
            numberClicked(chosenNumber);
        });
    });
}

function numberClicked(strNumber) {
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

    if (inputNumber === '0') {
        let errMsg = 'Can\'t devide by 0';
        displayStatus.textContent = errMsg;
        inputNumber = '';
        console.log('cant devide by 0');
        return;
    }

    if (memory !== '' && inputNumber !== '') {
        operationResult = operate(operator, Number(memory), Number(inputNumber));
        memory = operationResult;
    }

    operationQueued = operator;
    
    if (memory === '') {
        memory = inputNumber;
    }


    inputNumber = '';
}