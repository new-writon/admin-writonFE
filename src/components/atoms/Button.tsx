import styled from "styled-components";
import { B1, B2 } from "./Text";
import {
  FiDownload,
  FiPlus,
  IoCalendarOutline,
  MdEdit,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "./Icons";
import { theme } from "../../styles/theme";
import {
  fontColor,
  bgColor,
  iconSize,
  padding,
  borderRadius,
} from "../../utils/ButtonAttributes";

interface Button {
  children: React.ReactNode;
  size: "lg" | "md" | "sm";
  type: "dark" | "light" | "empty" | "none";
  onClick?: () => void;
  onSubmit?: () => void;
  fullWidth?: boolean;
  disabled?: boolean; // 비황성화
  style?: React.CSSProperties;
  // ===== 아이콘 =====
  rightPlus?: boolean; // 오른쪽 플러스 아이콘
  rightArrow?: boolean; // 오른쪽 화살표 아이콘
  leftPlus?: boolean; // 왼쪽 플러스 아이콘
  leftArrow?: boolean; // 왼쪽 화살표 아이콘
  editIcon?: boolean; // 수정 아이콘
  downloadIcon?: boolean; // 다운로드 아이콘
  calendarIcon?: boolean; // 캘린더 아이콘
}

interface ContainerProps {
  $bgColor: string;
  $padding: string;
  $borderRadius: string;
}

const Button = ({
  children,
  size,
  type,
  onClick,
  fullWidth,
  disabled,
  style,
  rightPlus,
  rightArrow,
  leftPlus,
  leftArrow,
  editIcon,
  downloadIcon,
  calendarIcon,
}: Button) => {
  return (
    <Container
      disabled={disabled}
      onClick={onClick && onClick}
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
      $padding={type == "none" ? "4px" : padding[size]}
      $borderRadius={borderRadius[size]}
    >
      {editIcon && (
        <MdEdit
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
      {calendarIcon && (
        <IoCalendarOutline
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
      {leftPlus && (
        <FiPlus
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
      {leftArrow && (
        <RiArrowLeftLine
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
      {rightArrow && (
        <RiArrowRightLine
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
      {downloadIcon && (
        <FiDownload
          size={iconSize[size]}
          color={disabled ? fontColor.disabled : fontColor.abled[type]}
        />
      )}
    </Container>
  );
};

export default Button;

const Container = styled.button<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: ${({ $padding }) => $padding};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background: ${({ $bgColor }) => $bgColor};
`;
