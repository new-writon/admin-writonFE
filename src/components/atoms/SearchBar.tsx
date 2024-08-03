import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IoMdSearch } from "./Icons";
import { FormEvent, useState } from "react";

interface SearchBar {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  fullWidth?: boolean;
}

const SearchBar = ({ setValue, fullWidth }: SearchBar) => {
  const [isFocused, setIsFocused] = useState(false);
  const [curValue, setCurValue] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValue(curValue);
  };

  return (
    <SearchInput
      onSubmit={onSubmit}
      $isFocused={isFocused}
      $fullWidth={fullWidth}
    >
      <IoMdSearch
        color={isFocused ? theme.color.brand[50] : theme.color.gray[60]}
        size={20}
      />
      <input
        placeholder="이름, 닉네임, 이메일 등으로 검색해보세요."
        value={curValue}
        onChange={(e) => setCurValue(e.currentTarget.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchInput>
  );
};

export default SearchBar;

const SearchInput = styled.form<{ $isFocused: boolean; $fullWidth?: boolean }>`
  width: 400px;
  display: flex;
  flex: ${({ $fullWidth }) => ($fullWidth ? "1" : "auto")};
  padding: 4px 12px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1.5px solid
    ${({ theme, $isFocused }) =>
      $isFocused ? theme.color.brand[50] : theme.color.gray[30]};
  background: ${({ theme, $isFocused }) =>
    $isFocused ? theme.color.base.white : theme.color.gray[20]};
  transition: all 0.2s ease-in-out;

  input {
    padding: 8px 0;
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    line-height: 160%;
    background-color: transparent;
  }
`;
