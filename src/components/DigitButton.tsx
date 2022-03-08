import React from "react";
import calc from "../store/calculator";

interface DigitButtonProps {
  digit: string;
}

const DigitButton: React.FC<DigitButtonProps> = ({ digit }) => {
  return <button onClick={() => calc.addDigit(digit)}>{digit}</button>;
};

export default DigitButton;
