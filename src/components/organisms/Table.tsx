import styled from "styled-components";
import React, { useState } from "react";
import { theme } from "../../styles/theme";

import { Button, CheckBox, FlexBox, Line } from "../atoms";
import { L3 } from "../atoms/Text";
import { CalendarModal } from "../molecules";

import { fieldTranslations, tableCellColor } from "../../utils/formatUtils";
import { ParticipationTableData } from "../../interfaces/participation";
import { DashboardTableData } from "../../interfaces/challenge";

interface Table {
  data: ParticipationTableData[] | DashboardTableData[];
  selectedValues?: number[];
  selectedRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  searchValue?: string; // 검색어
  searchedIdx?: number[]; // 검색어가 필터링되는 항목의 index배열
  isCheckBox?: boolean; // 첫번째 col 체크박스 여부
  isSort?: boolean; // 정렬 기능 존재여부
  isButton?: boolean; // 버튼 존재여부
  hiddenCols?: number[]; // 숨기고 싶은 col list
}

const Table = ({
  data,
  selectedValues,
  selectedRows = [],
  setSelectedRows,
  searchValue,
  searchedIdx,
  isCheckBox,
  isSort,
  isButton,
  hiddenCols,
}: Table) => {
  const formatedData = data.map((item) => Object.values(item));
  const sortList = ["이름순", "참여순", "미참여순"];
  const [selectedSort, setSelectedSort] = useState(0);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  // Table 선택 기능
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows?.(formatedData.map((item) => item[0]));
    } else {
      setSelectedRows?.([]);
    }
  };

  const handleSelectRow = (selectedId: number) => {
    if (selectedRows.includes(selectedId)) {
      setSelectedRows?.(selectedRows.filter((id) => id !== selectedId));
    } else {
      setSelectedRows?.([...selectedRows, selectedId]);
    }
  };

  return (
    <Container>
      {(isSort || isButton) && (
        <FlexBox fullWidth justify="space-between" align="center">
          {/* ========== Sort ========== */}
          {isSort && (
            <FlexBox align="center" gap={4}>
              {sortList.map((item, idx) => (
                <React.Fragment key={idx}>
                  <Button type="none" size="sm" disabled={idx !== selectedSort}>
                    {item}
                  </Button>
                  <Line vertical /> {/* 추후 수정 */}
                </React.Fragment>
              ))}
            </FlexBox>
          )}

          {/* ========== Button ========== */}
          {isButton && (
            <CalendarContainer>
              <Button
                type="empty"
                size="sm"
                calendarIcon
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
              >
                2024년 7월 1일 ~ 2024년 7월 31일
              </Button>
              {isOpenCalendar && (
                <CalendarModal
                  setIsOpenCalendar={setIsOpenCalendar}
                  date={date}
                  setDate={setDate}
                  top={38}
                  left={-20}
                />
              )}
            </CalendarContainer>
          )}
        </FlexBox>
      )}

      {/* ========== Table ========== */}
      {data.length != 0 && (
        <div id="table-container">
          <table>
            <thead>
              <tr id="header-tr">
                {isCheckBox && (
                  <td>
                    <CheckBox
                      size={14}
                      checked={selectedRows.length === formatedData.length}
                      onClick={handleSelectAll}
                    />
                  </td>
                )}
                {Object.keys(data[0])
                  .filter(
                    (_, idx) =>
                      (selectedValues ? selectedValues.includes(idx) : true) &&
                      !hiddenCols?.includes(idx)
                  )
                  .map((header, idx) => (
                    <td key={idx}>
                      <L3 color={theme.color.gray[80]} weight="sb">
                        {fieldTranslations(header)}
                      </L3>
                    </td>
                  ))}
              </tr>
            </thead>
            <tbody>
              {formatedData
                // 검색기능 때문에 모든 요소들을 전부 String으로 변환
                .map((row) =>
                  row.map((item) => String(item === null ? "-" : item))
                )
                .filter((row) => {
                  // 검색어가 없는 경우, 전부 반환
                  if (!searchValue) return true;

                  if (searchedIdx) {
                    // 특정 인덱스를 지정하는 경우
                    return searchedIdx.some((idx) =>
                      row[idx].includes(searchValue)
                    );
                  }
                  // 특정 인덱스를 지정하지 않는 경우 전체에서 검색
                  return row.some((col) => col.includes(searchValue));
                })
                .map((row) => (
                  <StyledTr
                    key={row[0]}
                    $selected={selectedRows.includes(Number(row[0]))}
                    $withdrawn={row[1] === "true"}
                  >
                    {isCheckBox && (
                      <td>
                        <CheckBox
                          size={14}
                          checked={selectedRows.includes(Number(row[0]))}
                          onClick={(_) => handleSelectRow(Number(row[0]))}
                        />
                      </td>
                    )}
                    {row
                      .filter(
                        (_, idx) =>
                          (selectedValues
                            ? selectedValues.includes(idx)
                            : true) && !hiddenCols?.includes(idx)
                      )
                      .map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          <L3
                            weight="r"
                            color={
                              row[1] === "true"
                                ? theme.color.gray[60]
                                : tableCellColor(cell)
                            }
                          >
                            {cell}
                          </L3>
                        </td>
                      ))}
                  </StyledTr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default Table;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  #table-container {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }

  table {
    width: 100%;

    #header-tr {
      background-color: ${({ theme }) => theme.color.gray[30]};
      border-bottom: 1px solid ${({ theme }) => theme.color.gray[40]};
    }

    tr {
      border-bottom: 1px solid ${({ theme }) => theme.color.gray[30]};
    }

    td {
      padding: 8px 12px;
    }

    p {
      text-align: center;
    }
  }
`;

const StyledTr = styled.tr<{ $selected?: boolean; $withdrawn?: boolean }>`
  background-color: ${({ theme, $selected, $withdrawn }) =>
    $selected
      ? theme.color.brand[10]
      : $withdrawn
      ? theme.color.gray[10]
      : "white"};
  transition: all 0.2s ease-in-out;
`;

const CalendarContainer = styled.div`
  position: relative;
`;
