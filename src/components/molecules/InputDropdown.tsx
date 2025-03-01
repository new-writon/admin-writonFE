import { FormEvent, useState } from "react";
import styled from "styled-components";
import { L3 } from "../atoms/Text";
import { Button, FlexBox, InputChip } from "../atoms";
import { theme } from "../../styles/theme";
import {
  InputDropdownProps,
  inputDropdownType,
} from "../../interfaces/inputDropdown";
import {
  borderRadius,
  boxShadow,
  chipColor,
  chipSize,
  placeHolder,
  subItemNotice,
  width,
} from "../../utils/InputDropdownAttributes";
import { recommendKeywords } from "../../data/ChallengeData";

const InputDropdown = ({
  type,
  list,
  setList,
  disabled,
}: InputDropdownProps) => {
  const [item, setItem] = useState("");

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (item == "") {
      alert("값을 입력하세요.");
    } else if (list.includes(item)) {
      alert("중복된 값이 존재합니다.");
    } else {
      setList([...list, item]);
      setItem("");
    }
  };

  const deleteItem = (selectedIdx: number) => {
    setList(list.filter((_, idx) => idx != selectedIdx));
  };

  // type == 'keyword' 인 경우에만 사용
  const onClickItem = (selectedItem: string) => {
    if (list.includes(selectedItem)) {
      alert("중복된 값이 존재합니다.");
    } else {
      setList([...list, selectedItem]);
    }
  };

  const itemInputList = {
    position: list,
    keyword: list,
    email: [],
  };

  const subItemContainerList = {
    position: [],
    keyword: recommendKeywords,
    email: list,
  };

  return (
    <Container $type={type}>
      <form
        id="item-input"
        style={{
          padding: list.length == 0 || type == "email" ? "8px 16px" : "8px",
        }}
        onSubmit={addItem}
      >
        {itemInputList[type].map((item, idx) => (
          <InputChip
            key={idx}
            color={chipColor[type]}
            size={chipSize[type]}
            deleteItem={() => deleteItem(idx)}
          >
            {item}
          </InputChip>
        ))}
        <input
          value={item}
          onChange={(e) => setItem(e.currentTarget.value)}
          placeholder={placeHolder[type]}
          disabled={disabled}
        />
        {type == "email" && (
          <Button size="sm" type="none" disabled={disabled}>
            추가
          </Button>
        )}
      </form>
      {type != "position" && (
        <div id="sub-item-container">
          <L3 color={theme.color.gray[60]}>
            {subItemNotice(type, list.length)}
          </L3>
          <FlexBox gap={8} isFlexWrap>
            {subItemContainerList[type].map((item, idx) => (
              <InputChip
                key={idx}
                color={chipColor[type]}
                size={chipSize[type]}
                onClick={
                  type == "keyword"
                    ? () => {
                        onClickItem(item);
                      }
                    : undefined
                }
                deleteItem={
                  type == "email"
                    ? () => {
                        deleteItem(idx);
                      }
                    : undefined
                }
                disabled={
                  (type === "keyword" && list.includes(item)) || disabled
                }
              >
                {item}
              </InputChip>
            ))}
          </FlexBox>
        </div>
      )}
    </Container>
  );
};

export default InputDropdown;

const Container = styled.div<{ $type: inputDropdownType }>`
  width: ${({ $type }) => width[$type]};
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $type }) => boxShadow[$type]};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray[30]};
  background: ${({ theme }) => theme.color.gray[10]};

  #item-input {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    border-radius: ${({ $type }) => borderRadius[$type]};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: ${({ theme }) => theme.color.gray[10]};

    input {
      font-size: 16px;
      font-weight: 500;
      line-height: 150%;
      flex: 1;
      background-color: transparent;
    }
  }

  #sub-item-container {
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    border-radius: 0px 0px 10px 10px;
    border-top: 1px solid ${({ theme }) => theme.color.gray[30]};
    background: #fff;
  }
`;
