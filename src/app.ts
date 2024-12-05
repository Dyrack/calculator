import { add, subtract, multiply, divide, sqrt, power } from "./calculator";

type Operator = "+" | "-" | "*" | "/" | "√" | "^";
let currentInput: string = "";
let storedValue: number | null = null;
let pendingOperator: Operator | null = null;

const display = document.getElementById("display") as HTMLInputElement;

const updateDisplay = (value: string) => {
  if (display) display.value = value;
};

const handleNumberInput = (value: string) => {
  currentInput += value;
  updateDisplay(currentInput);
};

const handleOperator = (operator: Operator) => {
  if (currentInput) {
    storedValue = parseFloat(currentInput);
    currentInput = "";
    pendingOperator = operator;
  }
};

const calculateResult = () => {
  if (storedValue !== null && pendingOperator && currentInput) {
    const currentValue = parseFloat(currentInput);
    let result: number | null = null;

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
    updateDisplay(result?.toString() || "Error");
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
      const target = e.target as HTMLButtonElement;
      const value = target.dataset.value;
      const action = target.dataset.action;

      if (value) {
        handleNumberInput(value);
      } else if (action) {
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