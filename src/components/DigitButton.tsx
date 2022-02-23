import React from "react";
import calc from "../store/calculator";

// enum CalcMethods {
//   ADD_DIGIT = "addDigit"
// }

interface DigitButtonProps {
  digit: string;
  // callBack: any;
  // callBack: (digit: string) => void;
}

const DigitButton: React.FC<DigitButtonProps> = ({ digit }) => {
  // return <button onClick={() => calc.CalcMethods.ADD_DIGIT(digit)}>{digit}</button>;
  return <button onClick={() => calc.addDigit(digit)}>{digit}</button>;
};

export default DigitButton;
