import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarWeeks,
  getDay,
  parseISO,
  isWithinInterval,
} from "date-fns";
import { isSameMonth, isSameDay, addDays, format } from "date-fns";
import styled from "styled-components";

interface RenderCell {
  today: Date;
  CalendarData: string[];
  selectedDates: string[];
  setSelectedDates: (selectedDates: string[]) => void;
  isEdit?: boolean;
}

const RenderCell = ({
  today,
  CalendarData,
  selectedDates,
  setSelectedDates,
  isEdit = false,
}: RenderCell) => {
  const monthStart = startOfMonth(today); // 1월 1일 (그 달의 시작이 나오게 됨.)
  const monthEnd = endOfMonth(today); // 1월 31일이 나옴.(그 달의 끝)
  const startDate =
    getDay(today) === 0 && differenceInCalendarWeeks(today, monthStart) === 0
      ? startOfWeek(addDays(today, -1)) // 9월 1일이 일요일이면 8월 31일이 나오게 됨.
      : startOfWeek(monthStart); // 해당 날짜의 해당 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 해당 날짜의 해당 주의 끝 날짜

  const handleDateClick = (date: string) => {
    if (CalendarData.length !== 2) return;

    const startRange = parseISO(CalendarData[0] as string);
    const endRange = parseISO(CalendarData[1] as string);

    const isInRange = isWithinInterval(parseISO(date as string), {
      start: startRange,
      end: endRange,
    });

    if (!isInRange) {
      alert("해당 날짜는 선택할 수 없습니다.");
      return;
    }

    if (selectedDates.some((selectedDate) => isSameDay(selectedDate, date))) {
      // 이미 선택된 날짜라면 배열에서 제거
      setSelectedDates(
        selectedDates.filter((selectedDate) => !isSameDay(selectedDate, date))
      );
    } else {
      // 선택되지 않은 날짜라면 배열에 추가
      setSelectedDates([...selectedDates, date]);
    }
  };

  const rows = [];
  let days = [];
  let day = addDays(startDate, 1); // 월요일부터 보이게 하기 위해서 (원래 일요일부터 보임)

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const currentDay = day; // 현재 날짜를 저장하여 클로저 문제 해결
      const formattedDate = format(day, "dd");
      const isSelected = selectedDates.some((selectedDate) =>
        isSameDay(selectedDate, day)
      );

      days.push(
        <div
          key={day.toString()}
          className={`cell ${
            !isSameMonth(day, monthStart) ? "disabled" : "valid"
          } ${i === 5 || i === 6 ? "weekend" : ""}`}
        >
          <div className={`innerday ${isSelected ? "valid-click-day" : ""}`}>
            <button
              className="vaild-day-active"
              onClick={() => handleDateClick(format(currentDay, "yyyy-MM-dd"))}
              disabled={!isEdit}
            >
              <span className="text">{formattedDate}</span>
            </button>
          </div>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className="row">
        {days}
      </div>
    );
    days = [];
  }

  return <Container $isEdit={isEdit}>{rows}</Container>;
};

export default RenderCell;

const Container = styled.div<{ $isEdit: boolean }>`
  width: 100%;
  .row {
    display: flex;
  }

  .cell {
    width: 100%;
  }

  .innerday {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
  }

  .innerday .text {
    color: #333;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
  }

  .disabled .innerday .text {
    color: ${({ theme }) => theme.color.gray[60]};
  }

  .vaild-day-active {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 28px;
    height: 28px;
    cursor: ${({ $isEdit }) => ($isEdit ? "pointer" : "default")};
  }

  .vaild-day-active:hover {
    background: ${({ theme, $isEdit }) => $isEdit && theme.color.gray[30]};
  }

  .valid-click-day .vaild-day-active {
    background-color: #0c41ff;
  }

  .valid-click-day.innerday .text {
    color: #fff;
    z-index: 1;
  }
`;
