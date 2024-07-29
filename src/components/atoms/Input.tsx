import styled from "styled-components";
import { FlexBox } from ".";
import { B2, L3 } from "./Text";
import { theme } from "../../styles/theme";
import { FiX } from "./Icons";

interface Input {
  title?: string;
  subTitle?: string;
  placeHolder?: string;
  error?: string;
  limitNum?: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  hasDeleteBtn?: boolean;
}

const Input = ({
  title,
  subTitle,
  placeHolder,
  error,
  limitNum,
  value,
  setValue,
  hasDeleteBtn,
}: Input) => {
  return (
    <FlexBox col gap={6} fullWidth>
      {/* ========== Title ========== */}
      <FlexBox col gap={2}>
        {title && <B2 weight="sb">{title}</B2>}
        {subTitle && <L3 color={theme.color.gray[60]}>{subTitle}</L3>}
      </FlexBox>

      {/* ========== Input ========== */}
      <InputContainer>
        <input
          placeholder={placeHolder}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        {hasDeleteBtn && (
          <button onClick={() => setValue("")}>
            <FiX size={20} color={theme.color.gray[80]} />
          </button>
        )}
      </InputContainer>

      {/* ========== Bottom Info ========== */}
      {(error || limitNum) && (
        <FlexBox fullWidth align="center" justify="space-between">
          <L3 color={theme.color.red[60]}>{error}</L3>
          {limitNum && (
            <L3 color={theme.color.gray[60]}>
              {value.length}/{limitNum}
            </L3>
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Input;

const InputContainer = styled.div`
  display: flex;
  width: 370px;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray[40]};
  background: ${({ theme }) => theme.color.base.white};

  input {
    flex: 1;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: ${({ theme }) => theme.color.gray[100]};
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;
