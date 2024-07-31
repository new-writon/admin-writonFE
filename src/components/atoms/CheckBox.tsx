import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FaCheck } from "./Icons";
import { L3 } from "./Text";

interface CheckBox {
  text?: string; // 체크박스 텍스트
  checked: boolean; // 체크박스 상태
  setChecked: React.Dispatch<React.SetStateAction<boolean>>; // 체크박스 상태변경
  onClick?: (checked: boolean) => void; // 추가적인 기능 (인자로 체크박스 상태 전달)
}

const CheckBox = ({ text, checked, setChecked, onClick }: CheckBox) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    setChecked(e.currentTarget.checked);
    onClick?.(checked);
  };

  return (
    <Container checked={checked}>
      <input type="checkbox" checked={checked} onChange={onChange} />
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

const Container = styled.label<{ checked: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: ${({ checked, theme }) =>
      checked ? "none" : `1.5px solid ${theme.color.gray[40]}`};
    background: ${({ checked, theme }) =>
      checked ? theme.color.brand[50] : "white"};
  }
`;
