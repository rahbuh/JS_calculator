(function() {
  // EVENT LISTENER FOR KEY PRESS
  document.addEventListener("keyup", keyPressAction);

  const keys = document.querySelectorAll("div[data-key]");
  const isMobile = isMobileDevice();

  const data = {
    displayWindow: document.querySelector("#display"),
    currentOperand: "0",
    calculation: {
      operand1: null,
      operand2: null,
      operator: null
    },
    memory: 0,
    digitCount: 0,
    calcResult: 0
  };

  function init() {
    addListeners(keys);
  }

  function addListeners(keys) {
    for (let key of keys) {
      key.addEventListener("click", clickAction);
    }
  }

  // MOUSE CLICK ACTION
  function clickAction(e) {
    const keyElement = e.target;
    processInput(keyElement);
  }

  // KEY PRESS ACTION
  function keyPressAction(e) {
    const keyElement = document.querySelector(`.key[data-key="${e.key}"]`);
    if (keyElement) {
      processInput(keyElement);
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

  // TEST IF DISPLAYING ON MOBILE DEVICE
  function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  // PROCESS INPUT
  function processInput(keyElement) {
    const input = keyElement.dataset.key;

    if (!isMobile) {
      keyAnimation(keyElement);
    }

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
        processNumber(input, data);
        break;
      case ".":
        processDecimal(input, data);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        processOperator(input, data);
        // console.log("Operator: ", input);
        break;
      case "mem-clear":
        console.log("Memory: ", input);
        break;
      case "mem-recall":
        console.log("Memory: ", input);
        break;
      case "mem-plus":
      case "mem-minus":
        console.log("Memory: ", input);
        break;
      case "Enter":
        console.log("Enter: ", input);
        break;
      case "Backspace":
        backspace(data);
        break;
      case "Delete":
        reset();
        break;
      case "negate":
        negate(data);
        break;
      default:
        break;
    }
  }

  function displayNumber(result) {
    data.displayWindow.textContent = result;
  }

  function processNumber(input, { currentOperand, digitCount }) {
    if (digitCount < 20) {
      currentOperand === "0"
        ? (currentOperand = input)
        : (currentOperand += input);

      digitCount += 1;
      displayNumber(currentOperand);
      data.currentOperand = currentOperand;
      data.digitCount = digitCount;
    }
  }

  function processDecimal(input, { currentOperand, digitCount }) {
    const decimalFound = currentOperand.indexOf(".") !== -1;

    if (!decimalFound && digitCount < 20) {
      currentOperand += input;
      displayNumber(currentOperand);
      data.currentOperand = currentOperand;
    }
  }

  function backspace({ currentOperand, digitCount }) {
    let operandLength = currentOperand.length;

    operandLength < 2
      ? (currentOperand = "0")
      : (currentOperand = currentOperand.slice(0, operandLength - 1));

    digitCount -= 1;
    displayNumber(currentOperand);
    data.currentOperand = currentOperand;
    data.digitCount = digitCount;
  }

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

  function negate({ currentOperand }) {
    currentOperand[0] === "-"
      ? (currentOperand = currentOperand.slice(1))
      : (currentOperand = "-" + currentOperand);

    displayNumber(currentOperand);
    data.currentOperand = currentOperand;
  }

  function processOperator(input, data) {
    const { operand1 } = data.calculation;
    const { currentOperand } = data;
    let result;

    if (operand1 === null) {
      updateCalcValues(currentOperand, input);
    } else {
      result = runCalculation(currentOperand);
      displayNumber(result);
      updateCalcValues(result, input);
    }

    console.log("process: ", data.calculation);
  }

  function updateCalcValues(operandValue, input) {
    data.calculation.operand1 = operandValue;
    data.calculation.operand2 = null;
    data.calculation.operator = input;
    data.currentOperand = "0";
    data.digitCount = 0;
  }

  function runCalculation(currentOperand) {
    data.calculation.operand2 = currentOperand;
    console.log("run calc: ", data.calculation);
    return "1000";
  }

  init();
})();
