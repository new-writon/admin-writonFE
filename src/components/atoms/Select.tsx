import styled from "styled-components";
import { B2 } from "./Text";
import React from "react";
import { theme } from "../../styles/theme";

interface Select {
  children: React.ReactNode;
  type: "default" | "outline" | "fill" | "disabled";
  onClick?: () => void;
}

interface ContainerProps {
  $type: "default" | "outline" | "fill" | "disabled";
}

const fontColor = {
  default: theme.color.gray[80],
  outline: theme.color.brand[60],
  fill: theme.color.brand[50],
  disabled: theme.color.gray[50],
};

const borderColor = {
  default: theme.color.gray[40],
  outline: theme.color.brand[50],
  fill: "transparent",
  disabled: theme.color.gray[30],
};

const Select = ({ children, type, onClick }: Select) => {
  return (
    <Container
      as={onClick ? "button" : "div"}
      onClick={onClick}
      $type={type}
      disabled={onClick ? false : true}
    >
      <B2 color={fontColor[type]} as="span">{children}</B2>
    </Container>
  );
};

export default Select;

const Container = styled.button<ContainerProps>`
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid ${({ $type }) => borderColor[$type]};
`;
