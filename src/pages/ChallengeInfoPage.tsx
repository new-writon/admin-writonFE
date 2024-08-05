import { Button, FlexBox, Line } from "../components/atoms";
import { H3 } from "../components/atoms/Text";
import { EditBtn } from "../components/molecules";
import {
  BasicInfo,
  Frame,
  Participate,
  Questions,
} from "../components/organisms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChallengeInfoPage = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    alert("수정 완료");
    setIsEdit(false);
  };

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
          <BasicInfo isEdit={isEdit} />
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
          <Questions gap={24} />
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
          <Participate gap={24} />
        </FlexBox>
      </FlexBox>
    </Frame>
  );
};

export default ChallengeInfoPage;
