const display = document.getElementById("display");
const buttons = Array.from(document.getElementById("buttons").children);
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

let numStack = [];
let opStack = [];
let wasOperatorLast = false;

buttons.filter((button) => button.classList.contains("number")).map((button) => {
    button.addEventListener("click", () => {

        if ( wasOperatorLast ) {
            display.textContent = button.textContent;
            wasOperatorLast = false;
            return;
        }
        
        display.textContent += button.textContent;
        wasOperatorLast = false;
    });
});

buttons.filter((button) => button.classList.contains("operation")).map((button) => {
    button.addEventListener("click", () => {
        if ( opStack.length > 0 ) {
            if ( !wasOperatorLast ) {
                opStack.pop();
                opStack.push(button.textContent);
                return;
            }
            const right = parseFloat(display.textContent);
            const left = parseFloat(numStack.pop());
            const op = opStack.pop();
            const result = calculate(left, op, right);
            display.textContent = result;
            numStack.push(result);
            opStack.push(button.textContent);
            return;
        }
        opStack.push(button.textContent);
        wasOperatorLast = true;
        numStack.push(display.textContent);
    });
});

dot.addEventListener("click", () => {
    if ( display.textContent.includes(".") ) {
        return;
    }
    display.textContent += ".";
});

clear.addEventListener("click", () => {
    clearDisplay();
});

equal.addEventListener("click", () => {
    
    const right = parseFloat(display.textContent);
    const left = parseFloat(numStack.pop());
    const op = opStack.pop();
    const result = calculate(left, op, right);

    display.textContent = result;
    numStack.push(result);
});

const peekNums = () => {
    return numStack[numStack.length - 1];
}

const peekOps = () => {
    return opStack[opStack.length - 1];
}

const calculate = (left, op, right) => { 

    switch (op) {
        case "+":
            return left + right;
        case "-":
            return left - right;
        case "*":
            return left * right;
        case "/":
            if ( right === 0) {
                calcStack = [];
                return "Nice try";
            }
            return Math.round(left / right * 100) / 100;
        case "%":
            return left % right;
    }

}

const clearDisplay = () => {
    numStack = [];
    opStack = [];
    lastInput = "";
    hasDot = false;
    display.textContent = "";
}