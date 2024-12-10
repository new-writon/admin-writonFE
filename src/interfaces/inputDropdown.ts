type inputDropdownType = "position" | "keyword" | "email";

interface InputDropdownProps {
  list: string[];
  setList:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((value: string[]) => void);
  type: inputDropdownType;
  disabled?: boolean;
}

type chipColorType = "blue" | "gray";
type chipSizeType = "sm" | "lg";

interface ChipColor {
  position: chipColorType;
  keyword: chipColorType;
  email: chipColorType;
}

interface ChipSize {
  position: chipSizeType;
  keyword: chipSizeType;
  email: chipSizeType;
}

export type {
  inputDropdownType,
  InputDropdownProps,
  chipColorType,
  ChipColor,
  ChipSize,
};
