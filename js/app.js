(function calculator() {
  const keysArray = [
    { keyname: "M-clear", keytext: "MC" },
    { keyname: "M-recall", keytext: "MR" },
    { keyname: "M-add", keytext: "M+" },
    { keyname: "M-sub", keytext: "M-" },
    { keyname: 7, keytext: 7 },
    { keyname: 8, keytext: 8 },
    { keyname: 9, keytext: 9 },
    { keyname: "/", keytext: "/" },
    { keyname: 4, keytext: 4 },
    { keyname: 5, keytext: 5 },
    { keyname: 6, keytext: 6 },
    { keyname: "*", keytext: "*" },
    { keyname: 1, keytext: 1 },
    { keyname: 2, keytext: 2 },
    { keyname: 3, keytext: 3 },
    { keyname: "+", keytext: "+" },
    { keyname: "neg", keytext: "+/-" },
    { keyname: 0, keytext: 0 },
    { keyname: ".", keytext: "." },
    { keyname: "-", keytext: "-" },
    { keyname: "Delete", keytext: "C" },
    { keyname: "Backspace", keytext: "back" },
    { keyname: "blank", keytext: "" },
    { keyname: "Enter", keytext: "=" }
  ];

  const data = {
    display: document.querySelector("#display"),
    calcResult: 0,
    operand: ["0"],
    calculation: {
      operand1: null,
      operand2: null,
      operator: null
    },
    digitCount: 0,
    memory: 0
  };

  (function(keyList) {
    const container = document.querySelector(".container");

    for (let key of keyList) {
      const box = document.createElement("div");
      box.classList.add("box");

      const keyDiv = document.createElement("div");
      keyDiv.classList.add("key");
      keyDiv.setAttribute("data-key", key["keyname"]);
      keyDiv.innerText = key["keytext"];

      box.appendChild(keyDiv);
      container.appendChild(box);
    }
  })(keysArray);

  // ADD EVENT LISTENER FOR MOUSE CLICK
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    key.addEventListener("click", clickAction);
  });

  // ADD EVENT LISTENER FOR KEY PRESS
  document.addEventListener("keyup", keyPressAction);

  // MOUSE CLICK ACTION
  function clickAction(e) {
    const key = e.target;
    processKeyInput(key);
  }

  // KEY PRESS ACTION
  function keyPressAction(e) {
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    processKeyInput(key);
  }

  function processKeyInput(key) {
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
    data.display.textContent = "0";
    data.calcResult = 0;
    data.operand = ["0"];
    data.calculation = {
      operand1: null,
      operand2: null,
      operator: null
    };
    data.digitCount = 0;
  }

  function memoryClear() {
    data.memory = 0;
  }

  function resetOperand() {
    data.operand = ["0"];
  }

  // SHOW NUMBER OR DECIMAL POINT ON THE DISPLAY
  function displaySelectedChar(key, display) {
    if (data.operand.length <= 1 && key === ".") {
      key = "0.";
      display.textContent = key;
    } else {
      display.textContent += key;
    }
  }

  function processInput(inputKey) {
    if (inputKey === "Delete") {
      reset();
    }
    // IF NUMERIC KEY IS PRESSED (20 DIGITS MAX)
    if (inputKey >= 0 || inputKey <= 9) {
      if (data.operand.length <= 1) {
        data.display.textContent = "";
      }
      if (data.digitCount < 20) {
        displaySelectedChar(inputKey, data.display);
        data.operand.push(inputKey);
        data.digitCount += 1;
      }
    }
    // IF DECIMAL POINT IS PRESSED AND NO DECIMAL EXISTS IN NUMBER
    if (inputKey === "." && data.operand.indexOf(".") === -1) {
      displaySelectedChar(inputKey, data.display);
      data.operand.push(inputKey);
    }

    if (inputKey === "Backspace") {
      if (data.operand.length > 2) {
        data.operand.pop();
        data.display.textContent = data.operand.join("").slice(1);
      } else if ((data.operand.length = 2)) {
        data.operand.pop();
        data.display.textContent = data.operand.join("");
      }
    }

    if (
      inputKey === "+" ||
      inputKey === "-" ||
      inputKey === "*" ||
      inputKey === "/"
    ) {
      performOperation(inputKey);
    }

    // if (key.textContent === "=") {
    //   if (data.operator) {
    //     data.display.textContent = performCalc(parseNumber());
    //     data.operator = null;
    //     data.calcResult = 0;
    //     resetOperand();
    //   }
    // }

    // if (key.textContent === "+/-") {
    //   data.operand[1] = String(parseFloat(data.operand[1] * -1));
    //   data.display.textContent = data.operand.join("").slice(1);
    // }
  }

  function convertToWholeNumber(strNum, decimalPlaces) {
    if (decimalPlaces > 0) {
      const mult = 10 ** decimalPlaces;
      return Number(strNum) * mult;
    } else {
      return Number(strNum);
    }
  }

  function countDecimalPlaces(strNum) {
    const numberLength = strNum.length - 1;
    const decimalIndex = strNum.indexOf(".");

    if (decimalIndex === -1) {
      return 0;
    } else return numberLength - decimalIndex;
  }

  function findMaxDecimalPlaces(strNum1, strNum2) {
    let max = Math.max(
      countDecimalPlaces(strNum1),
      countDecimalPlaces(strNum2)
    );
    console.log(`Num1: ${strNum1} Num2: ${strNum2} `);
    // console.log("Max is " + max);
    return max;
  }

  function runCalc({ operand1, operand2, operator }) {
    let result = 0;
    const decimalPlaces = findMaxDecimalPlaces(operand1, operand2);
    const num1 = convertToWholeNumber(operand1, decimalPlaces);
    const num2 = convertToWholeNumber(operand2, decimalPlaces);

    if (operator === "+") {
      decimalPlaces > 0
        ? (result = (num1 + num2) / decimalPlaces)
        : (result = num1 + num2);
    }
    if (operator === "-") {
      decimalPlaces > 0
        ? (result = (num1 - num2) / decimalPlaces)
        : (result = num1 - num2);
    }
    if (operator === "*") {
      decimalPlaces > 0
        ? (result = (num1 * num2) / decimalPlaces)
        : (result = num1 * num2);
    }
    if (operator === "/") {
      if (num1 === 0 && num2 === 0) {
        result = "Result is undefined";
      } else if (num2 === 0) {
        result = "Cannot divide by zero";
      } else {
        result = num1 / num2;
      }
    }
    console.log(num1, num2);
    console.log(result);
    return result;
  }

  function performOperation(inputKey) {
    if (!data.calculation.operator) {
      if (data.operand.length <= 1) {
        data.calculation.operand1 = String(data.calcResult);
      } else {
        data.calculation.operand1 = data.operand.join("").slice(1);
        resetOperand();
      }
      data.calculation.operator = inputKey;
      // console.log(data.calculation);
    } else {
      data.calculation.operand2 = data.operand.join("").slice(1);
      resetOperand();
      // console.log(data.calculation);
      data.calcResult = runCalc(data.calculation);
    }
  }

})();
