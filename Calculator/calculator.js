class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.previousText.innerText = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    chooseOperation(operation) {


        if (this.currentOperand === '')
            return
        if (this.currentOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) {
            return
        }

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

            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    appendNumber(number) {

        if (number === '.' && this.currentOperand.includes('.'))
            return

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    getDisplayNumber(number) {

        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        const floatNumber = parseFloat(number)

        let integerDisplay

        if (isNaN(integerDigit)) {
            integerDisplay = ''
        }

        else {
            integerDisplay = integerDigit.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        }
        else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentText.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {

            this.previousText.innerText = `${this.getDisplayNumber(this.previousOperand)}  ${this.operation}`

        }
        else{
            this.previousText.innerText = ''
        }

    }


}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousText = document.querySelector('[data-previous-operand]')
const currentText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousText, currentText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
    this.previousText = ''
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})