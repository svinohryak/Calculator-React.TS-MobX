String.prototype.isNumeric = function () {
  return !isNaN(parseFloat(this)) && isFinite(this);
};

Array.prototype.clean = function () {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
};

function MathSolver() {
  this.infixToPostfix = function (infix) {
    let outputQueue = "";
    const operatorStack = [];
    const operators = {
      "^": {
        precedence: 4,
        associativity: "Right"
      },
      "/": {
        precedence: 3,
        associativity: "Left"
      },
      "*": {
        precedence: 3,
        associativity: "Left"
      },
      "%": {
        precedence: 3,
        associativity: "Left"
      },
      "+": {
        precedence: 2,
        associativity: "Left"
      },
      "-": {
        precedence: 2,
        associativity: "Left"
      }
    };
    infix = infix.replace(/\s+/g, "");
    infix = infix.split(/([\+\-\*\%\/\^\(\)])/).clean();
    for (let i = 0; i < infix.length; i++) {
      let token = infix[i];
      if (token.isNumeric()) {
        outputQueue += token + " ";
      } else if ("^*%/+-".indexOf(token) !== -1) {
        let o1 = token;
        let o2 = operatorStack[operatorStack.length - 1];
        while (
          "^*%/+-".indexOf(o2) !== -1 &&
          ((operators[o1].associativity === "Left" &&
            operators[o1].precedence <= operators[o2].precedence) ||
            (operators[o1].associativity === "Right" &&
              operators[o1].precedence < operators[o2].precedence))
        ) {
          outputQueue += operatorStack.pop() + " ";
          o2 = operatorStack[operatorStack.length - 1];
        }
        operatorStack.push(o1);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue += operatorStack.pop() + " ";
        }
        operatorStack.pop();
      }
    }
    while (operatorStack.length > 0) {
      outputQueue += operatorStack.pop() + " ";
    }
    return outputQueue;
  };
}

let ms = new MathSolver();

export const getCulculutedValue = (string: string) => {
  if (/[*/+-]/.test(string[string.length - 1])) {
    string = string.slice(0, -1);
  }

  const postfixString: string = ms.infixToPostfix(string);
  const regPercent = /%(\s\d+\s)[*/]/;
  const regNegative = /^(\d+\s-)/;
  const isPercentFirst = regPercent.test(postfixString);
  const isNegative = regNegative.test(postfixString);

  const s: number[] = [],
    tokens = postfixString.split(" ");
  for (const t of tokens) {
    const n = Number(t);
    if (!isNaN(n)) {
      s.push(n);
    } else {
      const o2 = s.pop(),
        o1 = s.pop();
      switch (t) {
        case "+":
          s.push(o1 + o2);
          break;
        case "-":
          isNegative ? s.push(0 - o2) : s.push(o1 - o2);
          break;
        case "*":
          s.push(o1 * o2);
          break;
        case "%":
          if (isPercentFirst && o1) {
            s.push(o1, o2 / 100);
          }
          if (!isPercentFirst && o1) {
            s.push(o1, (o1 / 100) * o2);
          }
          if (!o1) {
            s.push(o2 / 100);
          }
          break;
        case "/":
          s.push(o1 / o2);
          break;
        case "^":
          s.push(Math.pow(o1, o2));
          break;
        default:
          throw new Error(`Unrecognized operator: [${t}]`);
      }
    }
  }
  return s[0];
};
