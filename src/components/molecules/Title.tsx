import { theme } from "../../styles/theme";
import { Chip, FlexBox, Switch } from "../atoms";
import { B2, L3 } from "../atoms/Text";

interface Title {
  title?: string;
  subTitle?: string;
  isRequired?: boolean;

  // Switch Props
  isSwitch?: boolean;
  isOn?: boolean;
  setIsOn?: React.Dispatch<React.SetStateAction<boolean>>;
  switchDisabled?: boolean;
}

const Title = ({
  title,
  subTitle,
  isRequired,
  isSwitch,
  isOn = false,
  setIsOn = () => {},
  switchDisabled,
}: Title) => {
  return (
    <FlexBox gap={20} justify="space-between" align="center" fullWidth>
      <FlexBox col gap={2}>
        {title && <B2 weight="sb">{title}</B2>}
        {subTitle && <L3 color={theme.color.gray[60]}>{subTitle}</L3>}
      </FlexBox>
      {isRequired && (
        <Chip color="red" size="sm">
          필수
        </Chip>
      )}
      {isSwitch && (
        <Switch
          text="선택"
          isOn={isOn}
          setIsOn={setIsOn}
          disabled={switchDisabled}
        />
      )}
    </FlexBox>
  );
};

export default Title;
