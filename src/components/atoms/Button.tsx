import styled from "styled-components";
import { B1, B2 } from "./Text";
import { FiPlus } from "./Icons";
import { theme } from "../../styles/theme";
import {
  fontColor,
  bgColor,
  iconSize,
  padding,
} from "../../utils/ButtonAttributes";

interface Button {
  children: React.ReactNode;
  size: "lg" | "md" | "sm";
  type: "dark" | "light" | "empty" | "none";
  onClick: () => void;
  fullWidth?: boolean;
  rightPlus?: boolean;
  leftPlus?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button = ({
  children,
  size,
  type,
  onClick,
  fullWidth,
  rightPlus,
  leftPlus,
  disabled,
  style,
}: Button) => {
  return (
    <Container
      disabled={disabled}
      onClick={onClick}
      style={{
        width: fullWidth ? "100%" : "fit-content",
        border:
          type == "empty"
            ? `1px solid ${
                disabled ? theme.color.gray[30] : theme.color.brand[50]
              }`
            : "none",
        cursor: disabled ? "default" : "pointer",
        ...style,
      }}
      $bgColor={disabled ? bgColor.disabled[type] : bgColor.abled[type]}
      $padding={padding[size]}
    >
      {leftPlus && (
        <FiPlus
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
      {size == "sm" ? (
        <B2
          weight="sb"
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        >
          {children}
        </B2>
      ) : (
        <B1
          weight="sb"
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        >
          {children}
        </B1>
      )}
      {rightPlus && (
        <FiPlus
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
    </Container>
  );
};

export default Button;

const Container = styled.button<{ $bgColor: string; $padding: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: ${({ $padding }) => $padding};
  border-radius: 10px;
  background: ${({ $bgColor }) => $bgColor};
`;