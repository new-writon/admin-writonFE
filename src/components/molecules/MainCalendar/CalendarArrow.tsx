import { addMonths, getMonth, isSameMonth } from "date-fns";
import styled from "styled-components";
import { FlexBox } from "../../atoms";
import { IoIosArrowBack, IoIosArrowForward } from "../../atoms/Icons";
import { theme } from "../../../styles/theme";
import { B2 } from "../../atoms/Text";

interface CalendarArrow {
  firstday: string | Date;
  lastday: string | Date;
  calendarToday: Date;
  setCalendarToday: (calendarToday: Date) => void;
}

export const CalendarArrow = ({
  firstday,
  lastday,
  calendarToday,
  setCalendarToday,
}: CalendarArrow) => {
  return (
    <FlexBox justify="center" align="center" gap={4}>
      <ArrowBtn
        onClick={
          getMonth(firstday) !== getMonth(calendarToday)
            ? () => setCalendarToday(addMonths(calendarToday, -1))
            : () => {}
        }
      >
        <IoIosArrowBack color={theme.color.gray[70]} />
      </ArrowBtn>

      <TodayBtn
        onClick={
          isSameMonth(new Date(), lastday)
            ? () => setCalendarToday(new Date())
            : () => setCalendarToday(new Date(lastday))
        }
      >
        <B2 color={theme.color.gray[70]} weight="sb">
          오늘
        </B2>
      </TodayBtn>

      <ArrowBtn
        onClick={
          getMonth(lastday) !== getMonth(calendarToday)
            ? () => setCalendarToday(addMonths(calendarToday, 1))
            : () => {}
        }
      >
        <IoIosArrowForward color={theme.color.gray[70]} />
      </ArrowBtn>
    </FlexBox>
  );
};

const ArrowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.color.gray[20]};
  }
`;

const TodayBtn = styled.button`
  padding: 2px 8px;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.color.gray[20]};
  }
`;
