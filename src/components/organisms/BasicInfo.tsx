import { useState } from "react";
import { theme } from "../../styles/theme";
import { FlexBox } from "../atoms";
import { H3 } from "../atoms/Text";
import { ContentSection, Input, DateInput } from "../molecules";

interface BasicInfo {
  isEdit?: boolean;
  gap?: number;
}

const BasicInfo = ({ isEdit, gap = 24 }: BasicInfo) => {
  const [name, setName] = useState("라이톤 끄적끄적 챌린지");
  const [startDate, setstartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <FlexBox fullWidth col gap={gap}>
      {/*  챌린지 이름  */}
      <ContentSection title="챌린지 이름" titleWidth={180}>
        <Input disabled={!isEdit} value={name} setValue={setName} />
      </ContentSection>
      {/*  챌린지 진행 기간  */}
      <ContentSection title="챌린지 진행 기간" titleWidth={180}>
        <FlexBox gap={14} align="center">
          <DateInput
            type="start"
            value={startDate}
            setValue={setstartDate}
            disabled={!isEdit}
          />
          <H3 color={theme.color.gray[60]}>~</H3>
          <DateInput
            type="end"
            value={endDate}
            setValue={setEndDate}
            disabled={!isEdit}
          />
        </FlexBox>
      </ContentSection>
      {/*  챌린지 진행 날짜  */}
      <ContentSection title="챌린지 진행 날짜" titleWidth={180}>
        <Input disabled value="라이톤 끄적끄적 챌린지" />
      </ContentSection>
    </FlexBox>
  );
};

export default BasicInfo;
