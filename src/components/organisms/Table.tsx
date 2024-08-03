import styled from "styled-components";
import React from "react";
import { theme } from "../../styles/theme";
import { L3 } from "../atoms/Text";
import { fieldTranslations } from "../../utils/formatUtils";
import { ParticipationTableData } from "../../interfaces/table";
import { CheckBox } from "../atoms";

interface Table {
  data: ParticipationTableData[];
  selectedValues: number[];
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  searchValue?: string; // 검색어
  searchedIdx?: number[]; // 검색어가 필터링되는 항목의 index배열
}

const Table = ({
  data,
  selectedValues,
  selectedRows,
  setSelectedRows,
  searchValue,
  searchedIdx,
}: Table) => {
  const formatedData = data.map((item) => Object.values(item));

  // Table 선택 기능
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(formatedData.map((_, idx) => idx));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((idx) => idx !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr id="header-tr">
            <td>
              <CheckBox
                size={14}
                checked={selectedRows.length === formatedData.length}
                onClick={handleSelectAll}
              />
            </td>
            {Object.keys(data[0])
              .filter((_, idx) => selectedValues.includes(idx))
              .map((header, idx) => (
                <td key={idx}>
                  <L3 color={theme.color.gray[80]} weight="sb">
                    {fieldTranslations[header]}
                  </L3>
                </td>
              ))}
          </tr>
        </thead>
        <tbody>
          {formatedData
            // 검색기능 때문에 모든 요소들을 전부 String으로 변환
            .map((row) => row.map((item) => String(item)))
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
            .map((row, rowIndex) => (
              <StyledTr
                key={rowIndex}
                $selected={selectedRows.includes(rowIndex)}
              >
                <td>
                  <CheckBox
                    size={14}
                    checked={selectedRows.includes(rowIndex)}
                    onClick={(_) => handleSelectRow(rowIndex)}
                  />
                </td>
                {row
                  .filter((_, idx) => selectedValues.includes(idx))
                  .map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <L3 weight="r" color={theme.color.gray[80]}>
                        {cell}
                      </L3>
                    </td>
                  ))}
              </StyledTr>
            ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
`;

const StyledTable = styled.table`
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
`;

const StyledTr = styled.tr<{ $selected?: boolean }>`
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.color.brand[10] : "white"};
  transition: all 0.2s ease-in-out;
`;
