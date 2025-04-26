import { useEffect, useState } from "react";
import { FlexBox, SearchBar } from "../components/atoms";
import { Frame, Table } from "../components/organisms";
import { H4 } from "../components/atoms/Text";
import { Categories, MainCalendar } from "../components/molecules";
import { useQuery } from "@tanstack/react-query";
import useChallengeStore from "../states/ChallengeStore";
import { getChallengeDashboardAPI } from "../apis";
import {
  formatDashboardData,
  formatMainCalendarData,
} from "../utils/formatUtils";
import { DashboardTableData } from "../interfaces/challenge";
import useAuthStore from "../states/AuthStore";

const ChallengeDashboardPage = () => {
  const categoryList = ["참여자 별 참여 현황", "챌린지 날짜 별 참여 현황"];
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const { challengeId } = useChallengeStore();
  const { isLoggedOut } = useAuthStore();

  const { data: dashboardData } = useQuery({
    queryKey: ["challenge-dashboard", challengeId],
    queryFn: () => getChallengeDashboardAPI(),
    staleTime: 60 * 1000,
    enabled: !isLoggedOut,
  });

  const data: DashboardTableData[] = dashboardData
    ? formatDashboardData(dashboardData)
    : [];

  useEffect(() => {
    setSelectedValues(
      Object.keys(data.length !== 0 ? data[0] : []).map((_, idx) => idx)
    );
  }, [dashboardData]);

  return (
    <Frame title="챌린지 참여 현황" noLine>
      <FlexBox fullWidth col gap={40} as="section">
        {/* ========== Categories ========== */}
        <Categories
          list={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* ========== 참여자 별 참여 현황 ========== */}
        <FlexBox
          col
          fullWidth
          gap={24}
          style={{
            display: selectedCategory === 0 ? "flex" : "none",
          }}
          as="section"
        >
          {/* ========== SearchBar ========== */}
          <FlexBox fullWidth gap={20} align="center">
            <H4 weight="sb">전체 {data.length}명</H4>
            <SearchBar
              setValue={setSearchValue}
              fullWidth
              placeholder="이름으로 검색해보세요."
            />
          </FlexBox>

          {/* ========== Table ========== */}
          <Table
            data={data}
            searchValue={searchValue}
            searchedIdx={[0]} // 닉네임 index
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            isSort
            isButton
          />
        </FlexBox>

        {/* ========== 챌린지 날짜 별 참여 현황 ========== */}
        <MainCalendar
          calendarData={formatMainCalendarData(dashboardData || [])}
          totalCnt={dashboardData?.length || 0}
          style={{
            display: selectedCategory === 1 ? "flex" : "none",
          }}
        />
      </FlexBox>
    </Frame>
  );
};

export default ChallengeDashboardPage;
