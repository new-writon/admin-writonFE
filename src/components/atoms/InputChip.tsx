import styled from "styled-components";
import { theme } from "../../styles/theme";
import { L2 } from "./Text";
import { FiX } from "./Icons";
import React from "react";

interface InputChip {
  children: React.ReactNode;
  color: "blue" | "gray";
  onClick?: () => void;
  deleteItem?: () => void;
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

const InputChip = ({ children, color, onClick, deleteItem }: InputChip) => {
  return (
    <Container
      as={onClick ? "button" : "div"}
      onClick={onClick}
      $isBtn={deleteItem ? true : false}
      $bgColor={bgColor[color]}
    >
      <L2 color={fontColor[color]}>{children}</L2>
      {deleteItem && (
        <button type="button" onClick={deleteItem}>
          <FiX size={18} color={iconColor[color]} />
        </button>
      )}
    </Container>
  );
};

export default InputChip;

const Container = styled.div<{ $isBtn: boolean; $bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: ${({ $isBtn }) => ($isBtn ? "6px 8px 6px 12px" : "6px 10px")};
  border-radius: 8px;
  background: ${({ $bgColor }) => $bgColor};

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
