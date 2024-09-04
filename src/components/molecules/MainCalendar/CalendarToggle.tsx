import styled from "styled-components";

import { IoIosArrowUp, IoIosArrowDown } from "../../atoms/Icons";
import { theme } from "../../../styles/theme";
import { B2 } from "../../atoms/Text";

interface CalendarToggle {
  toggle: boolean;
  onClick: () => void;
}

const CalendarToggle = ({ toggle, onClick }: CalendarToggle) => {
  return (
    <Container onClick={onClick}>
      <B2 color={theme.color.gray[70]} weight="sb">
        {toggle ? "달력 접기" : "달력 펼치기"}
      </B2>
      {toggle ? (
        <IoIosArrowUp size={14} color={theme.color.gray[70]} />
      ) : (
        <IoIosArrowDown size={14} color={theme.color.gray[70]} />
      )}
    </Container>
  );
};

export default CalendarToggle;

const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray[40]};
`;
