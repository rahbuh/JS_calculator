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
    operator: null,
    operand: [0],
    operandLength: 0,
    decimalCount: 0,
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

  // add mouse click event listener
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    key.addEventListener("click", clickAction);
  });

  // add key press event listener
  document.addEventListener("keyup", keyPressAction);

  // mouse click action
  function clickAction(e) {
    const key = e.target;
    processKeyInput(key);
  }

  // key pressed action
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

  // Key animation
  function keyAnimation(key) {
    key.classList.add("key-clicked");
    key.addEventListener("transitionend", removeTransition);
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("key-clicked");
  }

  function reset() {
    data.display.textContent = "0";
    data.calcResult = 0;
    data.operator = null;
    data.operandLength = 0;
    data.decimalCount = 0;
    data.operand.length = 0;
    data.operand.push(0);
    console.log("Reset Complete");
  }

  function memoryClear() {
    data.memory = 0;
  }

  // function resetOperand() {
  //   data.operand.length = 0;
  //   data.operand.push(0);
  // }

  // // Operator closure functions
  // function makeAdd(x) {
  //   return function(y) {
  //     return x + y;
  //   };
  // }

  // function makeSubtract(x) {
  //   return function(y) {
  //     return x - y;
  //   };
  // }

  // function makeMultiply(x) {
  //   return function(y) {
  //     return x * y;
  //   };
  // }

  // function makeDivide(x) {
  //   return function(y) {
  //     if (y === 0) {
  //       return "Error: cannot divide by 0";
  //     }
  //     return x / y;
  //   };
  // }

  // // Create operator closure
  // function createOperator(num, makeOp) {
  //   return makeOp(num);
  // }

  // // Use operator closure to calculate
  // function performCalc(num) {
  //   return data.operator(num);
  // }

  // Show selected number or decimal point on display
  function displaySelectedChar(key, display) {
    if (data.operand.length <= 1 && key === ".") {
      key = "0.";
      display.textContent = key;
    } else {
      display.textContent += key;
    }
  }

  // function parseNumber() {
  //   return parseFloat(data.operand.join("").slice(1));
  // }

  // function performOperation(fn) {
  //   if (!data.operator) {
  //     data.calcResult += parseNumber();
  //     data.operator = createOperator(data.calcResult, fn);
  //   } else {
  //     data.calcResult = performCalc(parseNumber());
  //     data.operator = createOperator(data.calcResult, fn);
  //   }
  //   data.display.textContent = data.calcResult;
  //   resetOperand();
  // }

  function processInput(inputKey) {
    console.log(inputKey);

    if (inputKey === "Delete") {
      reset();
    }
    // if numeric key is pressed
    if (inputKey >= 0 || inputKey <= 9) {
      if (data.operand.length <= 1) {
        data.display.textContent = "";
      }
      if (data.decimalCount < 20) {
        displaySelectedChar(inputKey, data.display);
        data.operand.push(inputKey);
        data.decimalCount += 1;
      }
    }
    // if decimal point is pressed
    if (inputKey === "." && data.operand.indexOf(".") === -1) {
      displaySelectedChar(inputKey, data.display);
      data.operand.push(inputKey);
    }

    // if (key.textContent === "+") {
    //   performOperation(makeAdd);
    // }

    // if (key.textContent === "-") {
    //   performOperation(makeSubtract);
    // }

    // if (key.textContent === "*") {
    //   performOperation(makeMultiply);
    // }

    // if (key.textContent === "/") {
    //   performOperation(makeDivide);
    // }

    // if (key.textContent === "=") {
    //   if (data.operator) {
    //     data.display.textContent = performCalc(parseNumber());
    //     data.operator = null;
    //     data.calcResult = 0;
    //     resetOperand();
    //   }
    // }

    // if (key.textContent === "back") {
    //   data.operand.pop();
    //   data.display.textContent = data.operand.join("").slice(1);
    // }

    // if (key.textContent === "+/-") {
    //   data.operand[1] = String(parseFloat(data.operand[1] * -1));
    //   data.display.textContent = data.operand.join("").slice(1);
    // }
  }
})();
