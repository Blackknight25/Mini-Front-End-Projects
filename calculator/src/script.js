document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  display.textContent = "0";
  const log = document.getElementById("secondaryDisplay");
  log.textContent = "0";

  let currentInput = "0";
  let prevInput = "";
  let operator = "";

  function reset() {
    currentInput = "0";
    prevInput = "";
    operator = "";
    display.textContent = currentInput;
    log.textContent = "0";
  }

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function handleNumber(number) {
    if(log.textContent === "="){
      reset();
    }
    if (number === ".") {
      if (!currentInput.includes(".")) {
        currentInput += number;
      }
    } else {
      if (currentInput === "0") {
        currentInput = number;
      } else {
        currentInput += number;
      }
    }
    updateDisplay();
    log.textContent = number;
  }

  function handleOperator(op) {
    if (
      log.textContent === "+" ||
      log.textContent === "*" ||
      log.textContent === "/"
    ) {
      if (op === "-") {
        prevInput = "-" + prevInput;
        currentInput = "0";
        updateDisplay();
        log.textContent = op;
      } else {
        operator = op;
        currentInput = "0";
        updateDisplay();
        log.textContent = op;
      }
    }else if(log.textContent === "-"){
      prevInput = prevInput.substring(1);
      currentInput = "0";
      operator = op;
      updateDisplay();
      log.textContent = op;
    } else {
      if (operator) {
        calculate();
      }
      prevInput = currentInput;
      currentInput = "0";
      operator = op;
      updateDisplay();
      log.textContent = op;
    }
  }

  function calculate() {
    let result;
    const prev = parseFloat(prevInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      default:
        return;
    }
    currentInput = result.toString();
    operator = "";
    prevInput = "";
    updateDisplay();
    log.textContent = "=";
  }

  document.querySelectorAll(".calculator").forEach((button) => {
    button.addEventListener("click", function (event) {
      const value = event.target.getAttribute("data-value");

      if ((value >= "0" && value <= "9") || value === ".") {
        handleNumber(value);
      } else if (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/"
      ) {
        handleOperator(value);
      } else if (event.target.id === "equals") {
        calculate();
      }
    });
  });

  document.getElementById("clear").addEventListener("click", reset);
});
