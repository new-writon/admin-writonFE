import { Button, FlexBox, Line } from "../components/atoms";
import { H3 } from "../components/atoms/Text";
import { ContentSection, EditBtn, Input } from "../components/molecules";
import { Frame, Participate, Questions } from "../components/organisms";
import { theme } from "../styles/theme";
import { useState } from "react";
import DateInput from "../components/molecules/DateInput";
import { useNavigate } from "react-router-dom";

const ChallengeInfoPage = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("라이톤 끄적끄적 챌린지");
  const [startDate, setstartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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
          {/*  챌린지 이름  */}
          <ContentSection title="챌린지 이름" titleWidth={180}>
            <Input disabled={!isEdit} value={name} setValue={setName} />
          </ContentSection>
          {/*  챌린지 진행 기간  */}
          <ContentSection title="챌린지 진행 기간" titleWidth={180}>
            <FlexBox gap={14} align="center">
              <DateInput
                type="start"
                value={startDate}
                setValue={setstartDate}
                disabled={!isEdit}
              />
              <H3 color={theme.color.gray[60]}>~</H3>
              <DateInput
                type="end"
                value={endDate}
                setValue={setEndDate}
                disabled={!isEdit}
              />
            </FlexBox>
          </ContentSection>
          {/*  챌린지 진행 날짜  */}
          <ContentSection title="챌린지 진행 날짜" titleWidth={180}>
            <Input disabled value="라이톤 끄적끄적 챌린지" />
          </ContentSection>
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
