import Calendar from "./Calendar";
import SelectGroupDay from "./SelectGroupDay";
import { L3 } from "../../atoms/Text";
import { theme } from "../../../styles/theme";
import { FlexBox } from "../../atoms";

// props 예시
// const CalendarData = ["2024-06-02", "2024-09-02"]; // 위에서 선택한 날짜 범위
// const [selectedDates, setSelectedDates] = useState<(Date | string)[]>([]); // 선택한 날짜

interface SelectCalendar {
  CalendarData: string[];
  selectedDates: string[];
  setSelectedDates: (selectedDates: string[]) => void;
  isEdit?: boolean;
}

const SelectCalendar = ({
  CalendarData,
  selectedDates,
  setSelectedDates,
  isEdit,
}: SelectCalendar) => {
  const handleContainerClick = () => {
    if (CalendarData.length < 2) {
      alert("날짜 범위를 선택해주세요.");
    }
  };

  return (
    <FlexBox col gap={20} onClick={handleContainerClick}>
      <SelectGroupDay
        CalendarData={CalendarData}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        isEdit={isEdit}
      />
      <Calendar
        CalendarData={CalendarData}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        isEdit={isEdit}
      />
      {isEdit && (
        <L3 color={theme.color.gray[60]}>
          달력에서 날짜를 클릭해 개별 날짜를 추가 또는 삭제할 수 있어요.
        </L3>
      )}
    </FlexBox>
  );
};

export default SelectCalendar;
