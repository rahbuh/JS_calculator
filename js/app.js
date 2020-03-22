(function() {
  const data = {
    display: document.querySelector("#display"),
    calculation: {
      operand1: null,
      operand2: null,
      operator: null
    },
    currentOperand: null,
    memory: 0,
    digitCount: 0
  };

  // TEST IF DISPLAYING ON MOBILE DEVICE
  function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  function initEventListeners() {
    addListener("number", handleNumberKey);
    addListener("operator", handleOperatorKey);
    addListener("action", handleActionKey);
    addListener("memory", handleMemoryKey);
    document.addEventListener("keypress", keyPressAction);
  }

  function addListener(keyType, fn) {
    for (let key of document.getElementsByClassName(keyType)) {
      key.addEventListener("click", e => {
        if (!isMobileDevice()) {
          keyAnimation(e.target);
        }
        fn(e.target.dataset.key);
      });
    }
  }

  // HANDLE KEYBOARD INPUT
  function keyPressAction(e) {
    const input = document.querySelector(`.key[data-key="${e.key}"]`);
    if (input) {
      const classInfo = [...input.classList];
      if (classInfo.indexOf("number") !== -1) {
        handleNumberKey(input.dataset.key);
      }
      if (classInfo.indexOf("operator") !== -1) {
        handleOperatorKey(input.dataset.key);
      }
      if (classInfo.indexOf("action") !== -1) {
        handleActionKey(input.dataset.key);
      }
      if (classInfo.indexOf("memory") !== -1) {
        console.log("Memory");
      }
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

  function handleNumberKey(input) {
    let { currentOperand, digitCount } = data;
    if (digitCount < 20) {
      if (currentOperand) {
        if (currentOperand === "0" && input !== ".") {
          currentOperand = input;
          digitCount = 1;
        } else if (input === ".") {
          if (currentOperand.indexOf(".") === -1) {
            currentOperand += input;
            digitCount += 1;
          }
        } else {
          currentOperand += input;
          digitCount += 1;
        }
      } else {
        if (input === ".") {
          currentOperand = "0.";
          digitCount = 2;
        } else {
          currentOperand = input;
          digitCount = 1;
        }
      }
    } else {
      return;
    }

    updateData(currentOperand, digitCount);
    displayNumber(currentOperand);
  }

  function displayNumber(number) {
    data.display.textContent = number;
  }

  function updateData(...args) {
    data.currentOperand = args[0];
    if (args[1] !== undefined) {
      data.digitCount = args[1];
    }
    console.log(data); // REMOVE
  }

  function handleOperatorKey(input) {
    let { operand1, operand2, operator } = data.calculation;
    let displayContent = data.display.textContent;

    if (operator !== "=") {
      if (!operand1) {
        operand1 = displayContent;
        operator = input;
      }
      if (operand2 !== null && operator) {
        operand2 = displayContent;
        operand1 = displayContent = runCalculation(
          operand1,
          operand2,
          operator
        );
        operator = input;
      }
      setDataValues(displayContent, operand1, operand2, operator);
      console.log(data.calculation);
    } else {
      console.log("equals");
    }
  }

  function handleActionKey(input) {
    const { currentOperand, digitCount } = data;

    if (input === "Backspace" && digitCount > 0) {
      backspace(currentOperand, digitCount);
    }
    if (input === "negate") {
      negate(currentOperand);
    }
    if (input === "Delete") {
      resetDataValues();
    }
  }

  function handleMemoryKey(input) {
    let displayContent = data.display.textContent;
    let memory = data.memory;
    if (input === "mem-clear") {
      memory = 0;
    }
    if (input === "mem-recall") {
      displayContent = String(memory);
    }
    if (input === "mem-plus") {
      memory += parseFloat(displayContent);
      // fix calculation
    }
    if (input === "mem-minus") {
      memory -= parseFloat(displayContent);
      // fix calculation
    }

    data.memory = memory;
    data.display.textContent = displayContent;
  }

  function backspace(current, digitCount) {
    const operandLength = current.length;

    if (operandLength < 2 || (operandLength === 2 && current[0] === "-")) {
      current = "0";
      digitCount = 1;
    } else {
      current = current.slice(0, operandLength - 1);
      digitCount -= 1;
    }

    updateData(current, digitCount);
    displayNumber(current);
  }

  function negate(current) {
    if (current && current !== "0") {
      current[0] === "-"
        ? (current = current.slice(1))
        : (current = `-${current}`);

      updateData(current);
      displayNumber(current);
    }
  }

  function resetDataValues() {
    data.display.textContent = 0;
    data.calculation = {
      operand1: null,
      operand2: null,
      operator: null
    };
    data.currentOperand = null;
    data.digitCount = 0;
    console.log(data); // REMOVE
  }

  function setDataValues(displayContent, operand1, operand2, operator) {
    data.display.textContent = displayContent;
    data.calculation = {
      operand1,
      operand2,
      operator
    };
    data.currentOperand = null;
    data.digitCount = 0;
  }

  function runCalculation(operand1, operand2, operator) {
    console.log({ operand1, operand2, operator });
    return 42;
  }

  initEventListeners();
})();
