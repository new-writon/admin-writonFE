import { useState } from "react";
import { FlexBox, SearchBar } from "../components/atoms";
import { Frame, Table } from "../components/organisms";
import { H4 } from "../components/atoms/Text";
import { isParticipateTableData } from "../data/TableData";
import { Categories } from "../components/molecules";

const ChallengeDashboardPage = () => {
  const [data, setData] = useState(isParticipateTableData);
  const categoryList = ["참여자 별 참여 현황", "챌린지 날짜 별 참여 현황"];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Frame title="챌린지 참여 현황" noLine>
      <FlexBox fullWidth col gap={40}>
        {/* ========== Categories ========== */}
        <Categories
          list={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FlexBox col fullWidth gap={24}>
          {/* ========== SearchBar ========== */}
          <FlexBox fullWidth gap={20} align="center">
            <H4 weight="sb">전체 {data.length}명</H4>
            <SearchBar setValue={setSearchValue} fullWidth />
          </FlexBox>

          {/* ========== Table ========== */}
          <Table
            data={isParticipateTableData}
            searchValue={searchValue}
            searchedIdx={[0]} // 이름, 닉네임, 이메일 index
            isSort
            isButton
          />
        </FlexBox>
      </FlexBox>
    </Frame>
  );
};

export default ChallengeDashboardPage;
