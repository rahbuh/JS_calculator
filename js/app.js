// clear all values
function init() {
  const display = document.querySelector("#display");
  display.textContent = "";
  firstNum = 0;
  secondNum = 0;
  calcResult = 0;

  holder = [];
}

function adder(first) {
  return function(second) {
    return first + second;
  };
}

function subtractor(first) {
  return function(second) {
    return first - second;
  };
}

function multiplier(first) {
  return function(second) {
    return first * second;
  };
}

function divider(first) {
  return function(second) {
    if (second === 0) {
      return NaN;
    }
    return first / second;
  };
}

function keyAnimation(key) {
  key.classList.add("key-clicked");
  key.addEventListener("transitionend", removeTransition);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("key-clicked");
}

function displayKey(key) {
  const display = document.querySelector("#display");
  display.textContent += key;
}

function keyAction(e) {
  let firstNum = 0;
  let secondNum = 0;
  let calcResult = 0;
  const holder = [];

  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (key) {
    keyAnimation(key);
    if (key.textContent === "C") {
      const display = document.querySelector("#display");
      display.textContent = "";
      firstNum = 0;
      secondNum = 0;
      calcResult = 0;

      holder = [];
    }
    if (key.textContent >= 0 || key.textContent <= 9) {
      displayKey(key.textContent);
      holder.push(key.textContent);
    }
    if (key.textContent === "." && holder.indexOf(".") === -1) {
      displayKey(key.textContent);
      holder.push(key.textContent);
    }

    if (key.textContent === "+") {
      if (holder.length > 0) {
        firstNum = Number(holder.join(""));
        holder = [];
        display.textContent = "";
      }
      const add = adder(firstNum);
      console.log(firstNum);
      console.log(holder);
      console.log(add(3));
    }

  }
    console.log(holder)
}

function clickAction(e) {
  const key = e.target.textContent;

  keyAnimation(e.target);
}

(function calculator() {
  console.log("ready to calculate");
  window.addEventListener("keyup", keyAction);
  window.addEventListener("click", clickAction);
})();
