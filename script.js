
const add = (a, b) => a + b;

const subtract = (a, b) => b < 0 ? a - (-b) : a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
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
        default:
            break;
    }
};

//Display and store selected number
const displayStatus = document.querySelector('#displayStatus');

let inputNumber = '';
const numberBtn = document.querySelectorAll('.number');
numberBtn.forEach(item => {
    item.addEventListener('click', e => {
        inputNumber += e.target.textContent;
        displayStatus.textContent = inputNumber;
        inputNumber = Number(inputNumber);
    });
});