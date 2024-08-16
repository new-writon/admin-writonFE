import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FaCheck } from "./Icons";
import { L3 } from "./Text";

interface CheckBox {
  text?: string; // 체크박스 텍스트
  size?: number; // 체크박스 크기
  checked: boolean; // 체크박스 상태
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>; // 체크박스 상태변경
  onClick?: (checked: boolean) => void; // 추가적인 기능 (인자로 체크박스 상태 전달)
  disabled?: boolean;
}

interface ContainerProps {
  $checked: boolean;
  $size: number;
  $disabled: boolean;
}

const CheckBox = ({
  text,
  size = 16,
  checked,
  setChecked,
  onClick,
  disabled = false,
}: CheckBox) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    setChecked?.(e.currentTarget.checked);
    onClick?.(checked);
  };

  return (
    <Container $checked={checked} $size={size} $disabled={disabled}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div>
        <FaCheck
          size={9}
          color={theme.color.base.white}
          style={{
            visibility: checked ? "visible" : "hidden",
          }}
        />
      </div>
      {text && <L3 color={theme.color.gray[60]}>{text}</L3>}
    </Container>
  );
};

export default CheckBox;

const Container = styled.label<ContainerProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  input {
    display: none;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $size }) => `${$size}px`};
    height: ${({ $size }) => `${$size}px`};
    border-radius: 3px;
    border: ${({ $checked, theme }) =>
      $checked ? "none" : `1.5px solid ${theme.color.gray[40]}`};
    background: ${({ $checked, theme }) =>
      $checked ? theme.color.brand[50] : "white"};
  }
`;
