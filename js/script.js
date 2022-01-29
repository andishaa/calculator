import { Calculator, CalculatorOperations } from "./calculator.js";

const KEY_NUMBERS = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
];

const calculator = new Calculator();

const displayStatus = document.querySelector('#displayStatus');
const displayHistory = document.querySelector('#displayHistory');
const decimalBtn = document.querySelector('#decimal');
const clearGlobalBtn = document.querySelector('#clearGlobal');
const clearEntryBtn = document.querySelector('#clearEntry');
const backSpaceBtn = document.querySelector('#backSpace');
const plusMinusBtn = document.querySelector('#plusMinus');

function init() {
    const renderer = new UIRenderer();
    renderer.initialRender();
}

class UIRenderer {
    initialRender(){
        this.initNumberBtns();
        this.initOperationBtns();
        this.setUpClearGlobalBtn();
        this.setUpClearEntryButton();
        this.setUpBackSpaceEraserBtn();
        this.setUpKeyBoard();
        this.setUpToggleNumberSignBtn();
    }
    
    initNumberBtns() {
        const selectedNumber = document.querySelectorAll('.numbers');
    
        selectedNumber.forEach(btn => {
    
            btn.addEventListener('click', e => {
                let chosenNumber = e.target.textContent;
                this.numberClicked(chosenNumber);
            });
        });
    }

    setUpKeyBoard() {
        document.addEventListener('keydown', event => {
            if (KEY_NUMBERS.includes(event.key)) {
                let chosenNumber = event.key;
                this.numberClicked(chosenNumber);
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
                this.operationClicked(chosenOperator);
            }
        })
    }

    numberClicked(strNumber) {

        calculator.inputNumber += strNumber;
    
        if (calculator.isInputNumberDecimal()) {
            decimalBtn.disabled = true;
        }
    
        displayStatus.textContent = calculator.inputNumber;
    }

    initOperationBtns() {

        const selectOperator = document.querySelectorAll('.operators')
        selectOperator.forEach(btn => {
            btn.addEventListener('click', e => {
                let chosenOperator = e.target.textContent;
                this.operationClicked(chosenOperator);
            });
        });
    
    }

    operationClicked(operator) {
        decimalBtn.disabled = false;
    
        if (calculator.operationQueued === CalculatorOperations.DIVIDE && calculator.inputNumber === '0') {
            displayStatus.textContent = 'Can\' divide with 0';
            calculator.inputNumber = '';
            return;
        }
    
        calculator.operate(operator);
    
        this.populateDisplay();
    }

    populateDisplay() {
        displayStatus.textContent = '';
        if (calculator.operationQueued === CalculatorOperations.EQUAL) {
            displayHistory.textContent = calculator.memory;
        } else {
            displayHistory.textContent = `${calculator.memory} ${calculator.operationQueued}`;
        }
    }

    setUpClearGlobalBtn() {
        clearGlobalBtn.addEventListener('click', () => {
            calculator.clear();
            displayStatus.textContent = '';
            displayHistory.textContent = '';
            decimalBtn.disabled = false;
        });
    }

    setUpClearEntryButton() {
        clearEntryBtn.addEventListener('click', () => {
            calculator.clearEntry();
            displayStatus.textContent = '';
            decimalBtn.disabled = false;
        });
    }

    setUpBackSpaceEraserBtn() {
        backSpaceBtn.addEventListener('click', () => {
            calculator.correct();
            displayStatus.textContent = calculator.inputNumber;
        });
    }

    setUpToggleNumberSignBtn() {
        plusMinusBtn.addEventListener('click', () => {
            calculator.toggleNumberSign()
            displayStatus.textContent = calculator.inputNumber;
        });
    }
}

init();