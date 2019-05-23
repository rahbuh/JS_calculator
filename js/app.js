const data = {
  display: document.querySelector("#display"),
  calcResult: 0,
  operator: null,
  holder: [0]
};

// clear all values
function init(data) {
  data.display.textContent = "0";
  data.calcResult = 0;
  data.operator = null;
  data.holder.length = 0;
  data.holder.push(0);
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
function displayKey(key, display) {
  display.textContent += key;
}

// Operator closure functions
function makeAdd(x) {
  return function(y) {
    return x + y;
  };
}

function makeSub(x) {
  return function(y) {
    return x - y;
  };
}

function makeMul(x) {
  return function(y) {
    return x * y;
  };
}

function makeDiv(x) {
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

function resetHolder(data) {
  data.holder.length = 0;
  data.holder.push(0);
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
  resetHolder(data);
}

function calculation(key) {
  if (key.textContent === "C") {
    init(data);
  } // clear (reset)

  if (key.textContent >= 0 || key.textContent <= 9) {
    if (data.holder.length <= 1) {
      data.display.textContent = "";
    } // removes leading zero for numbers only

    displayKey(key.textContent, data.display);
    data.holder.push(key.textContent);
  }
  if (key.textContent === "." && data.holder.indexOf(".") === -1) {
    displayKey(key.textContent, data.display);
    data.holder.push(key.textContent);
  } // only allow decimal point one time

  if (key.textContent === "+") {
    performOperation(makeAdd);
  }

  if (key.textContent === "-") {
    performOperation(makeSub);
  }

  if (key.textContent === "*") {
    performOperation(makeMul);
  }

  if (key.textContent === "/") {
    performOperation(makeDiv);
  }

  if (key.textContent === "=") {
    data.calcResult = performCalc(Number(data.holder.join("")));
    data.operator = null;
    data.display.textContent = data.calcResult;
    resetHolder(data);
  }
}

// if key pressed on keyboard
function keyAction(e) {
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (key) {
    keyAnimation(key);
    calculation(key);
  }
}

// if key clicked in browser
function clickAction(e) {
  // e.preventDefault;
  // const key = e.target.textContent;
  // keyAnimation(e.target);
}

(function calculator() {
  data.display.textContent = "0";
  document.addEventListener("keyup", keyAction);
  document.addEventListener("click", clickAction);
})();
