import styled from "styled-components";
import { B2, C2 } from "../atoms/Text";
import { FlexBox } from "../atoms";
import { theme } from "../../styles/theme";
import { formatDateToString } from "../../utils/formatUtils";
import { IoCalendarOutline } from "../atoms/Icons";
import { useEffect, useRef, useState } from "react";
import CalendarModal from "./CalendarModal";
import useDateInputStore from "../../states/DateInputStore";

interface DateInput {
  id?: number;
  type: "start" | "end";
  value: Date;
  setValue?:
    | React.Dispatch<React.SetStateAction<Date>>
    | ((value: Date) => void);
  disabled?: boolean;
}

const DateInput = ({
  id = 0,
  type,
  value,
  setValue = () => {},
  disabled = false,
}: DateInput) => {
  const typeforamt = {
    start: "시작",
    end: "종료",
  };
  const { activeInputId, setActiveInputId } = useDateInputStore();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickInput = () => {
    if (disabled) return;

    if (isOpenCalendar) {
      setActiveInputId(0);
      setIsOpenCalendar(false);
    } else {
      activeInputId !== id && setActiveInputId(id);
      setIsOpenCalendar(true);
    }
  };

  useEffect(() => {
    setIsOpenCalendar(activeInputId === id);
  }, [activeInputId]);

  return (
    <FlexBox col gap={4} style={{ position: "relative" }}>
      <C2 color={theme.color.gray[60]}>{typeforamt[type]} 날짜</C2>
      <InputContainer
        $disabled={disabled}
        $isOpenCalendar={isOpenCalendar}
        onClick={onClickInput}
        ref={containerRef}
      >
        <B2>{formatDateToString(value)}</B2>
        {!disabled && (
          <IoCalendarOutline
            color={
              isOpenCalendar ? theme.color.brand[50] : theme.color.gray[80]
            }
          />
        )}
      </InputContainer>
      {isOpenCalendar && (
        <CalendarModal
          setIsOpenCalendar={setIsOpenCalendar}
          date={value}
          setDate={(date) => date instanceof Date && setValue(date)}
          top={76}
          containerRef={containerRef}
        />
      )}
    </FlexBox>
  );
};

export default DateInput;

const InputContainer = styled.div<{
  $disabled: boolean;
  $isOpenCalendar: boolean;
}>`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $disabled, $isOpenCalendar }) =>
      $disabled
        ? "transparent"
        : $isOpenCalendar
        ? theme.color.brand[50]
        : theme.color.gray[40]};
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.color.gray[20] : theme.color.base.white};
  cursor: ${({ $disabled }) => ($disabled ? "text" : "pointer")};
  z-index: ${({ $isOpenCalendar }) => ($isOpenCalendar ? 11 : "auto")};
`;
