import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

interface CalendarModal {
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date | Date[]; // 선택된 날짜 혹은 날짜 범위
  setDate: (date: Date | Date[]) => void; // 날짜 혹은 날짜 범위를 설정하는 함수
  isRange?: boolean; // 범위 선택 여부 (기본값은 false)
  top?: number; // 캘린더 모달 위치
  left?: number; // 캘린더 모달 위치
  handleFilter?: (startDate: Date, endDate: Date) => void; // 추가적인 클릭 기능
}

const CalendarModal = ({
  setIsOpenCalendar,
  date,
  setDate,
  isRange = false,
  top = 0,
  left = 0,
  handleFilter,
}: CalendarModal) => {
  // 클릭한 날짜를 처리하는 함수
  const handleClickDay = (value: Date) => {
    if (isRange && Array.isArray(date)) {
      // 범위 선택 모드일 때
      if (date.length === 2) {
        setDate([value]);
      } else {
        setDate([...date, value]);
        handleFilter?.(date[0], value);
        setIsOpenCalendar(false);
      }
    } else {
      // 단일 날짜 선택 모드일 때
      setDate(value);
      setIsOpenCalendar(false);
    }
  };

  return (
    <>
      {/* <ModalOverlay onClick={() => {}} /> */}
      <Container $top={top} $left={left} ref={modalRef}>
        <Calendar
          locale="ko"
          formatDay={(_locale, date) => moment(date).format("D")}
          value={Array.isArray(date) ? undefined : date} // 선택된 날짜 혹은 날짜 범위
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          onClickDay={handleClickDay} // 날짜 클릭 시 호출되는 함수
          goToRangeStartOnSelect={true}
          selectRange={isRange} // 범위 선택 여부
        />
      </Container>
    </>
  );
};

export default CalendarModal;

const Container = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  z-index: 11;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};

  //캘린더 css 적용
  .react-calendar {
    width: 290px;
    height: auto;
    max-width: 100%;
    box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
    border-radius: 16px;
    background: var(--White, #fff);
    font-family: "Pretendard Variable", sans-serif;
    line-height: 1rem;
    border: none;
    padding: 15px;
    box-sizing: border-box;
  }

  .react-calendar button:enabled {
    // 달력 원 크기
    transform: scale(0.85);
  }

  .react-calendar__navigation {
    display: flex;
    height: auto;
    margin: 10px 0;
    width: 100%;
  }
  .react-calendar__navigation button:disabled {
    background-color: var(--White, #fff);
  }
  .react-calendar abbr {
    text-decoration-line: blink;
  }
  .react-calendar__tile--now {
    background: transparent;
  }
  .react-calendar--selectRange
    .react-calendar__tile--now.react-calendar__tile--hover {
    background: #e6e6e6;
  }
  .react-calendar__tile--active.react-calendar__tile--now.react-calendar__tile--hover {
    background: #000;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #e6e6e6;
  }

  .react-calendar__tile:disabled {
    background-color: var(--White, #fff);
    color: var(--Gray-50, #b1b4bc);
    transform: scale(0.85);
  }
  .react-calendar__tile:disabled abbr {
    color: var(--Gray-50, #b1b4bc);
  }
  .react-calendar button:enabled {
    width: fit-content;
    height: inherit;
    border-radius: 100%;
  }
  .react-calendar__tile--hasActive {
    background: #000;
  }
  .react-calendar__tile--active {
    background-color: #000;
    color: var(--White, #fff);
  }
  .react-calendar__tile--active abbr,
  .react-calendar__tile--hasActive abbr {
    color: var(--White, #fff);
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: #000;
  }

  .react-calendar__tile:enabled:focus {
    background-color: var(--Gray-30, #edeef1);
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #000;
    color: var(--White, #fff);
  }

  .react-calendar__month-view__days__day--weekend {
    // 주말 글씨 빨간색 없애기
    color: #000000;
  }
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__navigation__label {
    flex-grow: inherit !important;
    padding-left: 10px;
    color: #000;
    font-size: 1rem;
    font-weight: 700;
  }
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    order: 1;
  }
  .react-calendar__navigation__prev-button {
    position: absolute;
    right: 30px;
  }
  .react-calendar__navigation__next-button {
    position: absolute;
    right: 0;
  }
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }
  .react-calendar__navigation button {
    min-width: 32px;
  }
`;
