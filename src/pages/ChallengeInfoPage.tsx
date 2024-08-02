import styled from "styled-components";
import { Button, FlexBox, Line } from "../components/atoms";
import { B2, H3, L3 } from "../components/atoms/Text";
import { ContentSection, EditBtn, Input } from "../components/molecules";
import { Frame, Questions } from "../components/organisms";
import { theme } from "../styles/theme";
import { BsPaperclip } from "../components/atoms/Icons";
import { useState } from "react";
import { emailList } from "../data/ChallengeInfoPageData";
import DateInput from "../components/molecules/DateInput";

const ChallengeInfoPage = () => {
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
            <Button size="md" type="light" rightArrow>
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
            <Button size="md" type="light" rightArrow>
              참여자 정보 보러가기
            </Button>
          </FlexBox>
          {/*  참여자 파일  */}
          <ContentSection title="참여자 파일" titleWidth={156}>
            <FileInput>
              <BsPaperclip size={18} color={theme.color.gray[60]} />
              <B2 color={theme.color.gray[60]}>writon_user_email.xlsx</B2>
            </FileInput>
          </ContentSection>
          {/*  참여자 이메일  */}
          <ContentSection title="참여자 이메일" titleWidth={156}>
            <FlexBox col isFlex1 gap={16}>
              <L3 color={theme.color.gray[60]}>
                <span style={{ color: theme.color.brand[50] }}>
                  {emailList.length}
                </span>
                개의 이메일로 초대장이 전송되었습니다.
              </L3>
              <FlexBox gap={8} style={{ flexWrap: "wrap", width: "550px" }}>
                {emailList.map((email, idx) => (
                  <EmailChip key={idx}>
                    <L3 color={theme.color.gray[80]}>{email}</L3>
                  </EmailChip>
                ))}
              </FlexBox>
            </FlexBox>
          </ContentSection>
        </FlexBox>
      </FlexBox>
    </Frame>
  );
};

export default ChallengeInfoPage;

const FileInput = styled.div`
  display: flex;
  align-items: center;
  width: 433px;
  padding: 8px;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray[30]};
  background: ${({ theme }) => theme.color.gray[10]};
`;

const EmailChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.gray[20]};
`;
