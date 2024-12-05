import { add, subtract, multiply, divide, sqrt, power } from "./calculator.js";
let currentInput = "";
let storedValue = null;
let pendingOperator = null;
const display = document.getElementById("display");
const updateDisplay = (value) => {
    if (display)
        display.value = value;
};
const handleNumberInput = (value) => {
    currentInput += value;
    updateDisplay(currentInput);
};
const handleOperator = (operator) => {
    if (currentInput) {
        storedValue = parseFloat(currentInput);
        currentInput = "";
        pendingOperator = operator;
    }
};
const calculateResult = () => {
    if (storedValue !== null && pendingOperator && currentInput) {
        const currentValue = parseFloat(currentInput);
        let result = null;
        switch (pendingOperator) {
            case "+":
                result = add(storedValue, currentValue);
                break;
            case "-":
                result = subtract(storedValue, currentValue);
                break;
            case "*":
                result = multiply(storedValue, currentValue);
                break;
            case "/":
                result = divide(storedValue, currentValue);
                break;
            case "√":
                result = sqrt(storedValue);
                break;
            case "^":
                result = power(storedValue);
                break;
        }
        storedValue = result;
        currentInput = "";
        pendingOperator = null;
        updateDisplay((result === null || result === void 0 ? void 0 : result.toString()) || "Error");
    }
};
const clearCalculator = () => {
    currentInput = "";
    storedValue = null;
    pendingOperator = null;
    updateDisplay("");
};
const initCalculator = () => {
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const target = e.target;
            const value = target.dataset.value;
            const action = target.dataset.action;
            if (value) {
                handleNumberInput(value);
            }
            else if (action) {
                switch (action) {
                    case "add":
                        handleOperator("+");
                        break;
                    case "subtract":
                        handleOperator("-");
                        break;
                    case "multiply":
                        handleOperator("*");
                        break;
                    case "divide":
                        handleOperator("/");
                        break;
                    case "equals":
                        calculateResult();
                        break;
                    case "clear":
                        clearCalculator();
                        break;
                    case "sqrt":
                        handleOperator("√");
                        calculateResult();
                        break;
                    case "power":
                        handleOperator("^");
                        calculateResult();
                        break;
                }
            }
        });
    });
};
initCalculator();
