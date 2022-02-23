import React from "react";
import calc from "../store/calculator";

interface DigitButtonProps {
  operation: string;
}

const OperationButton: React.FC<DigitButtonProps> = ({ operation }) => {
  return (
    <button onClick={() => calc.chooseOperations(operation)}>
      {operation}
    </button>
  );
};

export default OperationButton;
