let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentValue;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0') {
            currentValue = number;
        } else {
            currentValue += number;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== '' && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentValue = '0.';
        shouldResetDisplay = false;
    } else if (!currentValue.includes('.')) {
        currentValue += '.';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentValue !== '0') {
        currentValue = currentValue.startsWith('-') 
            ? currentValue.slice(1) 
            : '-' + currentValue;
        updateDisplay();
    }
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function calculate() {
    if (operator === '' || shouldResetDisplay) {
        return;
    }

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 0;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = '';
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        event.preventDefault();
        appendOperator(event.key);
    } else if (event.key === '.') {
        event.preventDefault();
        appendDecimal();
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        if (currentValue.length > 1) {
            currentValue = currentValue.slice(0, -1);
        } else {
            currentValue = '0';
        }
        updateDisplay();
    } else if (event.key === 'c' || event.key === 'C') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();