import { useEffect, useState } from "react";
import { Frame, Questions } from "../components/organisms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChallengeQuestionsAPI, putChallengeQuestionsAPI } from "../apis";
import useChallengeStore from "../states/ChallengeStore";
import { QuestionsData } from "../interfaces/challenge";
import {
  formatQuestionsCreateEmpty,
  formatQuestionsRemoveEmpty,
} from "../utils/formatUtils";
import { defaultQuestionsData } from "../data/ChallengeData";

const ChallengeQuestionPage = () => {
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const { challengeId } = useChallengeStore();
  const [questionsData, setQuestionsData] =
    useState<QuestionsData>(defaultQuestionsData);
  const [backupData, setBackupData] =
    useState<QuestionsData>(defaultQuestionsData);

  const { data } = useQuery({
    queryKey: ["challenge-questions", challengeId],
    queryFn: () => getChallengeQuestionsAPI(),
    staleTime: 60 * 1000,
  });

  const { mutate: handleEditChallengeQuestions } = useMutation({
    mutationFn: () =>
      putChallengeQuestionsAPI(formatQuestionsRemoveEmpty(questionsData)),
    onSuccess: (data) => {
      setQuestionsData(formatQuestionsCreateEmpty(data));
      queryClient.setQueryData(["challenge-questions", challengeId], data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    data && setQuestionsData(formatQuestionsCreateEmpty(data));
    data && setBackupData(formatQuestionsCreateEmpty(data));
  }, [data]);

  const handleEdit = () => {
    if (
      questionsData.basicQuestions[0] &&
      questionsData.specialQuestions.some((item) => item.questions[0] != "")
    ) {
      handleEditChallengeQuestions();
      alert("수정 완료");
      setIsEdit(false);
    } else {
      alert("필수 입력값을 모두 입력하세요.");
    }
  };

  return (
    <Frame
      title="챌린지 질문 관리"
      subTitle={isEdit ? "질문은 최대 4개까지 등록할 수 있어요." : ""}
    >
      <Questions
        gap={50}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleEdit={handleEdit}
        data={questionsData}
        setData={setQuestionsData}
        backupData={backupData}
      />
    </Frame>
  );
};

export default ChallengeQuestionPage;
