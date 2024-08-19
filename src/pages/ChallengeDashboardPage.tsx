import { useState } from "react";
import { FlexBox, SearchBar } from "../components/atoms";
import { Frame, Table } from "../components/organisms";
import { H4 } from "../components/atoms/Text";
import { Categories } from "../components/molecules";
import { useQuery } from "@tanstack/react-query";
import useChallengeStore from "../states/ChallengeStore";
import { getChallengeDashboardAPI } from "../apis";
import { formatDashboardData } from "../utils/formatUtils";

const ChallengeDashboardPage = () => {
  const categoryList = ["참여자 별 참여 현황", "챌린지 날짜 별 참여 현황"];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { challengeId } = useChallengeStore();

  const { data } = useQuery({
    queryKey: ["challenge-dashboard", challengeId],
    queryFn: () => getChallengeDashboardAPI(),
    staleTime: 60 * 1000,
  });

  return (
    <Frame title="챌린지 참여 현황" noLine>
      <FlexBox fullWidth col gap={40} onClick={() => console.log(data)}>
        {/* ========== Categories ========== */}
        <Categories
          list={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FlexBox col fullWidth gap={24}>
          {/* ========== SearchBar ========== */}
          <FlexBox fullWidth gap={20} align="center">
            <H4 weight="sb">
              전체 {formatDashboardData(data || [])?.length}명
            </H4>
            <SearchBar setValue={setSearchValue} fullWidth />
          </FlexBox>

          {/* ========== Table ========== */}
          <Table
            data={formatDashboardData(data || [])}
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
