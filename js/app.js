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

// Show select number or decimal point on display
function displayKey(key, display) {
  display.textContent += key;
}

// Operation closure functions
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
    return x * y;
  };
}

function createOperator(data, makeOp) {
  let currentNum = Number(data.holder.join("")) + data.calcResult;
  data.holder.length = 0;
  data.holder.push(0);
  data.display.textContent = currentNum;
  return makeOp(currentNum);
}

function performCalc(data) {
  let currentNum = Number(data.holder.join(""));
  data.holder.length = 0;
  data.holder.push(0);
  let result = data.operator(currentNum);
  data.display.textContent = result;
  return result;
}

// if key pressed on keyboard
function keyAction(e) {
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (key) {
    keyAnimation(key);

    if (key.textContent === "C") {
      init(data);
    }

    if (key.textContent >= 0 || key.textContent <= 9) {
      if (data.holder.length <= 1) {
        data.display.textContent = "";
        displayKey(key.textContent, data.display);
        data.holder.push(key.textContent);
      } else {
        displayKey(key.textContent, data.display);
        data.holder.push(key.textContent);
      }
    }

    if (key.textContent === "." && data.holder.indexOf(".") === -1) {
      displayKey(key.textContent, data.display);
      data.holder.push(key.textContent);
    }

    if (key.textContent === "+") {
      if (!data.operator) {
        console.log("createOperator");
        data.operator = createOperator(data, makeAdd);
      } else {
        console.log("performCalc");
        data.calcResult = performCalc(data);
        data.operator = null;
      }
    }

    console.log("holder: ", data.holder);
  }
}

// if key clicked in browser
function clickAction(e) {
  const key = e.target.textContent;
  keyAnimation(e.target);
}

(function calculator() {
  console.log("ready to calculate");
  data.display.textContent = "0";
  window.addEventListener("keyup", keyAction);
  window.addEventListener("click", clickAction);
})();
