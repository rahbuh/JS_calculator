(function() {
  // ADD EVENT LISTENER FOR KEY PRESS
  document.addEventListener("keyup", keyPressAction);

  const keyObjs = [
    { keyname: "MemClear", keytext: "MC", classes: ["key", "single"] },
    { keyname: "MemRecall", keytext: "MR", classes: ["key", "single"] },
    { keyname: "MemPlus", keytext: "M+", classes: ["key", "single"] },
    { keyname: "MemMinus", keytext: "M-", classes: ["key", "single"] },
    { keyname: 7, keytext: 7, classes: ["key", "single"] },
    { keyname: 8, keytext: 8, classes: ["key", "single"] },
    { keyname: 9, keytext: 9, classes: ["key", "single"] },
    { keyname: "/", keytext: "/", classes: ["key", "single"] },
    { keyname: 4, keytext: 4, classes: ["key", "single"] },
    { keyname: 5, keytext: 5, classes: ["key", "single"] },
    { keyname: 6, keytext: 6, classes: ["key", "single"] },
    { keyname: "*", keytext: "*", classes: ["key", "single"] },
    { keyname: 1, keytext: 1, classes: ["key", "single"] },
    { keyname: 2, keytext: 2, classes: ["key", "single"] },
    { keyname: 3, keytext: 3, classes: ["key", "single"] },
    { keyname: "+", keytext: "+", classes: ["key", "single"] },
    { keyname: "neg", keytext: "+/-", classes: ["key", "single"] },
    { keyname: 0, keytext: 0, classes: ["key", "single"] },
    { keyname: ".", keytext: ".", classes: ["key", "single"] },
    { keyname: "-", keytext: "-", classes: ["key", "single"] },
    { keyname: "Delete", keytext: "C", classes: ["key", "single"] },
    { keyname: "Backspace", keytext: "back", classes: ["key", "single"] },
    { keyname: "Enter", keytext: "=", classes: ["key", "double"] }
  ];

  const data = {
    displayWindow: document.querySelector("#display"),
    currentOperand: "0",
    calculation: {
      operand1: null,
      operand2: null,
      operator: null
    },
    memory: 0,
    digitCount: 0
  };

  function init(keyList) {
    const wrapper = document.querySelector("#key-wrapper");
    wrapper.addEventListener("click", clickAction);

    for (let key of keyList) {
      const box = document.createElement("div");
      box.classList.add(...key["classes"]);
      box.setAttribute("data-key", key["keyname"]);
      box.innerText = key["keytext"];
      wrapper.appendChild(box);
    }
  }

  // MOUSE CLICK ACTION
  function clickAction(e) {
    const key = e.target;

    if (e.target.classList.value) {
      keyAnimation(key);
      processInput(key.getAttribute("data-key"));
    }
  }

  // KEY PRESS ACTION
  function keyPressAction(e) {
    const key = document.querySelector(`.key[data-key="${e.key}"]`);

    if (key) {
      keyAnimation(key);
      processInput(key.getAttribute("data-key"));
    }
  }

  // KEY ANIMATION
  function keyAnimation(key) {
    key.classList.add("key-clicked");
    key.addEventListener("transitionend", removeTransition);
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("key-clicked");
  }

  // RESETS
  function reset() {
    data.displayWindow.textContent = 0;
    data.currentOperand = "0";
    data.calculation = {
      operand1: null,
      operand2: null,
      operator: null
    };
    data.digitCount = 0;
  }

  function resetOperand() {
    data.currentOperand = "0";
  }

  function updateCalculationObj(result, operation) {
    data.calculation = {
      operand1: result,
      operand2: null,
      operator: operation
    };
  }

  // PROCESS INPUT
  function processInput(input) {
    switch (input) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        processNumber(input, data.currentOperand);
        break;
      case ".":
        processDecimal(input, data.currentOperand);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        performOperation(input, data.currentOperand);
        break;
      case "MemClear":
        clearMemory();
        break;
      case "MemRecall":
        recallMemory();
        break;
      case "MemPlus":
      case "MemMinus":
        addSubMemory(input);
        break;
      case "Enter":
        totalCalulation(data.calculation, data.currentOperand);
        break;
      case "Backspace":
        backspace(data.currentOperand);
        break;
      case "Delete":
        reset();
        break;
      case "neg":
        negate(data.currentOperand);
        break;
      default:
        console.log("No match for key selected");
        break;
    }
  }

  function processNumber(input, currentOperand) {
    const decimalFound = currentOperand.indexOf(".") !== -1;

    if (data.digitCount < 20) {
      currentOperand += input;
      if (!decimalFound) {
        currentOperand = String(parseFloat(currentOperand));
      }
      updateCurrentOperand(currentOperand);
      displayNumber(currentOperand);
      data.digitCount += 1;
    }
  }

  function processDecimal(input, currentOperand) {
    const decimalFound = currentOperand.indexOf(".") !== -1;

    if (decimalFound) {
      return;
    } else {
      currentOperand += input;
      updateCurrentOperand(currentOperand);
      displayNumber(currentOperand);
    }
  }

  function backspace(currentOperand) {
    let operandLength = currentOperand.length;

    operandLength < 2
      ? (currentOperand = "0")
      : (currentOperand = currentOperand.slice(0, operandLength - 1));
    updateCurrentOperand(currentOperand);
    displayNumber(currentOperand);
    data.digitCount -= 1;
  }

  function negate(currentOperand) {
    let negative;
    let operand = data.calculation.operand1;

    if (operand !== null && currentOperand === "0") {
      negative = operand * -1;
      data.calculation.operand1 = negative;
    } else {
      negative = currentOperand * -1;
      updateCurrentOperand(negative);
    }
    displayNumber(negative);
  }

  function updateCurrentOperand(currentOperand) {
    data.currentOperand = currentOperand;
  }

  function displayNumber(result) {
    data.displayWindow.textContent = result;
  }

  // OPERATIONS
  function performOperation(operation, currentOperand) {
    const { operand1, operator } = data.calculation;

    if (operator === null) {
      if (operand1 === null) {
        data.calculation.operand1 = parseFloat(currentOperand);
        data.calculation.operator = operation;
        resetOperand();
      } else {
        data.calculation.operand2 = parseFloat(currentOperand);
        data.calculation.operator = operation;
      }
    } else {
      data.calculation.operand2 = parseFloat(currentOperand);
      processCalculation(operation);
    }
  }

  function processCalculation(operation) {
    let result = runCalculation(data.calculation);

    displayNumber(result);
    if (typeof result !== "number") {
      result = null;
      operation = null;
    }
    updateCalculationObj(result, operation);
    resetOperand();
  }

  function runCalculation({ operand1, operand2, operator }) {
    const equationComplete =
      operand1 !== null && operand2 !== null && operator !== null;
    let result = 0;

    if (equationComplete) {
      switch (operator) {
        case "+":
          result = calculate(operand1, operand2, add);
          break;
        case "-":
          result = calculate(operand1, operand2, subtract);
          break;
        case "*":
          result = calculate(operand1, operand2, multiply);
          break;
        case "/":
          result = calculate(operand1, operand2, divide);
          break;
        default:
          result = "operation error";
          break;
      }
      return result;
    }
  }

  function calculate(operand1, operand2, calcFn) {
    return calcFn(operand1, operand2);
  }

  function add(addend1, addend2) {
    if (isFloat(addend1) || isFloat(addend2)) {
      return addOrSubFloat(addend1, addend2, "add");
    } else {
      return addend1 + addend2;
    }
  }

  function subtract(minuend, subtrahend) {
    if (isFloat(minuend) || isFloat(subtrahend)) {
      return addOrSubFloat(minuend, subtrahend, "sub");
    } else {
      return minuend - subtrahend;
    }
  }

  function multiply(factor1, factor2) {
    if (isFloat(factor1) || isFloat(factor2)) {
      return multOrDivFloat(factor1, factor2, "mult");
    } else {
      return factor1 * factor2;
    }
  }

  function divide(dividend, divisor) {
    if (dividend === 0 && divisor === 0) {
      return "Result is undefined";
    } else if (divisor === 0) {
      return "Cannot divide by zero";
    } else {
      if (isFloat(dividend) || isFloat(divisor)) {
        return multOrDivFloat(dividend, divisor, "div");
      } else {
        return dividend / divisor;
      }
    }
  }

  function isFloat(num) {
    return String(num).indexOf(".") !== -1;
  }

  function addOrSubFloat(num1, num2, operation) {
    const decimalPlaces = findMaxDecimalPlaces(num1, num2);
    const wholeNum1 = convertToWholeNumber(num1, decimalPlaces);
    const wholeNum2 = convertToWholeNumber(num2, decimalPlaces);
    let result = 0;

    operation === "add"
      ? (result = wholeNum1 + wholeNum2)
      : (result = wholeNum1 - wholeNum2);

    return convertToDecimal(result, decimalPlaces);
  }

  function multOrDivFloat(num1, num2, operation) {
    const decimalCount1 = countDecimalPlaces(String(num1));
    const decimalCount2 = countDecimalPlaces(String(num2));
    const wholeNum1 = convertToWholeNumber(num1, decimalCount1);
    const wholeNum2 = convertToWholeNumber(num2, decimalCount2);
    const decimalPlaces = decimalCount1 + decimalCount2;
    let result = 0;

    operation === "mult"
      ? (result = wholeNum1 * wholeNum2)
      : (result = wholeNum1 / wholeNum2);

    return convertToDecimal(result, decimalPlaces);
  }

  function findMaxDecimalPlaces(num1, num2) {
    return Math.max(
      countDecimalPlaces(String(num1)),
      countDecimalPlaces(String(num2))
    );
  }

  function countDecimalPlaces(strNum) {
    const numberLength = strNum.length - 1;
    const decimalIndex = strNum.indexOf(".");
    return decimalIndex === -1 ? 0 : numberLength - decimalIndex;
  }

  function convertToWholeNumber(num, decimalPlaces) {
    let wholeNum = Number(num);
    if (decimalPlaces > 0) {
      for (let i = 1; i <= decimalPlaces; i++) {
        wholeNum *= 10;
      }
    }
    return Math.round(wholeNum);
  }

  function convertToDecimal(result, decimalPlaces) {
    if (decimalPlaces > 0) {
      for (let i = 1; i <= decimalPlaces; i++) {
        result /= 10;
      }
    }
    return result;
  }

  function totalCalulation(calculation, currentOperand) {
    if (calculation.operand1 === null) {
      data.currentOperand = currentOperand;
    } else {
      performOperation(null, currentOperand);
    }
  }

  function recallMemory() {
    const { operator } = data.calculation;
    data.displayWindow.textContent = data.memory;

    !operator
      ? (data.calculation.operand1 = data.memory)
      : (data.currentOperand = String(data.memory));
  }

  function addSubMemory(input) {
    input === "MemPlus"
      ? (data.memory += Number(data.displayWindow.textContent))
      : (data.memory -= Number(data.displayWindow.textContent));
    resetOperand();
  }

  function clearMemory() {
    data.memory = 0;
  }

  init(keyObjs);
})();
