class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        //we do this if for it to not let the calculator to have multiple '.', it doesnt make sense.
        this.currentOperand = this.currentOperand.toString() + number.toString()
        //we do this for the javascript not to do 1 + 1 = 2, it has to append, so 1 + 1 equals 11.

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        //compute function serve basically to do a math account whenever we click on a new math function.
        //example: 1 + 1, if I dont press equal and I press divide, it will automaticaly do the 1 + 1 alone;
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.computation = undefined
        this.previousOperand = ''
    }

    //getDisplayNumber serves to add , and . to numbers when we are writting them, to avoid having huge numbers 938394734 without any separation
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }

    }
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}



const numberButton = document.querySelectorAll('[data-number]')
const operationsButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const deleteButton = document.querySelectorAll('[data-delete]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//number buttons Loop
// 1o - We want to loop inside all the Buttons, so numberButtons.forEach loop is created
// 2o - For each one of the buttons, we wanna add an event listener with the click, we want to do something -> "()"
// 3o - We wanna go to the calculator, and append whatever inside is in that button, so button.innertext;
// 4o - At the end we want to update the uppserside of the calculator everytime we press a number, so updateDisplay;
numberButtons.forEach(button => {
    button.addEventListene('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//operation buttons Loop
operationButtons.forEach(button => {
    button.addEventListene('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculatord.delete()
    calculator.updateDisplay()
})