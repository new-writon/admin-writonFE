import styled from "styled-components";
import { theme } from "../../styles/theme";
import { L2 } from "./Text";
import { FiX } from "./Icons";
import React from "react";

interface InputChip {
  children: React.ReactNode;
  onClick: () => void;
}

const InputChip = ({ children, onClick }: InputChip) => {
  return (
    <Container>
      <L2 color={theme.color.brand[60]}>{children}</L2>
      <button type="button" onClick={onClick}>
        <FiX size={18} color={theme.color.brand[50]} />
      </button>
    </Container>
  );
};

export default InputChip;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.brand[10]};

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
