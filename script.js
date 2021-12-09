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