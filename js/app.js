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
    decimalPlaces: 0,
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
    data.operand = ["0"];
    data.calculation = {
      operand1: null,
      operand2: null,
      operator: null
    };
    data.decimalPlaces = 0;
    data.digitCount = 0;
  }

  function memoryClear() {
    data.memory = 0;
  }

  // Show selected number or decimal point on display
  function displaySelectedChar(key, display) {
    if (data.operand.length <= 1 && key === ".") {
      key = "0.";
      display.textContent = key;
    } else {
      display.textContent += key;
    }
  }

  function resetOperand() {
    data.operand = ["0"];
  }

  // function parseNumber() {
  //   return parseFloat(data.operand.join("").slice(1));
  // }

  function performOperation(inputKey) {

    if (!data.calculation.operator) {
      if (data.operand.length <= 1) {
        data.calculation.operand1 = String(data.calcResult)
      } else {
        data.calculation.operand1 = data.operand.join("").slice(1);
        resetOperand()
      }
      data.calculation.operator = inputKey;
      console.log(data.calculation)
    } else {
      data.calculation.operand2 = data.operand.join("").slice(1);
      resetOperand()
      console.log(data.calculation)
      // runCalc(data.calculation)
    }

  }

  function processInput(inputKey) {
    if (inputKey === "Delete") {
      reset();
    }
    // if numeric key is pressed
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
    // if decimal point is pressed and no decimal exists in number
    if (inputKey === "." && data.operand.indexOf(".") === -1) {
      displaySelectedChar(inputKey, data.display);
      data.operand.push(inputKey);
    }
    
    if (inputKey === "Backspace") {
      if (data.operand.length > 2) {
        data.operand.pop();
        data.display.textContent = data.operand.join("").slice(1);
      } else if (data.operand.length = 2) {
        data.operand.pop();
        data.display.textContent = data.operand.join("")
      }
    }

    if (inputKey === "+" || inputKey === "-" || inputKey === "*" || inputKey === "/") {
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

    console.log(data.operand);
  }
})();
