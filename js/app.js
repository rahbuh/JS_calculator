(function() {
  // EVENT LISTENER FOR KEY PRESS
  document.addEventListener("keyup", keyPressAction);

  const isMobile = isMobileDevice();
  const data = {
    displayWindow: document.querySelector("#display"),
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

  function init() {
    const keys = document.querySelectorAll("div[data-key]");
    addListeners(keys);
  }

  function addListeners(keys) {
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", clickAction);
    }
  }

  // MOUSE CLICK ACTION
  function clickAction(e) {
    const keyElement = e.target;
    processKey(keyElement);
  }

  // KEY PRESS ACTION
  function keyPressAction(e) {
    const keyElement = document.querySelector(`.key[data-key="${e.key}"]`);
    processKey(keyElement);
  }

  function processKey(keyElement) {
    const key = keyElement.dataset.key;

    if (key) {
      if (!isMobile) {
        keyAnimation(keyElement);
      }
      processInput(key);
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

  // TEST IF DISPLAYING ON MOBILE DEVICE
  function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  function processNumber(input, { currentOperand, digitCount }) {
    const decimalFound = currentOperand.indexOf(".") !== -1;

    if (digitCount < 20) {
      currentOperand += input;
      digitCount += 1;

      if (!decimalFound) {
        currentOperand = String(parseFloat(currentOperand));
      }

      displayNumber(currentOperand);
      data.currentOperand = currentOperand;
      data.digitCount = digitCount;
    }
  }

  function processDecimal(input, { currentOperand }) {
    const decimalFound = currentOperand.indexOf(".") !== -1;

    if (decimalFound) {
      return;
    } else {
      currentOperand += input;
      displayNumber(currentOperand);
      data.currentOperand = currentOperand;
    }
  }

  function backspace({ currentOperand, digitCount }) {
    let operandLength = currentOperand.length;

    operandLength < 2
      ? (currentOperand = "0")
      : (currentOperand = currentOperand.slice(0, operandLength - 1));

    digitCount -= 1;
    displayNumber(currentOperand);
    data.currentOperand = currentOperand;
    data.digitCount = digitCount;
  }

  function displayNumber(result) {
    data.displayWindow.textContent = result;
  }

  // PROCESS INPUT
  function processInput(input) {
    switch (input) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        processNumber(input, data);
        break;
      case ".":
        processDecimal(input, data);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        console.log("Operator: ", input);
        break;
      case "mem-clear":
        console.log("Memory: ", input);
        break;
      case "mem-recall":
        console.log("Memory: ", input);
        break;
      case "mem-plus":
      case "mem-minus":
        console.log("Memory: ", input);
        break;
      case "Enter":
        console.log("Enter: ", input);
        break;
      case "Backspace":
        backspace(data);
        break;
      case "Delete":
        console.log("Delete: ", input);
        break;
      case "negate":
        console.log("Negate: ", input);
        break;
      default:
        break;
    }
  }

  init();
})();

// (function() {

//   const data = {
//     displayWindow: document.querySelector("#display"),
//     currentOperand: "0",
//     calculation: {
//       operand1: null,
//       operand2: null,
//       operator: null
//     },
//     memory: 0,
//     digitCount: 0
//   };

//   // RESETS
//   function reset() {
//     data.displayWindow.textContent = 0;
//     data.currentOperand = "0";
//     data.calculation = {
//       operand1: null,
//       operand2: null,
//       operator: null
//     };
//     data.digitCount = 0;
//   }

//   function resetOperand() {
//     data.currentOperand = "0";
//   }

//   function updateCalculationObj(result, operation) {
//     data.calculation = {
//       operand1: result,
//       operand2: null,
//       operator: operation
//     };
//   }

//   // PROCESS INPUT
//   function processInput(input) {
//     switch (input) {
//       case "0":
//       case "1":
//       case "2":
//       case "3":
//       case "4":
//       case "5":
//       case "6":
//       case "7":
//       case "8":
//       case "9":
//         processNumber(input, data.currentOperand);
//         break;
//       case ".":
//         processDecimal(input, data.currentOperand);
//         break;
//       case "+":
//       case "-":
//       case "*":
//       case "/":
//         performOperation(input, data.currentOperand);
//         break;
//       case "MemClear":
//         clearMemory();
//         break;
//       case "MemRecall":
//         recallMemory();
//         break;
//       case "MemPlus":
//       case "MemMinus":
//         addSubMemory(input);
//         break;
//       case "Enter":
//         totalCalulation(data.calculation, data.currentOperand);
//         break;
//       case "Backspace":
//         backspace(data.currentOperand);
//         break;
//       case "Delete":
//         reset();
//         break;
//       case "neg":
//         negate(data.currentOperand);
//         break;
//       default:
//         console.log("No match for key selected");
//         break;
//     }
//   }

//   function negate(currentOperand) {
//     let negative;
//     let operand = data.calculation.operand1;

//     if (operand !== null && currentOperand === "0") {
//       negative = operand * -1;
//       data.calculation.operand1 = negative;
//     } else {
//       negative = currentOperand * -1;
//       updateCurrentOperand(negative);
//     }
//     displayNumber(negative);
//   }

//   // OPERATIONS
//   function performOperation(operation, currentOperand) {
//     const { operand1, operator } = data.calculation;

//     if (operator === null) {
//       if (operand1 === null) {
//         data.calculation.operand1 = parseFloat(currentOperand);
//         data.calculation.operator = operation;
//         resetOperand();
//       } else {
//         data.calculation.operand2 = parseFloat(currentOperand);
//         data.calculation.operator = operation;
//       }
//     } else {
//       data.calculation.operand2 = parseFloat(currentOperand);
//       processCalculation(operation);
//     }
//   }

//   function processCalculation(operation) {
//     let result = runCalculation(data.calculation);

//     displayNumber(result);
//     if (typeof result !== "number") {
//       result = null;
//       operation = null;
//     }
//     updateCalculationObj(result, operation);
//     resetOperand();
//   }

//   function runCalculation({ operand1, operand2, operator }) {
//     const equationComplete =
//       operand1 !== null && operand2 !== null && operator !== null;
//     let result = 0;

//     if (equationComplete) {
//       switch (operator) {
//         case "+":
//           result = calculate(operand1, operand2, add);
//           break;
//         case "-":
//           result = calculate(operand1, operand2, subtract);
//           break;
//         case "*":
//           result = calculate(operand1, operand2, multiply);
//           break;
//         case "/":
//           result = calculate(operand1, operand2, divide);
//           break;
//         default:
//           result = "operation error";
//           break;
//       }
//       return result;
//     }
//   }

//   function calculate(operand1, operand2, calcFn) {
//     return calcFn(operand1, operand2);
//   }

//   function add(addend1, addend2) {
//     if (isFloat(addend1) || isFloat(addend2)) {
//       return addOrSubFloat(addend1, addend2, "add");
//     } else {
//       return addend1 + addend2;
//     }
//   }

//   function subtract(minuend, subtrahend) {
//     if (isFloat(minuend) || isFloat(subtrahend)) {
//       return addOrSubFloat(minuend, subtrahend, "sub");
//     } else {
//       return minuend - subtrahend;
//     }
//   }

//   function multiply(factor1, factor2) {
//     if (isFloat(factor1) || isFloat(factor2)) {
//       return multOrDivFloat(factor1, factor2, "mult");
//     } else {
//       return factor1 * factor2;
//     }
//   }

//   function divide(dividend, divisor) {
//     if (dividend === 0 && divisor === 0) {
//       return "Result is undefined";
//     } else if (divisor === 0) {
//       return "Cannot divide by zero";
//     } else {
//       if (isFloat(dividend) || isFloat(divisor)) {
//         return multOrDivFloat(dividend, divisor, "div");
//       } else {
//         return dividend / divisor;
//       }
//     }
//   }

//   function isFloat(num) {
//     return String(num).indexOf(".") !== -1;
//   }

//   function addOrSubFloat(num1, num2, operation) {
//     const decimalPlaces = findMaxDecimalPlaces(num1, num2);
//     const wholeNum1 = convertToWholeNumber(num1, decimalPlaces);
//     const wholeNum2 = convertToWholeNumber(num2, decimalPlaces);
//     let result = 0;

//     operation === "add"
//       ? (result = wholeNum1 + wholeNum2)
//       : (result = wholeNum1 - wholeNum2);

//     return convertToDecimal(result, decimalPlaces);
//   }

//   function multOrDivFloat(num1, num2, operation) {
//     const decimalCount1 = countDecimalPlaces(String(num1));
//     const decimalCount2 = countDecimalPlaces(String(num2));
//     const wholeNum1 = convertToWholeNumber(num1, decimalCount1);
//     const wholeNum2 = convertToWholeNumber(num2, decimalCount2);
//     const decimalPlaces = decimalCount1 + decimalCount2;
//     let result = 0;

//     operation === "mult"
//       ? (result = wholeNum1 * wholeNum2)
//       : (result = wholeNum1 / wholeNum2);

//     return convertToDecimal(result, decimalPlaces);
//   }

//   function findMaxDecimalPlaces(num1, num2) {
//     return Math.max(
//       countDecimalPlaces(String(num1)),
//       countDecimalPlaces(String(num2))
//     );
//   }

//   function countDecimalPlaces(strNum) {
//     const numberLength = strNum.length - 1;
//     const decimalIndex = strNum.indexOf(".");
//     return decimalIndex === -1 ? 0 : numberLength - decimalIndex;
//   }

//   function convertToWholeNumber(num, decimalPlaces) {
//     let wholeNum = Number(num);
//     if (decimalPlaces > 0) {
//       for (let i = 1; i <= decimalPlaces; i++) {
//         wholeNum *= 10;
//       }
//     }
//     return Math.round(wholeNum);
//   }

//   function convertToDecimal(result, decimalPlaces) {
//     if (decimalPlaces > 0) {
//       for (let i = 1; i <= decimalPlaces; i++) {
//         result /= 10;
//       }
//     }
//     return result;
//   }

//   function totalCalulation(calculation, currentOperand) {
//     if (calculation.operand1 === null) {
//       data.currentOperand = currentOperand;
//     } else {
//       performOperation(null, currentOperand);
//     }
//   }

//   function recallMemory() {
//     const { operator } = data.calculation;
//     data.displayWindow.textContent = data.memory;

//     !operator
//       ? (data.calculation.operand1 = data.memory)
//       : (data.currentOperand = String(data.memory));
//   }

//   function addSubMemory(input) {
//     input === "MemPlus"
//       ? (data.memory += Number(data.displayWindow.textContent))
//       : (data.memory -= Number(data.displayWindow.textContent));
//     resetOperand();
//   }

//   function clearMemory() {
//     data.memory = 0;
//   }

//   init();
// })();
