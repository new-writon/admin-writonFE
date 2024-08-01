import styled from "styled-components";
import { FlexBox } from "../atoms";
import { L3 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { FiX } from "../atoms/Icons";

interface Input {
  placeHolder?: string;
  error?: string;
  maxLength?: number;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  hasDeleteBtn?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Input = ({
  placeHolder,
  error,
  maxLength,
  value,
  setValue,
  hasDeleteBtn,
  fullWidth,
  disabled = false,
}: Input) => {
  return (
    <FlexBox col gap={6} style={{ width: fullWidth ? "100%" : "370px" }}>
      {/* ========== Input ========== */}
      <InputContainer $disabled={disabled}>
        <input
          placeholder={placeHolder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue?.(e.currentTarget.value)}
          disabled={disabled}
        />
        {hasDeleteBtn && (
          <button onClick={() => setValue?.("")} disabled={disabled}>
            <FiX
              size={18}
              color={disabled ? theme.color.gray[50] : theme.color.gray[80]}
            />
          </button>
        )}
      </InputContainer>

      {/* ========== Bottom Info ========== */}
      {(error || maxLength) && (
        <FlexBox fullWidth align="center" justify="space-between">
          <L3 color={theme.color.red[60]}>{error}</L3>
          {maxLength && (
            <L3 color={theme.color.gray[60]}>
              {value?.length}/{maxLength}
            </L3>
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Input;

const InputContainer = styled.div<{ $disabled: boolean }>`
  display: flex;
  width: 100%;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $disabled }) =>
      $disabled ? "transparent" : theme.color.gray[40]};
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.color.gray[20] : theme.color.base.white};

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
