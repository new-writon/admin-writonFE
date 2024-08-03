import React, { useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { BsFilter } from "../atoms/Icons";
import { Line, Select } from "../atoms";
import { fieldTranslations } from "../../utils/formatUtils";

interface Filter {
  list: string[]; // Filter에 나타낼 요소들
  selectedValues: number[]; // Filter에서 선택되는 요소들
  setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
}

const Filter = ({ list, selectedValues, setSelectedValues }: Filter) => {
  const handleSelectAll = () => {
    if (list.length !== selectedValues.length) {
      setSelectedValues(list.map((_, idx) => idx));
    } else {
      setSelectedValues([]);
    }
  };

  const handleSelectRow = (rowIndex: number) => {
    if (selectedValues.includes(rowIndex)) {
      setSelectedValues(selectedValues.filter((idx) => idx !== rowIndex));
    } else {
      setSelectedValues([...selectedValues, rowIndex]);
    }
  };

  useEffect(() => {}, [selectedValues]);

  return (
    <FilterContainer>
      <BsFilter id="icon" size={20} color={theme.color.gray[50]} />
      <Select
        type={list.length === selectedValues.length ? "outline" : "default"}
        onClick={handleSelectAll}
      >
        전체
      </Select>
      <Line vertical />
      {list.map((value, idx) => (
        <Select
          key={value}
          type={selectedValues.includes(idx) ? "outline" : "default"}
          onClick={() => {
            handleSelectRow(idx);
          }}
        >
          {fieldTranslations(value)}
        </Select>
      ))}
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 9px;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap; /* 이거 넣어야 크기 자동조정 안됨 */
  padding-bottom: 10px;

  #icon {
    flex: 0 0 auto;
  }

  /* 스크롤바 전체 */
  ::-webkit-scrollbar {
  }

  /* 스크롤바의 이동하는 칸(Thumb) */
  ::-webkit-scrollbar-thumb {
    :hover {
    }
  }

  /* 스크롤바의 이동하는 칸(Thumb)의 배경(Track) */
  ::-webkit-scrollbar-thumb-tarck {
  }
`;
