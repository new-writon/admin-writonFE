import { useQuery } from "@tanstack/react-query";
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
import { getChallengeInfoAPI, getChallengeQuestionsAPI } from "../apis";
import useChallengeStore from "../states/ChallengeStore";
import { BasicInfoData } from "../interfaces/challenge";

const ChallengeInfoPage = () => {
  const navigate = useNavigate();
  const { challengeId } = useChallengeStore();

  const [isEdit, setIsEdit] = useState(false);
  const [basicInfoData, setBasicInfoData] = useState<BasicInfoData>();
  const emailList: string[] = [];

  const handleEdit = () => {
    alert("수정 완료");
    setIsEdit(false);
  };

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

  useEffect(() => {
    setBasicInfoData(basicInfoResponse);
  }, [basicInfoResponse]);

  return (
    <Frame title="챌린지 정보">
      <FlexBox col fullWidth gap={40}>
        {/*  ========== 기본 정보 ==========  */}
        <FlexBox col fullWidth gap={24}>
          <FlexBox fullWidth justify="space-between">
            <H3>기본 정보</H3>
            <EditBtn
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              handleEdit={handleEdit}
            />
          </FlexBox>
          <BasicInfo isEdit={isEdit} data={basicInfoData} />
        </FlexBox>
        <Line />

        {/*  ========== 챌린지 질문 ==========  */}
        <FlexBox col fullWidth gap={24}>
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
          <Questions gap={24} data={questionsResponse} />
        </FlexBox>
        <Line />

        {/*  ========== 참여자 정보 ==========  */}
        <FlexBox col fullWidth gap={24}>
          <FlexBox fullWidth justify="space-between">
            <H3>참여자 정보</H3>
            <Button
              size="md"
              type="light"
              rightArrow
              onClick={() => navigate("/participation/participate")}
            >
              참여자 정보 보러가기
            </Button>
          </FlexBox>
          <Participate gap={24} emailList={emailList} />
        </FlexBox>
      </FlexBox>
    </Frame>
  );
};

export default ChallengeInfoPage;
