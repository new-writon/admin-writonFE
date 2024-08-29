import { Button, FlexBox, SearchBar } from "../components/atoms";
import { H4 } from "../components/atoms/Text";
import { Frame, Table } from "../components/organisms";
import { useEffect, useState } from "react";
import { arrayToExcelFile } from "../utils/excelUtils";
import { fieldTranslations } from "../utils/formatUtils";
import { Filter } from "../components/molecules";
import { useMutation, useQuery } from "@tanstack/react-query";
import useChallengeStore from "../states/ChallengeStore";
import {
  getParticipationInfoAPI,
  postParticipationWithdrawalAPI,
} from "../apis";
import { ParticipationTableData } from "../interfaces/participation";

const ParticipationInfoPage = () => {
  const { challengeId } = useChallengeStore();
  const [data, setData] = useState<ParticipationTableData[]>([]);

  const { data: participationData } = useQuery({
    queryKey: ["participation-info", challengeId],
    queryFn: () => getParticipationInfoAPI(),
    staleTime: 60 * 1000,
  });

  const filterList: string[] = Object.keys(
    participationData ? participationData[0] : []
  );
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // 강퇴 기능
  const { mutate: handleWithdrawal } = useMutation({
    mutationFn: () => postParticipationWithdrawalAPI(selectedRows),
    onSuccess: (data) => {
      alert("선택된 유저들이 강퇴되었습니다.");
      setSelectedRows([]);
      setData(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onClickWithdrawal = () => {
    if (selectedRows.length === 0) {
      alert("선택된 유저가 없습니다.");
    } else {
      const checked = confirm("선택된 유저들을 강퇴시키겠습니까?");
      checked && handleWithdrawal();
    }
  };

  // 엑셀파일 다운 기능
  const onClickDownloadExcel = () => {
    const result = confirm("다운로드 받으시겠습니까?");

    if (result && data) {
      const downloadData = [
        filterList
          .filter((_, idx) => idx !== 0)
          .map((value) => fieldTranslations(value)),
        ...data.map((item) =>
          Object.values(item).filter((_, idx) => idx !== 0)
        ),
      ];

      arrayToExcelFile(downloadData);
    }
  };

  useEffect(() => {
    setSelectedValues(filterList.map((_, idx) => idx));
    participationData && setData(participationData);
  }, [participationData]);

  return (
    <Frame title="참여자 정보">
      <FlexBox fullWidth col gap={20} style={{ overflow: "auto" }}>
        {/* ========== SearchBar ==========  */}
        <FlexBox fullWidth align="center" justify="space-between">
          <FlexBox gap={20} align="center">
            <H4 weight="sb">전체 {data?.length}명</H4>
            <SearchBar setValue={setSearchValue} />
          </FlexBox>
          <FlexBox align="center" gap={4}>
            <Button size="sm" type="none" onClick={onClickWithdrawal}>
              강퇴
            </Button>
            <Button
              size="sm"
              type="none"
              downloadIcon
              onClick={onClickDownloadExcel}
            >
              다운
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox col fullWidth gap={4}>
        {/* ========== Filter ==========  */}
        <Filter
          list={filterList}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          hiddenCols={[0, 1]}
        />

        {/* ========== Table ==========  */}
        <Table
          data={data || []}
          selectedValues={selectedValues}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          searchValue={searchValue}
          searchedIdx={[2, 10]} // 닉네임, 이메일 index
          isCheckBox
          hiddenCols={[0, 1]}
        />
      </FlexBox>
    </Frame>
  );
};

export default ParticipationInfoPage;
