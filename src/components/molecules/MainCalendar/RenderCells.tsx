import React from "react";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarWeeks,
  getDay,
  isSameMonth,
  isSameDay,
  addDays,
  format,
} from "date-fns";
import styled from "styled-components";

import StatisticsBadge from "./StatisticsBadge";

interface CalendarData {
  date: string;
  participationCnt: number;
}

interface RenderCell {
  toggle: boolean;
  today: Date | string;
  lastday: Date | string;
  CalendarData: CalendarData[];
  totalCnt: number;
}

const RenderCell = React.memo(
  ({ toggle, today, lastday, CalendarData, totalCnt }: RenderCell) => {
    const monthStart = startOfMonth(today); // 1월 1일 (그 달의 시작이 나오게 됨.)
    const monthEnd = endOfMonth(today); // 1월 31일이 나옴.(그 달의 끝)

    const startDate =
      getDay(today) === 0 && differenceInCalendarWeeks(today, monthStart) === 0
        ? startOfWeek(addDays(today, -1)) // 9월 1일이 일요일이면 8월 31일이 나오게 됨.
        : startOfWeek(monthStart); // 해당 날짜의 해당 주의 시작 날짜
    const endDate = endOfWeek(monthEnd); // 해당 날짜의 해당 주의 끝 날짜
    const weekNumber =
      getDay(today) === 0
        ? differenceInCalendarWeeks(today, monthStart) === 0
          ? differenceInCalendarWeeks(today, monthStart)
          : differenceInCalendarWeeks(today, monthStart) - 1
        : differenceInCalendarWeeks(today, monthStart); // 몇주차인지

    const rows = [];
    let days = [];
    let day = addDays(startDate, 1); // 월요일부터 보이게 하기 위해서 (원래 일요일부터 보임)
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = isSameMonth(day, monthStart)
          ? format(day, "d")
          : format(day, "M.d");

        const dayData = CalendarData?.find((data) => isSameDay(data.date, day));

        days.push(
          <div
            key={day.toString()}
            className={`cell ${
              !isSameMonth(day, monthStart) ? "disabled" : "valid"
            } ${i === 5 || i === 6 ? "weekend" : ""}`}
          >
            <div
              className={`innerday ${
                new Date(lastday) > new Date(day) && isSameDay(day, today)
                  ? "valid-today"
                  : ""
              }`}
            >
              <div className='vaild-today-active'></div>
              <span className='text'>{formattedDate}</span>
              <div className='inner-element'>
                {dayData && (
                  <StatisticsBadge
                    participationCnt={dayData.participationCnt}
                    totalCnt={totalCnt}
                  />
                )}
              </div>
            </div>
          </div>
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className='row'>
          {days}
        </div>
      );
      days = [];
    }

    return <Container>{toggle ? rows : rows[weekNumber]}</Container>;
  }
);

export default RenderCell;

const Container = styled.div`
  width: 100%;
  .row {
    display: flex;
  }
  .cell {
    width: 100%;
    border-top: 1px solid var(--Gray-30, #edeef1);
  }
  .cell.valid.weekend,
  .cell.selected.weekend,
  .cell.disabled.weekend {
    background-color: var(--Gray-10, #fcfcfc);
  }

  .innerday {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .innerday .text {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    background-color: inherit;
    color: var(--Gray-80, #464c52);
    font-size: 12px;
    font-weight: 500;
  }

  .disabled .innerday .text {
    color: var(--Gray-60, #94989f);
  }

  .valid {
    background-color: var(--White, #fff);
  }

  .vaild-today-active {
    display: none;
    width: 24px;
    height: 24px;
    background-color: var(--Main-50, #6272ff);
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 100%;
    z-index: 1;
  }
  .valid-today .vaild-today-active {
    display: block;
  }

  .valid-today.innerday .text {
    color: #fff;
    z-index: 1;
  }

  .inner-element {
    width: 100%;
    height: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
