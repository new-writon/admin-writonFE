import React from "react";
import styled from "styled-components";

interface RadioButton {
  option: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButton = ({
  option,
  selectedOption,
  setSelectedOption,
}: RadioButton) => {
  return (
    <RadioLabel $selected={selectedOption === option}>
      <input
        type="radio"
        value={option}
        checked={selectedOption === option}
        onChange={(e) => setSelectedOption(e.currentTarget.value)}
      />
      <span />
    </RadioLabel>
  );
};

export default RadioButton;

const RadioLabel = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.color.gray[40]};

  input {
    width: 100%;
    height: 100%;
    display: none;
  }

  span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ theme, $selected }) =>
      $selected ? theme.color.brand[50] : "transparent"};
  }
`;
