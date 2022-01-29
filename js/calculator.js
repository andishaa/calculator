export const CalculatorOperations = {
    MULTIPLY: '*',
    DIVIDE: '/',
    ADD: '+',
    SUBTRACT: '-',
    EQUAL: '=',
    EXECUTE: 'Enter',
    CORRECT: 'Backspace'
};

export class Calculator {
    memory = '';
    operationQueued = '';

    constructor() {
        this.inputNumber = '';
    }

    set inputNumber(number) {
        if (this.inputNumber && this.inputNumber[0] === '0' && this.inputNumber.length === 1 && !this.isNumberDecimal(number)) {
            return;
        }

        this.inputNumber_ = number;
    }

    get inputNumber() {
        return this.inputNumber_;
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }

    operate(operator) {
        const num1 = Number(this.memory);
        const num2 = Number(this.inputNumber);

        if (this.memory === '' && this.inputNumber !== '') {
            this.memory = this.inputNumber;
            this.inputNumber = '';
            this.operationQueued = operator;
            return;
        }

        if (this.memory !== '' && this.inputNumber === '') {
            this.operationQueued = operator;
            return;
        }

        if (this.memory === '' && this.inputNumber === '') {
            this.operationQueued = operator;

            return;
        }

        if (this.memory !== '' && this.operationQueued === '') {
            this.inputNumber = '';
            return;
        }

        let result = 0;

        switch (operator) {
            case CalculatorOperations.ADD:
                result = this.add(num1, num2);
                break;
            case CalculatorOperations.SUBTRACT:
                result = this.subtract(num1, num2);
                break;
            case CalculatorOperations.MULTIPLY:
                result = this.multiply(num1, num2);
                break;
            case CalculatorOperations.DIVIDE:
                result = this.divide(num1, num2);
                break;
            case CalculatorOperations.EQUAL:
                if (operator === this.operationQueued) {
                    result = this.inputNumber;
                } else {
                    return result = this.operate(this.operationQueued);
                }
                break;
        }

        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }

        this.memory = '' + result;
        this.operationQueued = '';
        this.inputNumber = '';
        return result;
    }

    clear() {
        this.inputNumber = '';
        this.memory = '';
        this.operationQueued = '';

    }

    clearEntry() {
        this.inputNumber = '';
    }

    correct() {
        this.inputNumber = this.inputNumber.slice(0, this.inputNumber.length - 1);
    }

    isInputNumberDecimal() {
        return this.isNumberDecimal(this.inputNumber);
    }

    isNumberDecimal(number) {
        return number.includes('.');
    }

    toggleNumberSign(){
        if (calculator.inputNumber.charAt(0) !== '-') {
            calculator.inputNumber = `-${calculator.inputNumber}`
        } else {
            calculator.inputNumber = calculator.inputNumber.slice(1);
        }
    }
}