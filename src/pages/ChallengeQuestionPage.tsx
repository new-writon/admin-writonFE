import { useEffect, useState } from "react";
import { Frame, Questions } from "../components/organisms";
import { useQuery } from "@tanstack/react-query";
import { getChallengeQuestionsAPI } from "../apis";
import useChallengeStore from "../states/ChallengeStore";
import { QuestionsData } from "../interfaces/challenge";

const ChallengeQuestionPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { challengeId } = useChallengeStore();
  const [questionsData, setQuestionsData] = useState<QuestionsData>();

  const { data } = useQuery({
    queryKey: ["challenge-questions", challengeId],
    queryFn: () => getChallengeQuestionsAPI(),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    setQuestionsData(data);
  }, [data]);

  return (
    <Frame
      title="챌린지 질문 관리"
      subTitle={isEdit ? "질문은 최대 4개까지 등록할 수 있어요." : ""}
    >
      <Questions
        gap={50}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        hasEditBtn
        data={questionsData}
      />
    </Frame>
  );
};

export default ChallengeQuestionPage;
