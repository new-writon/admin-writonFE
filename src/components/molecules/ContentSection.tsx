import { theme } from "../../styles/theme";
import { FlexBox, RadioButton } from "../atoms";
import { BsQuestionCircleFill } from "../atoms/Icons";
import { B2 } from "../atoms/Text";

interface ContentSection {
  children: React.ReactNode;
  title: string;
  titleWidth: number;
  infoText?: string;

  // Radio Props
  option?: string;
  selectedOption?: string;
  setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
}

const ContentSection = ({
  children,
  title,
  titleWidth,
  infoText,
  option = "",
  selectedOption = "",
  setSelectedOption = () => {},
}: ContentSection) => {
  return (
    <FlexBox>
      <FlexBox gap={6} align="center" style={{ width: `${titleWidth}px` }}>
        {option && (
          <RadioButton
            option={option}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
        <B2 weight="sb" color={theme.color.gray[80]}>
          {title}
        </B2>
        {infoText && (
          <BsQuestionCircleFill size={16} color={theme.color.gray[50]} />
        )}
      </FlexBox>
      <FlexBox isFlex1>{children}</FlexBox>
    </FlexBox>
  );
};

export default ContentSection;
