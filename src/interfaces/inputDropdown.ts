type inputDropdowType = "position" | "keyword" | "email";

interface InputDropdown {
  list: string[];
  setList:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((value: string[]) => void);
  type: inputDropdowType;
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
  inputDropdowType,
  InputDropdown,
  chipColorType,
  ChipColor,
  ChipSize,
};
