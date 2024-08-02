import { useState } from "react";
import { Frame, Questions } from "../components/organisms";

const ChallengeQuestionPage = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Frame
      title="챌린지 질문 관리"
      subTitle={isEdit ? "질문은 최대 4개까지 등록할 수 있어요." : ""}
    >
      <Questions gap={50} isEdit={isEdit} setIsEdit={setIsEdit} hasEditBtn />
    </Frame>
  );
};

export default ChallengeQuestionPage;
