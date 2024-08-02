type inputDropdowType = "position" | "keyword" | "email";

interface InputDropdown {
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  type: inputDropdowType;
}

type chipColorType = "blue" | "gray";

interface ChipColor {
  position: chipColorType;
  keyword: chipColorType;
  email: chipColorType;
}

export type { inputDropdowType, InputDropdown, chipColorType, ChipColor };
