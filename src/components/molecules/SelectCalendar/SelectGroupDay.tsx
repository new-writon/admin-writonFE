import styled from "styled-components";
import { useState } from "react";
import { eachDayOfInterval, format, getDay } from "date-fns";
import { FlexBox, Line } from "../../atoms";
import { IoReload } from "../../atoms/Icons";
import { theme } from "../../../styles/theme";

interface SelectGroupDay {
  CalendarData: string[];
  selectedDates: string[];
  setSelectedDates: (selectedDates: string[]) => void;
  isEdit?: boolean;
}

const GroupDay = ["월", "화", "수", "목", "금", "토", "일"];

const SelectGroupDay = ({
  CalendarData,
  selectedDates,
  setSelectedDates,
  isEdit = false,
}: SelectGroupDay) => {
  const [activeDays, setActiveDays] = useState<string[]>([]);

  const handleDayClick = (day: string) => {
    if (CalendarData.length !== 2) return;

    const [start, end] = CalendarData.map((date) => new Date(date));
    const allDatesInRange = eachDayOfInterval({ start, end });

    if (day === "전체") {
      if (activeDays.includes("전체")) {
        // "전체"가 이미 선택된 상태에서 다시 클릭하면 해제
        setSelectedDates([]);
        setActiveDays([]);
      } else {
        // "전체" 선택 시 모든 날짜 추가
        const allDates = allDatesInRange.map((date) =>
          format(date, "yyyy-MM-dd")
        );
        setSelectedDates(allDates);
        setActiveDays(["전체", ...GroupDay]);
      }
    } else {
      const dayIndex = GroupDay.indexOf(day) + 1;
      const isSunday = day === "일";
      const filteredDates = allDatesInRange.filter(
        (date) => getDay(date) === (isSunday ? 0 : dayIndex)
      );

      if (activeDays.includes(day)) {
        // 이미 선택된 요일이면 해제
        setSelectedDates(
          selectedDates.filter(
            (date) =>
              !filteredDates
                .map((d) => format(d, "yyyy-MM-dd"))
                .includes(format(date, "yyyy-MM-dd"))
          )
        );
        setActiveDays(
          activeDays.filter(
            (activeDay) => activeDay !== day && activeDay !== "전체"
          )
        );
      } else {
        // 선택된 요일 추가
        const newDates = filteredDates.map((date) =>
          format(date, "yyyy-MM-dd")
        );
        setSelectedDates([...selectedDates, ...newDates]);

        if (activeDays.length === 6) {
          setActiveDays([...activeDays, day, "전체"]);
        } else {
          setActiveDays([...activeDays, day]);
        }
      }
    }
  };

  const resetDayClick = () => {
    setSelectedDates([]);
    setActiveDays([]);
  };

  return (
    <FlexBox gap={8}>
      <FlexBox gap={8}>
        <DayButton
          className={activeDays.includes("전체") ? "active" : ""}
          onClick={() => handleDayClick("전체")}
          $isEdit={isEdit}
          disabled={!isEdit}
        >
          전체
        </DayButton>
        <Line height={30} />
        {GroupDay.map((item, idx) => (
          <DayButton
            key={idx}
            className={activeDays.includes(item) ? "active" : ""}
            onClick={() => handleDayClick(item)}
            $isEdit={isEdit}
            disabled={!isEdit}
          >
            {item}
          </DayButton>
        ))}
      </FlexBox>
      {isEdit && (
        <ResetButton
          onClick={resetDayClick}
          $isEdit={isEdit}
          disabled={!isEdit}
        >
          <IoReload size={12} color={theme.color.gray[60]} />
          <span>초기화</span>
        </ResetButton>
      )}
    </FlexBox>
  );
};

export default SelectGroupDay;

const DayButton = styled.button<{ $isEdit: boolean }>`
  color: ${({ theme }) => theme.color.gray[80]};
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.color.gray[40]};
  cursor: ${({ $isEdit }) => ($isEdit ? "pointer" : "default")};

  &.active {
    background-color: ${({ theme }) => theme.color.brand[50]};
    border-color: transparent;
    color: #fff;
  }
`;

const ResetButton = styled.button<{ $isEdit: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: ${({ $isEdit }) => ($isEdit ? "pointer" : "default")};

  span {
    color: ${({ theme }) => theme.color.gray[60]};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
`;
