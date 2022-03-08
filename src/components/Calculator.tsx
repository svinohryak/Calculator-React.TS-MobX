import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import calc from "../store/calculator";
import DigitButton from "../components/DigitButton";
import OperationButton from "../components/OperationButton";

const WrapperGrid = styled.div`
  display: grid;
  margin-top: 2rem;
  justify-content: center;
  gap: 0.1rem;
  grid-template-columns: repeat(4, 6rem);
  grid-template-rows: minmax(7rem, auto) repeat(5, 6rem);
  & > button {
    cursor: pointer;
    font-size: 2rem;
    border: 1px solid #fff;
    outline: none;
  }
  & > .double-button {
    grid-column: span 2;
  }
`;

const Output = styled.div`
  grid-column: 1 / 5;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0.75rem;
  word-wrap: break-word;
  word-break: break-all;
  & > .prev {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1.7rem;
  }
  & > .curr {
    color: white;
    font-size: 2.5rem;
  }
`;

const Calculator: React.FC = observer(() => {
  return (
    <WrapperGrid>
      <Output>
        <div className="prev">{calc.inputValue}</div>
        <div className="curr">{calc.result}</div>
      </Output>
      <button onClick={() => calc.clear()}>AC</button>
      <button onClick={() => calc.delete()}>DEL</button>
      <OperationButton operation="%" />
      <OperationButton operation="/" />
      <DigitButton digit="1" />
      <DigitButton digit="2" />
      <DigitButton digit="3" />
      <OperationButton operation="*" />
      <DigitButton digit="4" />
      <DigitButton digit="5" />
      <DigitButton digit="6" />
      <OperationButton operation="+" />
      <DigitButton digit="7" />
      <DigitButton digit="8" />
      <DigitButton digit="9" />
      <OperationButton operation="-" />
      <DigitButton digit="." />
      <DigitButton digit="0" />
      <button className="double-button" onClick={() => calc.evaluate()}>
        =
      </button>
    </WrapperGrid>
  );
});

export default Calculator;
