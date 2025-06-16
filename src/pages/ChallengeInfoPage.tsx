import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, FlexBox, Line } from "../components/atoms";
import { H3 } from "../components/atoms/Text";
import { EditBtn } from "../components/molecules";
import {
  BasicInfo,
  Frame,
  Participate,
  Questions,
} from "../components/organisms";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getChallengeInfoAPI,
  getChallengeQuestionsAPI,
  getParticipationEmailAPI,
  putChallengeInfoAPI,
} from "../apis";
import useChallengeStore from "../states/ChallengeStore";
import { BasicInfoData } from "../interfaces/challenge";
import {
  defaultBasicInfoData,
  defaultQuestionsData,
} from "../data/ChallengeData";
import { formatQuestionsCreateEmpty } from "../utils/formatUtils";

const ChallengeInfoPage = () => {
  const navigate = useNavigate();
  const { challengeId, challengeList, setChallengeList } = useChallengeStore();
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const [basicInfoData, setBasicInfoData] =
    useState<BasicInfoData>(defaultBasicInfoData);

  const { data: basicInfoResponse } = useQuery({
    queryKey: ["challenge-info", challengeId],
    queryFn: () => getChallengeInfoAPI(),
    staleTime: 60 * 1000,
  });

  const { data: questionsResponse } = useQuery({
    queryKey: ["challenge-questions", challengeId],
    queryFn: () => getChallengeQuestionsAPI(),
    staleTime: 60 * 1000,
  });

  const { data: emailResponse } = useQuery({
    queryKey: ["participation-email", challengeId],
    queryFn: () => getParticipationEmailAPI(),
    staleTime: 60 * 1000,
  });

  const { mutate: handleEditChallengeInfo } = useMutation({
    mutationFn: () => putChallengeInfoAPI(basicInfoData),
    onSuccess: (data) => {
      setBasicInfoData(data);
      setChallengeList(
        challengeList.map((item) =>
          item.id === challengeId
            ? {
                id: item.id,
                name: data.name,
              }
            : item
        )
      );

      queryClient.setQueryData(["challenge-info", challengeId], data);
      alert("수정 완료");
      setIsEdit(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleEdit = () => {
    if (
      basicInfoData.name &&
      basicInfoData.startDate &&
      basicInfoData.endDate &&
      basicInfoData.processDates.length != 0
    ) {
      handleEditChallengeInfo();
    } else {
      alert("입력값을 모두 입력하세요.");
    }
  };

  const handleCancel = () => {
    basicInfoResponse && setBasicInfoData(basicInfoResponse);
  };

  useEffect(() => {
    basicInfoResponse && setBasicInfoData(basicInfoResponse);
  }, [basicInfoResponse]);

  return (
    <Frame title="챌린지 정보">
      <FlexBox col fullWidth gap={40}>
        {/*  ========== 기본 정보 ==========  */}
        <FlexBox col fullWidth gap={24} as="section">
          <FlexBox fullWidth justify="space-between">
            <H3>기본 정보</H3>
            <EditBtn
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              handleEdit={handleEdit}
              handleCancel={handleCancel}
            />
          </FlexBox>
          <BasicInfo
            isEdit={isEdit}
            data={basicInfoData}
            setData={setBasicInfoData}
          />
        </FlexBox>
        <Line />

        {/*  ========== 챌린지 질문 ==========  */}
        <FlexBox col fullWidth gap={24} as="section">
          <FlexBox fullWidth justify="space-between">
            <H3>챌린지 질문</H3>
            <Button
              size="md"
              type="light"
              rightArrow
              onClick={() => navigate("/challenge/question")}
            >
              질문 관리하러 가기
            </Button>
          </FlexBox>
          <Questions
            gap={24}
            data={questionsResponse || defaultQuestionsData}
            backupData={
              questionsResponse && formatQuestionsCreateEmpty(questionsResponse)
            }
          />
        </FlexBox>
        <Line />

        {/*  ========== 참여자 정보 ==========  */}
        <FlexBox col fullWidth gap={24} as="section">
          <FlexBox fullWidth justify="space-between">
            <H3>참여자 정보</H3>
            <Button
              size="md"
              type="light"
              rightArrow
              onClick={() => navigate("/participation/info")}
            >
              참여자 정보 보러가기
            </Button>
          </FlexBox>
          <Participate gap={24} emailList={emailResponse} />
        </FlexBox>
      </FlexBox>
    </Frame>
  );
};

export default ChallengeInfoPage;
