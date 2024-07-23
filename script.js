const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');

let displayValue = '0';
let firstValue = null;
let operator = null;
let awaitingNextValue = false;

function updateDisplay() {
    display.textContent = displayValue;
}

function handleKeyClick(event) {
    const key = event.target;
    const keyValue = key.textContent;
    const action = key.dataset.action;

    if (!action) {
        if (displayValue === '0' || awaitingNextValue) {
            displayValue = keyValue;
            awaitingNextValue = false;
        } else {
            displayValue += keyValue;
        }
    } else {
        switch (action) {
            case 'clear':
                displayValue = '0';
                firstValue = null;
                operator = null;
                awaitingNextValue = false;
                break;
            case 'delete':
                displayValue = displayValue.slice(0, -1) || '0';
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperator(action);
                break;
            case 'equals':
                if (operator && !awaitingNextValue) {
                    displayValue = calculate(firstValue, operator, parseFloat(displayValue)).toString();
                    operator = null;
                    awaitingNextValue = false;
                }
                break;
        }
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
        firstValue = inputValue;
    } else if (operator && !awaitingNextValue) {
        const result = calculate(firstValue, operator, inputValue);
        displayValue = result.toString();
        firstValue = result;
    }

    awaitingNextValue = true;
    operator = nextOperator;
}

function calculate(first, operator, second) {
    switch (operator) {
        case 'add':
            return first + second;
        case 'subtract':
            return first - second;
        case 'multiply':
            return first * second;
        case 'divide':
            return first / second;
    }
}

keys.forEach(key => key.addEventListener('click', handleKeyClick));
updateDisplay();
