import styled from "styled-components";
import { theme } from "../../styles/theme";
import { L2, L3 } from "./Text";
import { FiX } from "./Icons";
import React from "react";

interface InputChip {
  children: React.ReactNode;
  color: "blue" | "gray";
  size: "lg" | "sm";
  onClick?: () => void;
  deleteItem?: () => void;
  disabled?: boolean;
}

const fontColor = {
  blue: theme.color.brand[60],
  gray: theme.color.gray[80],
};

const bgColor = {
  blue: theme.color.brand[10],
  gray: theme.color.gray[20],
};

const iconColor = {
  blue: theme.color.brand[50],
  gray: theme.color.gray[50],
};

const InputChip = ({
  children,
  color,
  size,
  onClick,
  deleteItem,
  disabled = false,
}: InputChip) => {
  return (
    <Container
      as={onClick ? "button" : "div"}
      onClick={onClick}
      $hasBtn={deleteItem ? true : false}
      $bgColor={bgColor[color]}
      $disabled={disabled}
      disabled={disabled}
    >
      {size == "lg" ? (
        <L2 color={disabled ? theme.color.gray[60] : fontColor[color]}>
          {children}
        </L2>
      ) : (
        <L3 color={disabled ? theme.color.gray[60] : fontColor[color]}>
          {children}
        </L3>
      )}
      {deleteItem && (
        <button type="button" onClick={deleteItem}>
          <FiX size={18} color={iconColor[color]} />
        </button>
      )}
    </Container>
  );
};

export default InputChip;

const Container = styled.div<{
  $hasBtn: boolean;
  $bgColor: string;
  $disabled: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: ${({ $hasBtn }) => ($hasBtn ? "6px 8px 6px 12px" : "6px 10px")};
  border-radius: 8px;
  background: ${({ $bgColor, $disabled, theme }) =>
    $disabled ? theme.color.gray[20] : $bgColor};

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
