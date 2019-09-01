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
    console.log(key);
    keyAnimation(key);
    // processInput(key);
  }

  // key pressed action
  function keyPressAction(e) {
    console.log(e.key);
    let key = document.querySelector(`.key[data-key="${e.key}"]`);

    if (key) {
      keyAnimation(key);
      // processInput(key);
    }
  }

  // Show key animation
  function keyAnimation(key) {
    key.classList.add("key-clicked");
    key.addEventListener("transitionend", removeTransition);
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("key-clicked");
  }

  const data = {
    display: document.querySelector("#display"),
    calcResult: 0,
    operator: null,
    holder: [0]
  };

  data.display.textContent = "0";

  // function init() {
  //   data.display.textContent = "0";
  //   data.calcResult = 0;
  //   data.operator = null;
  //   data.holder.length = 0;
  //   data.holder.push(0);
  // }

  // function resetInputHolder() {
  //   data.holder.length = 0;
  //   data.holder.push(0);
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

  // // Show selected number or decimal point on display
  // function displaySelectedChar(key, display) {
  //   if (data.holder.length <= 1 && key === ".") {
  //     key = "0.";
  //     display.textContent = key;
  //   } else {
  //     display.textContent += key;
  //   }
  // }

  // function parseNumber() {
  //   return parseFloat(data.holder.join("").slice(1));
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
  //   resetInputHolder();
  // }

  // function processInput(key) {
  //   // reset
  //   if (key.textContent === "C") {
  //     init(data);
  //   }
  //   // if numeric key is pressed
  //   if (key.textContent >= 0 || key.textContent <= 9) {
  //     if (data.holder.length <= 1) {
  //       data.display.textContent = "";
  //     }
  //     displaySelectedChar(key.textContent, data.display);
  //     data.holder.push(key.textContent);
  //   }
  //   // if decimal point is pressed
  //   if (key.textContent === "." && data.holder.indexOf(".") === -1) {
  //     displaySelectedChar(key.textContent, data.display);
  //     data.holder.push(key.textContent);
  //   }

  //   if (key.textContent === "+") {
  //     performOperation(makeAdd);
  //   }

  //   if (key.textContent === "-") {
  //     performOperation(makeSubtract);
  //   }

  //   if (key.textContent === "*") {
  //     performOperation(makeMultiply);
  //   }

  //   if (key.textContent === "/") {
  //     performOperation(makeDivide);
  //   }

  //   if (key.textContent === "=") {
  //     if (data.operator) {
  //       data.display.textContent = performCalc(parseNumber());
  //       data.operator = null;
  //       data.calcResult = 0;
  //       resetInputHolder();
  //     }
  //   }

  //   if (key.textContent === "back") {
  //     data.holder.pop();
  //     data.display.textContent = data.holder.join("").slice(1);
  //   }

  //   if (key.textContent === "+/-") {
  //     data.holder[1] = String(parseFloat(data.holder[1] * -1));
  //     data.display.textContent = data.holder.join("").slice(1);
  //   }
  // }
})();
