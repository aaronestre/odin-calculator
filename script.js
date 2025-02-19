const display = document.getElementById("display");
const buttons = Array.from(document.getElementById("buttons").children);
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

let calcStack = [];
let op = "";

buttons.filter((button) => button.classList.contains("number")).map((button) => {
    button.addEventListener("click", () => {
        const prev = calcStack[calcStack.length - 1];
        if ( prev === "%" || prev === "/" || prev === "*" || prev === "-" || prev === "+") {
            display.textContent = "";
            op = calcStack.pop();
        }
        display.textContent += button.textContent;
    });
});

buttons.filter((button) => button.classList.contains("operation")).map((button) => {
    button.addEventListener("click", () => {
        calcStack.push(display.textContent);
        calcStack.push(button.textContent);
    });
});

clear.addEventListener("click", () => {
    calcStack = [];
    display.textContent = "";
});

equal.addEventListener("click", () => {
    const right = parseInt(display.textContent);
    const left = parseInt(calcStack.pop());
    const result = calculate(left, op, right);

    display.textContent = result;
    calcStack.push(result);
});

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