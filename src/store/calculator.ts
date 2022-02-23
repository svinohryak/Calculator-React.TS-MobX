import { makeAutoObservable } from "mobx";

interface ICalculator {
  prev: string;
  curr: string;
  result: string;
  operation: string;
  overwrite: boolean;
  clear: () => void;
  evaluate: () => void;
  addDigit: (digit: string) => void;
}

class Calculator implements ICalculator {
  prev: string = "";
  curr: string = "";
  result: string = "";
  operation: string = "";
  overwrite: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.curr = "";
    this.prev = "";
    this.operation = "";
  }
  delete() {
    this.curr = this.curr.slice(0, -1);
  }
  addDigit(digit: string) {
    if (this.overwrite && !this.operation) {
      this.curr = "";
      this.prev = "";
      this.overwrite = false;
    }
    if (digit === "." && this.curr.includes(".")) return this.curr;
    if (digit === "0" && this.curr === "0") return this.curr;
    if (this.curr[0] === "0" && this.curr.length === 1) {
      console.log(this.curr);

      this.curr = "";
      console.log(this.curr);
    }
    if (digit === "." && this.curr === "") return (this.curr = "0.");
    this.curr = `${this.curr}${digit}`;
  }

  evaluate() {
    const prevNum: number = parseFloat(this.prev);
    const currentNum: number = parseFloat(this.curr);
    if (isNaN(prevNum) || isNaN(currentNum)) return "";
    let computation: string | number = "";
    switch (this.operation) {
      case "+":
        computation = prevNum + currentNum;
        break;
      case "-":
        computation = prevNum - currentNum;
        break;
      case "*":
        computation = prevNum * currentNum;
        break;
      case "÷":
        computation = prevNum / currentNum;
        break;
      case "%":
        computation = (prevNum * currentNum) / 100;
        break;
    }

    this.prev = computation.toString();
    this.curr = "";
    this.operation = "";
    this.overwrite = true;
  }

  chooseOperations(operation: string) {
    if (this.curr === "" && this.prev === "") return this.curr;
    if (this.prev === "") {
      this.operation = operation;
      this.prev = this.curr;
      this.curr = "";
    }
    if (!this.operation) {
      this.operation = operation;
    }
    if (this.operation && !this.curr) {
      this.operation = operation;
    }
  }
}

export default new Calculator();
