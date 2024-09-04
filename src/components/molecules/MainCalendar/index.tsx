import { useState } from "react";

import { format, getMonth } from "date-fns";
import styled from "styled-components";

import { CalendarArrow } from "./CalendarArrow";
import CalendarToggle from "./CalendarToggle";
import RenderCell from "./RenderCells";
import RenderDays from "./RenderDays";
import type { MainCalendarProps } from "../../../interfaces/challenge";

const MainCalendar = ({ calendarData, totalCnt }: MainCalendarProps) => {
  const [calendarToggle, setCalendarToggle] = useState(false); // 달력 펼치기/접기
  const [calendarToday, setCalendarToday] = useState<Date>(
    calendarData.length > 0 &&
      getMonth(new Date(calendarData[calendarData.length - 1]?.date)) !==
        getMonth(new Date())
      ? new Date(calendarData[calendarData.length - 1]?.date)
      : new Date()
  );

  const firstday = calendarData.length > 0 ? calendarData[0]?.date : new Date();
  const lastday =
    calendarData.length > 0
      ? calendarData[calendarData.length - 1]?.date
      : new Date();

  return (
    <Container>
      <TopBar>
        <TopBarLeft>
          {`${format(calendarToday, "yyyy")}년 ${format(calendarToday, "M")}월`}
        </TopBarLeft>
        <TopBarRight>
          {calendarToggle && (
            <CalendarArrow
              firstday={firstday}
              lastday={lastday}
              calendarToday={calendarToday}
              setCalendarToday={setCalendarToday}
            />
          )}
          <CalendarToggle
            toggle={calendarToggle}
            onClick={() => {
              setCalendarToggle(!calendarToggle);
              setCalendarToday(new Date());
            }}
          />
        </TopBarRight>
      </TopBar>

      <RenderCalendar>
        <RenderDays />
        <RenderCell
          toggle={calendarToggle}
          today={calendarToday}
          lastday={lastday}
          CalendarData={calendarData}
          totalCnt={totalCnt}
        />
      </RenderCalendar>
    </Container>
  );
};

export default MainCalendar;

const Container = styled.div`
  max-width: 900px;
  min-width: 700px;
  width: 100%;
  border-radius: 16px;
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.gray[30]};
  box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopBarLeft = styled.span`
  color: ${({ theme }) => theme.color.gray[100]};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
`;

export const TopBarRight = styled.div`
  display: flex;
  gap: 16px;
`;

export const RenderCalendar = styled.div`
  width: 100%;
`;
