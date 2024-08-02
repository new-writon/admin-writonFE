import { ChipColor } from "../interfaces/inputDropdown";

const placeHolder = {
  position: "포지션을 입력해주세요.",
  keyword: "키워드를 입력해주세요.",
  email: "이메일 형식을 맞춰 입력해주세요. (ex.writon@gmail.com)",
};

const subItemNotice = {
  position: null,
  keyword: "키워드를 입력해 추가하거나 아래의 키워드에서 선택할 수 있어요.",
  email: "개의 이메일로 초대장이 전송됩니다.",
};

const chipColor: ChipColor = {
  position: "blue",
  keyword: "blue",
  email: "gray",
};

const width = {
  position: "100%",
  keyword: "460px",
  email: "530px",
};

const boxShadow = {
  position: "none",
  keyword: "0px 4px 16px 0px rgba(33, 33, 33, 0.24)",
  email: "0px 4px 16px 0px rgba(33, 33, 33, 0.24)",
};

const borderRadius = {
  position: "10px",
  keyword: "0",
  email: "0",
};

export {
  placeHolder,
  subItemNotice,
  chipColor,
  width,
  boxShadow,
  borderRadius,
};
