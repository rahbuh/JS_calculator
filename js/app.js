(function() {
  const data = {
    display: document.querySelector("#display"),
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

  // TEST IF DISPLAYING ON MOBILE DEVICE
  function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  function initEventListeners() {
    // document.addEventListener("keyup", keyPressAction);
    for (let key of document.getElementsByClassName("number")) {
      key.addEventListener("click", handleNumberKey);
    }
    for (let key of document.getElementsByClassName("operator")) {
      key.addEventListener("click", handleOperatorKey);
    }
    for (let key of document.getElementsByClassName("action")) {
      key.addEventListener("click", handleActionKey);
    }
    for (let key of document.getElementsByClassName("memory")) {
      key.addEventListener("click", handleMemoryKey);
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

  function handleNumberKey(e) {
    const input = e.target.dataset.key;
    let { display, digitCount } = data;

    if (!isMobileDevice()) {
      keyAnimation(e.target);
    }
    if (digitCount < 20) {
      if (input === ".") {
        if (display.textContent.indexOf(".") === -1) {
          display.textContent += input;
        }
      } else {
        display.textContent === "0"
          ? (display.textContent = input)
          : (display.textContent += input);
      }
      data.digitCount = digitCount + 1;
    }
  }

  function handleOperatorKey(e) {
    console.log(e.target.dataset.key);
    if (!isMobileDevice()) {
      keyAnimation(e.target);
    }
  }

  function handleActionKey(e) {
    const input = e.target.dataset.key;
    if (!isMobileDevice()) {
      keyAnimation(e.target);
    }
    if (input === "Backspace" && data.digitCount > 0) {
      backspace(data);
    }
    if (input === "Delete") {
      reset();
    }
    if (input === "negate") {
      negate(data);
    }
  }

  function handleMemoryKey(e) {
    const input = e.target.dataset.key;
    const { display } = data;

    if (!isMobileDevice()) {
      keyAnimation(e.target);
    }
    if (input === "mem-clear") {
      data.memory = 0;
    }
    if (input === "mem-recall") {
      display.textContent = String(data.memory);
    }
    if (input === "mem-plus") {
      data.memory += parseFloat(display.textContent);
    }
    if (input === "mem-minus") {
      data.memory -= parseFloat(display.textContent);
    }
    // console.log(data.memory)
  }

  function backspace({ display, digitCount }) {
    const operandLength = display.textContent.length;
    operandLength < 2
      ? (display.textContent = "0")
      : (display.textContent = display.textContent.slice(0, operandLength - 1));
    data.digitCount = digitCount - 1;
  }

  function reset() {
    data.display.textContent = 0;
    data.currentOperand = "0";
    data.calculation = {
      operand1: null,
      operand2: null,
      operator: null
    };
    data.digitCount = 0;
  }

  function negate({ display }) {
    let number = display.textContent;
    number[0] === "-" ? (number = number.slice(1)) : (number = "-" + number);
    display.textContent = number;
  }

  function displayNumber(result) {
    data.displayWindow.textContent = result;
  }

  calculate()




  // function processOperator(input, { currentOperand }) {
  //   let result;
  //   if (data.calculation.operand1 === null) {
  //     updateCalcValues(currentOperand, input);
  //   } else {
  //     result = runCalculation(currentOperand, data.calculation);
  //     displayNumber(result);
  //     updateCalcValues(result, input);
  //   }
  //   // console.log("process: ", data.calculation);
  // }

  // function updateCalcValues(operandValue, input) {
  //   data.calculation.operand1 = operandValue;
  //   data.calculation.operand2 = null;
  //   data.calculation.operator = input;
  //   data.currentOperand = "0";
  //   data.digitCount = 0;
  // }

  // function runCalculation(currentOperand, { operand1, operator }) {
  //   let result;
  //   const num1 = parseFloat(operand1);
  //   const num2 = parseFloat(currentOperand);

  //   switch (operator) {
  //     case "+":
  //       return num1 + num2;
  //     case "-":
  //       return num1 - num2;
  //     case "*":
  //       return num1 * num2;
  //     case "/":
  //       return num1 / num2;
  //     default:
  //       return "error";
  //   }
  // }

  initEventListeners();
})();
