import { addMonths, format, getMonth, isSameMonth } from "date-fns";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "../../atoms/Icons";

import { theme } from "../../../styles/theme";
import { C2 } from "../../atoms/Text";
import { FlexBox } from "../../atoms";

const CalendarArrow = ({
  firstday,
  lastday,
  calendarToday,
  setCalendarToday,
}: {
  firstday: string | Date;
  lastday: string | Date;
  calendarToday: Date;
  setCalendarToday: (calendarToday: Date) => void;
}) => {
  return (
    <FlexBox justify="center" align="center" gap={12} padding="12px">
      <ArrowBtn
        onClick={
          getMonth(firstday) !== getMonth(calendarToday)
            ? () => setCalendarToday(addMonths(calendarToday, -1))
            : () => {}
        }
      >
        <IoIosArrowBack color={theme.color.gray[70]} />
      </ArrowBtn>

      <C2
        onClick={
          isSameMonth(new Date(), lastday)
            ? () => setCalendarToday(new Date())
            : () => setCalendarToday(new Date(lastday))
        }
      >
        {format(calendarToday, "yyyy년 M월")}
      </C2>

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

export default CalendarArrow;

const ArrowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.color.gray[30]};
  }
`;
