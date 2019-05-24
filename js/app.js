(function calculator() {
  const data = {
    display: document.querySelector("#display"),
    calcResult: 0,
    operator: null,
    holder: [0]
  };

  // add key press listener
  document.addEventListener("keyup", keyPressAction);

  // add browser key click listener
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    key.addEventListener("click", clickAction);
  });

  function init() {
    data.display.textContent = "0";
    data.calcResult = 0;
    data.operator = null;
    data.holder.length = 0;
    data.holder.push(0);
  }

  function resetInputHolder() {
    data.holder.length = 0;
    data.holder.push(0);
  }

  // Operator closure functions
  function makeAdd(x) {
    return function(y) {
      return x + y;
    };
  }

  function makeSubtract(x) {
    return function(y) {
      return x - y;
    };
  }

  function makeMultiply(x) {
    return function(y) {
      return x * y;
    };
  }

  function makeDivide(x) {
    return function(y) {
      if (y === 0) {
        return "Error: cannot divide by 0";
      }
      return x / y;
    };
  }

  // Create operator closure
  function createOperator(num, makeOp) {
    return makeOp(num);
  }

  // Use operator closure to calculate
  function performCalc(num) {
    return data.operator(num);
  }

  // Show key pressed animation
  function keyAnimation(key) {
    key.classList.add("key-clicked");
    key.addEventListener("transitionend", removeTransition);
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("key-clicked");
  }

  // Show selected number or decimal point on display
  function displaySelectedChar(key, display) {
    console.log(display.textContent);
    if (data.holder.length <= 1 && key === ".") {
      key = "0.";
      display.textContent = key;
    } else {
      display.textContent += key;
    }
  }

  // key pressed action
  function keyPressAction(e) {
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    if (key) {
      keyAnimation(key);
      processInput(key);
    }
  }
  // browser click action
  function clickAction(e) {
    const key = e.target;
    keyAnimation(key);
    processInput(key);
  }

  function performOperation(fn) {
    if (!data.operator) {
      data.calcResult += Number(data.holder.join(""));
      data.operator = createOperator(data.calcResult, fn);
    } else {
      data.calcResult = performCalc(Number(data.holder.join("")));
      data.operator = createOperator(data.calcResult, fn);
    }
    data.display.textContent = data.calcResult;
    resetInputHolder();
  }

  function processInput(key) {
    // reset
    if (key.textContent === "C") {
      init(data);
    }
    // if numeric key is pressed
    if (key.textContent >= 0 || key.textContent <= 9) {
      if (data.holder.length <= 1) {
        data.display.textContent = "";
      }
      displaySelectedChar(key.textContent, data.display);
      data.holder.push(key.textContent);
    }
    // if decimal point is pressed
    if (key.textContent === "." && data.holder.indexOf(".") === -1) {
      displaySelectedChar(key.textContent, data.display);
      data.holder.push(key.textContent);
    }

    if (key.textContent === "+") {
      performOperation(makeAdd);
    }

    if (key.textContent === "-") {
      performOperation(makeSubtract);
    }

    if (key.textContent === "*") {
      performOperation(makeMultiply);
    }

    if (key.textContent === "/") {
      performOperation(makeDivide);
    }

    if (key.textContent === "=") {
      if (data.operator) {
        const total = performCalc(Number(data.holder.join("")));
        data.display.textContent = total;
        data.operator = null;
        data.calcResult = 0;
        resetInputHolder();
        data.holder.push(total);
      }
    }
    console.log(data.holder);
    console.log(data.calcResult);
    // console.log(data.display.textContent);
    // console.log(data.operator);
  }
})();
