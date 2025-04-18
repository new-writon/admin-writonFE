import { theme } from "../../styles/theme";
import { FlexBox } from "../atoms";
import { H3 } from "../atoms/Text";
import { ContentSection, Input, DateInput, SelectCalendar } from "../molecules";
import { BasicInfoProps } from "../../interfaces/challenge";
import { formatDateToString } from "../../utils/formatUtils";
import { useEffect } from "react";
import useDateInputStore from "../../states/DateInputStore";

const BasicInfo = ({ isEdit, gap = 24, data, setData }: BasicInfoProps) => {
  const { setActiveInputId } = useDateInputStore();

  const handleSetValue = (field: string, value: string | Date) => {
    setData?.((prev) => ({
      ...prev,
      [field]:
        field === "startDate" || field === "endDate"
          ? formatDateToString(value as Date)
          : value,
    }));
  };

  useEffect(() => {
    setActiveInputId(0);
  }, [isEdit]);

  return (
    <FlexBox fullWidth col gap={gap}>
      {/*  챌린지 이름  */}
      <ContentSection title="챌린지 이름" titleWidth={180}>
        <Input
          disabled={!isEdit}
          value={data.name}
          setValue={(value: string) => handleSetValue("name", value)}
        />
      </ContentSection>

      {/*  챌린지 진행 기간  */}
      <ContentSection title="챌린지 진행 기간" titleWidth={180}>
        <FlexBox gap={14} align="center">
          <DateInput
            id={1}
            type="start"
            value={new Date(data.startDate)}
            setValue={(value: Date) => handleSetValue("startDate", value)}
            disabled={!isEdit}
          />
          <H3 color={theme.color.gray[60]}>~</H3>
          <DateInput
            id={2}
            type="end"
            value={new Date(data?.endDate)}
            setValue={(value: Date) => handleSetValue("endDate", value)}
            disabled={!isEdit}
          />
        </FlexBox>
      </ContentSection>

      {/*  챌린지 진행 날짜  */}
      <ContentSection title="챌린지 진행 날짜" titleWidth={180}>
        <SelectCalendar
          CalendarData={[data.startDate, data.endDate]}
          selectedDates={data.processDates}
          setSelectedDates={(selectedDates) =>
            setData?.((prev) => ({ ...prev, processDates: selectedDates }))
          }
          isEdit={isEdit}
        />
      </ContentSection>
    </FlexBox>
  );
};

export default BasicInfo;
