import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { FlexBox } from "../atoms";
import { H3 } from "../atoms/Text";
import { ContentSection, Input, DateInput } from "../molecules";
import { BasicInfo } from "../../interfaces/challenge";
import {
  formatDateToString,
  formatStringToDate,
} from "../../utils/formatUtils";

const BasicInfo = ({ isEdit, gap = 24, data, setData }: BasicInfo) => {
  const [name, setName] = useState(data?.name || "");
  const [startDate, setStartDate] = useState<Date>(
    new Date(data?.startDate || "")
  );
  const [endDate, setEndDate] = useState<Date>(new Date(data?.endDate || ""));
  const [dates, setDates] = useState<Date[]>(
    data?.dates?.map((date) => formatStringToDate(date)) || []
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
      setDates(data.dates?.map((date) => formatStringToDate(date)));
    }
  }, [data]);

  useEffect(() => {
    setData?.({
      name,
      startDate: formatDateToString(startDate),
      endDate: formatDateToString(endDate),
      dates: dates?.map((date) => formatDateToString(date)),
    });
  }, [name, startDate, endDate, dates]);

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
            setValue={setStartDate}
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
