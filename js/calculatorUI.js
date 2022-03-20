import { Calculator, CalculatorOperations } from "./calculator.js";

const KEY_NUMBERS = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
];

const calculator = new Calculator();




export class UIRenderer {
    constructor(container){
        this.injectCSS();
        container.innerHTML = `<div id="display">
                                    <div id="displayHistory"></div>
                                    <div id="displayStatus"></div>
                                </div>
                                <div id="buttons">
                                    <button id="backSpace">&#8592;</button>
                                    <button id="clearEntry">CE</button>
                                    <button id="clearGlobal">C</button>
                                    <button id="plusMinus">+/-</button>

                                    <button class="numbers">7</button>
                                    <button class="numbers">8</button>
                                    <button class="numbers">9</button>
                                    <button id="operator-multiply" class="operators">*</button>

                                    <button class="numbers">4</button>
                                    <button class="numbers">5</button>
                                    <button class="numbers">6</button>
                                    <button id="operator-divide" class="operators">/</button>

                                    <button class="numbers">1</button>
                                    <button class="numbers">2</button>
                                    <button class="numbers">3</button>
                                    <button id="operator-minus" class="operators">-</button>

                                    <button id="decimal" class="numbers">.</button>
                                    <button class="numbers">0</button>
                                    <button id="equal" class="operators">=</button>
                                    <button id="operator-plus" class="operators">+</button>
                                </div>`
        this.displayStatus = document.querySelector('#displayStatus');
        this.displayHistory = document.querySelector('#displayHistory');
        this.decimalBtn = document.querySelector('#decimal');
        this.clearGlobalBtn = document.querySelector('#clearGlobal');
        this.clearEntryBtn = document.querySelector('#clearEntry');
        this.backSpaceBtn = document.querySelector('#backSpace');
        this.plusMinusBtn = document.querySelector('#plusMinus');
    }
    
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
                    this.displayStatus.textContent = calculator.inputNumber;
                    return;
                }
                this.operationClicked(chosenOperator);
            }
        })
    }

    numberClicked(strNumber) {
        if (calculator.memory !== '' && calculator.operationQueued === CalculatorOperations.EQUAL) {
            return;
        }

        calculator.inputNumber += strNumber;
    
        if (calculator.isInputNumberDecimal()) {
            this.decimalBtn.disabled = true;
        }
    
        this.displayStatus.textContent = calculator.inputNumber;
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
        this.decimalBtn.disabled = false;
    
        if (calculator.operationQueued === CalculatorOperations.DIVIDE && calculator.inputNumber === '0') {
            this.displayStatus.textContent = 'Can\' divide with 0';
            calculator.inputNumber = '';
            return;
        }
    
        calculator.operate(operator);
    
        this.populateDisplay();
    }

    populateDisplay() {
        this.displayStatus.textContent = '';
        if (calculator.operationQueued === CalculatorOperations.EQUAL) {
            this.displayHistory.textContent = calculator.memory;
        } else {
            this.displayHistory.textContent = `${calculator.memory} ${calculator.operationQueued}`;
        }
    }

    setUpClearGlobalBtn() {
        this.clearGlobalBtn.addEventListener('click', () => {
            calculator.clear();
            this.displayStatus.textContent = '';
            this.displayHistory.textContent = '';
            this.decimalBtn.disabled = false;
        });
    }

    setUpClearEntryButton() {
        this.clearEntryBtn.addEventListener('click', () => {
            calculator.clearEntry();
            this.displayStatus.textContent = '';
            this.decimalBtn.disabled = false;
        });
    }

    setUpBackSpaceEraserBtn() {
        this.backSpaceBtn.addEventListener('click', () => {
            calculator.correct();
            this.displayStatus.textContent = calculator.inputNumber;
        });
    }

    setUpToggleNumberSignBtn() {
        this.plusMinusBtn.addEventListener('click', () => {
            calculator.toggleNumberSign()
            this.displayStatus.textContent = calculator.inputNumber;
        });
    }

    injectCSS(){
        var cssId = 'myCss';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId))
        {
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = 'css/style.css';
            link.media = 'all';
            head.appendChild(link);
        }
    }
}
