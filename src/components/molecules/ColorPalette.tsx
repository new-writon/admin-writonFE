import styled from "styled-components";
import { FlexBox } from "../atoms";
import { theme } from "../../styles/theme";

import React from "react";
import { FaCheck } from "../atoms/Icons";
import { colorList } from "../../data/Colors";

interface ColorPalette {
  selectedColor: string;
  setSelectedColor:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  disabled?: boolean;
}

const ColorPalette = ({
  selectedColor,
  setSelectedColor,
  disabled = false,
}: ColorPalette) => {
  const onClickColorBtn = (color: string) => {
    if (color != selectedColor) {
      setSelectedColor(color);
    }
  };

  return (
    <FlexBox fullWidth gap={14} style={{ flexWrap: "wrap" }}>
      {colorList.map(({ name, color }) => (
        <ColorBtn
          key={name}
          $color={color}
          onClick={() => onClickColorBtn(name)}
          disabled={disabled}
          $disabled={disabled}
        >
          {name == selectedColor && (
            <FaCheck color={theme.color.base.white} size={14} />
          )}
        </ColorBtn>
      ))}
    </FlexBox>
  );
};

export default ColorPalette;

const ColorBtn = styled.button<{ $color: string; $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  border: 1.5px solid ${({ theme }) => theme.color.gray[30]};
  background-color: ${({ $color }) => $color};
  opacity: 0.5;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "cursor")};
`;
