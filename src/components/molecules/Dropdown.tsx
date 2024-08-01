import { useState } from "react";
import styled from "styled-components";
import { slideDown, slideUp } from "../../styles/keyframes";
import { B2, L2 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { IoIosArrowUp } from "../atoms/Icons";

interface Dropdown {
  list: string[];
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ list, selectedItem, setSelectedItem }: Dropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (isOpen) {
      handleCloseList();
    } else {
      setVisible(true);
      setIsOpen(true);
    }
  };

  const onClickItem = (item: string) => {
    setSelectedItem(item);
    handleCloseList();
  };

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseList = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  return (
    <Container>
      <Header onClick={toggle} $visible={visible}>
        <L2 weight="sb" color={theme.color.brand[50]}>
          {selectedItem}
        </L2>
        <IoIosArrowUp color={theme.color.gray[70]} size={16} />
      </Header>
      {isOpen && (
        <ShadowBox $listCnt={list.length}>
          <List $visible={visible}>
            {list.map((item, idx) => (
              <Item
                key={idx}
                onClick={() => onClickItem(item)}
                $isCurItem={selectedItem == item}
              >
                <B2 color={theme.color.gray[80]}>{item}</B2>
              </Item>
            ))}
          </List>
        </ShadowBox>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 240px;
  gap: 10px;
  border-radius: 8px;
`;

const Header = styled.div<{ $visible: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 12px;
  cursor: pointer;
  z-index: 2;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.gray[40]};
  border-radius: 8px;

  ${({ $visible, theme }) =>
    $visible
      ? ` border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          border-bottom: 1px solid ${theme.color.gray[30]};  
        `
      : ""}
`;

const List = styled.ul<{ $visible: boolean }>`
  position: relative;
  top: 40px;
  width: 100%;
  padding: 8px;
  list-style: none;
  background-color: ${({ theme }) => theme.color.gray[10]};
  border: 1px solid ${({ theme }) => theme.color.gray[40]};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 2;
  animation: ${({ $visible }) => ($visible ? slideDown : slideUp)} 0.3s ease-out;
`;

const Item = styled.li<{ $isCurItem: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ $isCurItem }) =>
    $isCurItem ? "rgba(44, 47, 50, 0.05)" : "transparent"};

  &:hover {
    background-color: rgba(44, 47, 50, 0.05);
  }
`;

const ShadowBox = styled.div<{ $listCnt: number }>`
  position: absolute;
  width: 100%;
  height: ${({ $listCnt }) => `calc(40px * ${$listCnt + 1} + 16px)`};
  border-radius: 8px;
  box-shadow: 0px 4px 16px 0px rgba(33, 33, 33, 0.24);
  z-index: 1;
`;
