import { useState } from "react";

import styled from "styled-components";

import CalendarArrow from "./CalendarArrow";
import RenderCell from "./RenderCells";
import RenderDays from "./RenderDays";

interface Calendar {
  CalendarData: string[];
  selectedDates: string[];
  setSelectedDates: (selectedDates: string[]) => void;
  isEdit?: boolean;
}

const Calendar = ({
  CalendarData,
  selectedDates,
  setSelectedDates,
  isEdit,
}: Calendar) => {
  const [calendarToday, setCalendarToday] = useState<Date>(
    CalendarData.length < 1 ? new Date() : new Date(CalendarData[0])
  );

  const firstday = CalendarData.length > 0 ? CalendarData[0] : new Date();
  const lastday =
    CalendarData.length > 0
      ? CalendarData[CalendarData.length - 1]
      : new Date();

  return (
    <Container>
      <CalendarArrow
        firstday={firstday}
        lastday={lastday}
        calendarToday={calendarToday}
        setCalendarToday={setCalendarToday}
      />
      <RenderDays />
      <RenderCell
        today={calendarToday}
        CalendarData={CalendarData}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        isEdit={isEdit}
      />
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  max-width: 340px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #fcfcfc;
`;
