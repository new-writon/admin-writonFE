import styled from "styled-components";
import { FlexBox } from "../atoms";
import { theme } from "../../styles/theme";

import React from "react";
import { FaCheck } from "../atoms/Icons";

interface ColorPalette {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}

const ColorPalette = ({
  selectedColor,
  setSelectedColor,
  disabled = false,
}: ColorPalette) => {
  const colorList = [
    {
      name: "brand",
      color: theme.color.brand[30],
    },
    {
      name: "red",
      color: "#FF4D56",
    },
    {
      name: "orange",
      color: "#FFA24D",
    },
    {
      name: "yellow",
      color: "#FFED4D",
    },
    {
      name: "green",
      color: "#4BDC5A",
    },
    {
      name: "emerald",
      color: "#4BDCD3",
    },
    {
      name: "skyblue",
      color: "#31BDFA",
    },
    {
      name: "navy",
      color: "#244A94",
    },
    {
      name: "purple",
      color: "#AC62E6",
    },
    {
      name: "pick",
      color: "#F87BE4",
    },
    {
      name: "gray",
      color: "#252525",
    },
  ];

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
