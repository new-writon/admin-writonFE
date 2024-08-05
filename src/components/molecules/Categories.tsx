import styled from "styled-components";
import { FlexBox, Line } from "../atoms";
import React from "react";
import { H4 } from "../atoms/Text";
import { theme } from "../../styles/theme";

interface Categories {
  list: string[];
  selectedCategory: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
  isClickDisabled?: boolean;
}

const Categories = ({
  list,
  selectedCategory,
  setSelectedCategory,
  isClickDisabled,
}: Categories) => {
  return (
    <FlexBox col fullWidth>
      <FlexBox fullWidth gap={32}>
        {list.map((item, idx) => (
          <Category
            key={idx}
            $selected={selectedCategory === idx}
            onClick={() => setSelectedCategory(idx)}
            disabled={isClickDisabled}
          >
            <H4
              weight="sb"
              color={
                selectedCategory === idx
                  ? theme.color.gray[100]
                  : theme.color.gray[50]
              }
            >
              {item}
            </H4>
          </Category>
        ))}
      </FlexBox>
      <Line />
    </FlexBox>
  );
};

export default Categories;

const Category = styled.button<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  flex: 1;
  border-bottom: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.color.gray[100] : "transparent"};
`;
