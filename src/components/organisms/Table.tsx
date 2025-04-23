import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { theme } from "../../styles/theme";

import { Button, CheckBox, FlexBox, Line } from "../atoms";
import { B2, L3 } from "../atoms/Text";
import { CalendarModal } from "../molecules";

import {
  fieldTranslations,
  formatDateToString,
  tableCellColor,
} from "../../utils/formatUtils";
import { ParticipationTableData } from "../../interfaces/participation";
import { DashboardTableData } from "../../interfaces/challenge";
import {
  sortByName,
  sortByNonParticipation,
  sortByParticipation,
} from "../../utils/sortUtils";
import { MdContentCopy } from "../atoms/Icons";

interface Table {
  data: ParticipationTableData[] | DashboardTableData[];
  selectedValues?: number[];
  selectedRows?: number[];
  setSelectedValues?: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  searchValue?: string; // 검색어
  searchedIdx?: number[]; // 검색어가 필터링되는 항목의 index배열
  isCheckBox?: boolean; // 첫번째 col 체크박스 여부
  isSort?: boolean; // 정렬 기능 존재여부
  isButton?: boolean; // 버튼 존재여부
  hiddenCols?: number[]; // 숨기고 싶은 col list
}

interface SortButton {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

interface Cell {
  text: string;
  hasCopyBtn?: boolean;
  isWithdrawn?: boolean;
}

const SortButton = ({ children, selected, onClick }: SortButton) => {
  return (
    <ButtonContainer onClick={onClick}>
      <B2
        weight="sb"
        color={selected ? theme.color.brand[50] : theme.color.gray[50]}
        as="span"
      >
        {children}
      </B2>
    </ButtonContainer>
  );
};

const Cell = ({ text, hasCopyBtn, isWithdrawn }: Cell) => {
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다.");
    } catch (e) {
      alert("복사 실패");
    }
  };

  return (
    <FlexBox justify="center" align="center" gap={6}>
      <L3
        weight="r"
        color={isWithdrawn ? theme.color.gray[60] : tableCellColor(text)}
        as="span"
      >
        {text}
      </L3>
      {hasCopyBtn && (
        <CopyButton onClick={handleCopyClipBoard}>
          <MdContentCopy color={theme.color.brand[50]} size={14} />
        </CopyButton>
      )}
    </FlexBox>
  );
};

const Table = ({
  data: originalData,
  selectedValues,
  selectedRows = [],
  setSelectedValues,
  setSelectedRows,
  searchValue,
  searchedIdx,
  isCheckBox,
  isSort,
  isButton,
  hiddenCols,
}: Table) => {
  const [data, setData] = useState<
    ParticipationTableData[] | DashboardTableData[]
  >([]);
  const formatedData = data.map((item) => Object.values(item));
  const headerList = data.length !== 0 ? Object.keys(data[0]) : [];

  const sortList = ["이름순", "참여순", "미참여순"];
  const [selectedSort, setSelectedSort] = useState(0);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const isDashboardTableDataArray = (
    data: any[]
  ): data is DashboardTableData[] => {
    return Array.isArray(data) && data.every((item) => "name" in item);
  };

  // 정렬 기능
  const handleSort = (idx: number) => {
    if (isDashboardTableDataArray(data)) {
      setSelectedSort(idx);
      const sortedData =
        idx === 0
          ? sortByName(data)
          : idx === 1
          ? sortByParticipation(data)
          : sortByNonParticipation(data);

      setData(sortedData);
    }
  };

  // 날짜 필터링 기능
  const handleFilter = (startDate: Date, endDate: Date) => {
    const filteredIndexList = headerList
      .filter((item, idx) => {
        const date = new Date(item);
        date.setHours(0, 0, 0, 0);

        return idx === 0 || (date >= startDate && date <= endDate);
      })
      .map((_, idx) => idx);

    setSelectedValues?.(filteredIndexList);
  };

  useEffect(() => {
    setData(originalData);
    setDates([
      new Date(headerList[1]),
      new Date(headerList[headerList.length - 1]),
    ]);
  }, [originalData]);

  return (
    <Container>
      {(isSort || isButton) && data.length != 0 && (
        <FlexBox fullWidth justify="space-between" align="center">
          {/* ========== Sort ========== */}
          {isSort && (
            <FlexBox align="center" gap={4}>
              {sortList.map((item, idx) => (
                <React.Fragment key={idx}>
                  <SortButton
                    selected={idx === selectedSort}
                    onClick={() => handleSort(idx)}
                  >
                    {item}
                  </SortButton>
                  {idx !== 2 && <Line height={16} />}
                </React.Fragment>
              ))}
            </FlexBox>
          )}

          {/* ========== Button ========== */}
          {isButton && (
            <CalendarContainer ref={containerRef}>
              <Button
                type="empty"
                size="sm"
                calendarIcon
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                fullWidth
                style={{ justifyContent: "flex-start", minWidth: "230px" }}
              >
                {formatDateToString(dates[0])} ~ {formatDateToString(dates[1])}
              </Button>
              {isOpenCalendar && (
                <CalendarModal
                  setIsOpenCalendar={setIsOpenCalendar}
                  date={dates}
                  setDate={(date) => Array.isArray(date) && setDates(date)}
                  top={38}
                  left={-20}
                  isRange
                  handleFilter={handleFilter}
                  containerRef={containerRef}
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
                      <L3 color={theme.color.gray[80]} weight="sb" as="span">
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
                  row.map((item, idx) => {
                    let formatedItem = String(item);
                    if (item === null) {
                      formatedItem = "-";
                    } else if (isCheckBox) {
                      if ([3, 12, 14].includes(idx)) {
                        formatedItem = `${item}회`;
                      } else if (idx === 11) {
                        formatedItem = `${item}원`;
                      } else if (idx === 13) {
                        formatedItem = `${item}개`;
                      }
                    }

                    return formatedItem;
                  })
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
                          <Cell
                            text={cell}
                            hasCopyBtn={
                              isCheckBox && [7, 8].includes(cellIndex)
                            }
                            isWithdrawn={row[1] === "true"}
                          />
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
      text-align: center;
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

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 6px;
`;

const CopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.brand[10]};
  }
`;
