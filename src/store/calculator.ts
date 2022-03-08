import { makeAutoObservable } from "mobx";
import { getCulculutedValue } from "../helpers/index";

interface ICalculator {
  prev: string;
  curr: string;
  result: string;
  operation: string;
  overwrite: boolean;
  clear: () => void;
  evaluate: (calcInputValue: string) => void;
  addDigit: (digit: string) => void;
}

class Calculator implements ICalculator {
  prev: string = "";
  curr: string = "";
  result: string = "";
  operation: string = "";
  overwrite: boolean = false;
  inputValue: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.curr = "";
    this.prev = "";
    this.operation = "";
    this.inputValue = "";
    this.result = "";
    this.overwrite = false;
  }

  delete() {
    this.inputValue = this.inputValue.slice(0, -1);
    this.curr = this.curr.slice(0, -1);
  }

  addDigit(digit: string) {
    if (this.overwrite && !this.operation) {
      this.curr = "";
      this.prev = "";
      this.result = "";
      this.overwrite = false;
    }
    if (digit === "." && this.curr.includes(".")) return this.curr;
    if (digit === "0" && this.curr === "0") return this.curr;
    if (this.curr[0] === "0" && this.curr.length === 1) {
      this.curr = "";
    }
    if (digit === "." && this.curr === "") {
      this.curr = "0";
    }

    this.curr = `${this.curr}${digit}`;
    this.inputValue.length < 10
      ? (this.inputValue = `${this.prev}${this.curr}`)
      : this.inputValue;
  }

  chooseOperations(operation: string) {
    const isDoubledOperation = /[*+/-]/.test(
      this.inputValue[this.inputValue.length - 1]
    );
    const isOperationFirst =
      this.curr === "" && this.prev === "" && operation !== "-";

    if (isOperationFirst) return this.curr;
    if (isDoubledOperation || this.overwrite) {
      operation = "";
    }

    this.inputValue = this.inputValue + operation;
    this.prev = this.inputValue;
    this.curr = "";
  }

  evaluate() {
    const computation: number = getCulculutedValue(this.inputValue);

    function round(num: number): number {
      return Math.round(num * Math.pow(10, 5)) / Math.pow(10, 5);
    }

    this.prev = round(computation).toString();
    if (this.prev === "Infinity") {
      this.prev = "you can't divide by 0";
    }
    this.curr = "";
    this.operation = "";
    this.inputValue = "";
    this.overwrite = true;

    this.result = this.prev;
  }
}

export default new Calculator();
