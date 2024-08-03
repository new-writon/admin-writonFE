import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styled from "styled-components";
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarModal {
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Value;
  top?: number;
  left?: number;
}

const CalendarModal = ({
  setIsOpenCalendar,
  date,
  setDate,
  top = 0,
  left = 0,
}: CalendarModal) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Value>(date);
  const handleDateChange = (newDate: Value) => {
    setSelectedDate(newDate);
  };

  const onClickDay = (date: Date) => {
    setSelectedDate(date);
    console.log(date);
    setIsOpenCalendar(false);
    setDate(date);
  };

  return (
    <StyledCalendar
      locale="ko"
      value={selectedDate}
      onChange={handleDateChange}
      formatDay={(_, date) => moment(date).format("D")}
      formatMonthYear={(_, date) => moment(date).format("YYYY년 MM월")}
      next2Label={null}
      prev2Label={null}
      minDetail="year" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      onClickDay={onClickDay}
      $top={top}
      $left={left}
    />
  );
};

export default CalendarModal;

export const StyledCalendar = styled(Calendar)<{ $top: number; $left: number }>`
  position: absolute;
  z-index: 9;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: fit-content;
  min-width: 280px;
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
  border-radius: 12px;
  background: white;
  line-height: 100%;
  border: none;
  padding: 10px 10px;

  /* 월 달력 설정 */
  .react-calendar__month-view {
    abbr {
      color: ${({ theme }) => theme.color.gray[80]};
      text-decoration: none;
      font-weight: 500;
    }
  }

  /* 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    justify-content: flex-start;
    height: fit-content;
    margin-bottom: 10px;

    button {
      font-weight: 500;
      font-size: 16px;
      margin: 0 3px;
      width: fit-content;
      padding: 6px 0;
      border-radius: 4px;
      /* background-color: ${({ theme }) => theme.color.gray[30]}; */
    }
  }

  .react-calendar__navigation__arrow {
    :hover {
      background-color: ${({ theme }) => theme.color.gray[30]};
    }
    :disabled {
      color: ${({ theme }) => theme.color.gray[30]};
    }
  }

  /* 요일 */
  .react-calendar__month-view__weekdays {
    padding: 2px 0;

    abbr {
      color: ${({ theme }) => theme.color.gray[80]};
      font-weight: 600;
    }
    // 일요일 스타일 차등적용
    abbr[title="일요일"] {
      color: ${({ theme }) => theme.color.red[60]};
    }
  }

  .react-calendar__tile {
    :hover,
    :focus {
      background-color: ${({ theme }) => theme.color.gray[30]};
      border-radius: 8px;
    }
  }

  /* 일자 전체 보드 */
  .react-calendar__month-view__days {
  }

  /* 일자 버튼 */
  .react-calendar__month-view__days__day {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 35px;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background-color: ${({ theme }) => theme.color.brand[10]};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.color.gray[30]};
    border-radius: 99px;
  }
`;
