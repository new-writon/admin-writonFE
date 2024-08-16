import { theme } from "../../styles/theme";
import { FlexBox } from "../atoms";
import { B2 } from "../atoms/Text";

interface ContentSection {
  children: React.ReactNode;
  title: string;
  titleWidth: number;
}

const ContentSection = ({ children, title, titleWidth }: ContentSection) => {
  return (
    <FlexBox>
      <div style={{ width: `${titleWidth}px` }}>
        <B2 weight="sb" color={theme.color.gray[80]}>
          {title}
        </B2>
      </div>
      <FlexBox isFlex1>{children}</FlexBox>
    </FlexBox>
  );
};

export default ContentSection;
