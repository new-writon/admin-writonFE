import styled from "styled-components";
import { FlexBox } from ".";
import { L3 } from "./Text";
import { theme } from "../../styles/theme";

interface Swith {
  text?: string;
  disabled?: boolean;
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch = ({ text, disabled, isOn, setIsOn }: Swith) => {
  const toggleSwitch = () => {
    !disabled && setIsOn(!isOn);
  };

  return (
    <FlexBox align="center" gap={4}>
      {text && (
        <L3
          weight="sb"
          color={disabled ? theme.color.gray[40] : theme.color.brand[50]}
          as="span"
        >
          {text}
        </L3>
      )}
      <Container onClick={toggleSwitch} $isOn={isOn}>
        <Toggle $isOn={isOn} />
      </Container>
    </FlexBox>
  );
};

export default Switch;

const Container = styled.div<{ $isOn: boolean }>`
  width: 32px;
  height: 18px;
  background: ${({ $isOn, theme }) =>
    $isOn ? theme.color.brand[50] : theme.color.gray[40]};
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 2px;
  cursor: pointer;
  transition: background 0.3s;
`;

const Toggle = styled.div<{ $isOn: boolean }>`
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  transform: ${({ $isOn }) => ($isOn ? "translateX(14px)" : "translateX(0)")};
`;
