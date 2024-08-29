import { theme } from "../../styles/theme";
import { FlexBox } from "../atoms";
import { H3 } from "../atoms/Text";
import { ContentSection, Input, DateInput } from "../molecules";
import type { BasicInfo } from "../../interfaces/challenge";
import { formatDateToString } from "../../utils/formatUtils";

const BasicInfo = ({ isEdit, gap = 24, data, setData }: BasicInfo) => {
  function handleSetValue(field: string, value: string | Date) {
    setData?.((prev) => ({
      ...prev,
      [field]:
        field === "startDate" || field === "endDate"
          ? formatDateToString(value as Date)
          : value,
    }));
  }

  return (
    <FlexBox fullWidth col gap={gap}>
      {/*  챌린지 이름  */}
      <ContentSection title='챌린지 이름' titleWidth={180}>
        <Input
          disabled={!isEdit}
          value={data.name}
          setValue={(value: string) => handleSetValue("name", value)}
        />
      </ContentSection>

      {/*  챌린지 진행 기간  */}
      <ContentSection title='챌린지 진행 기간' titleWidth={180}>
        <FlexBox gap={14} align='center'>
          <DateInput
            type='start'
            value={new Date(data.startDate)}
            setValue={(value: Date) => handleSetValue("startDate", value)}
            disabled={!isEdit}
          />
          <H3 color={theme.color.gray[60]}>~</H3>
          <DateInput
            type='end'
            value={new Date(data?.endDate)}
            setValue={(value: Date) => handleSetValue("endDate", value)}
            disabled={!isEdit}
          />
        </FlexBox>
      </ContentSection>

      {/*  챌린지 진행 날짜  */}
      <ContentSection title='챌린지 진행 날짜' titleWidth={180}>
        <Input disabled value='라이톤 끄적끄적 챌린지' />
      </ContentSection>
    </FlexBox>
  );
};

export default BasicInfo;
