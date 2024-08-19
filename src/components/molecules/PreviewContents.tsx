import styled from "styled-components";
import { Input, Title } from ".";
import { FlexBox, Select } from "../atoms";

interface PreviewContents {
  positionList: string[];
  hasNotice?: boolean;
}

const PreviewContents = ({ positionList, hasNotice }: PreviewContents) => {
  return (
    <FlexBox col fullWidth gap={20} align="center">
      {hasNotice && (
        <NoticeTxt>
          온보딩 항목은 유저에게 다음과 같이 보여집니다. &nbsp;&nbsp;
          <span>예시</span>
        </NoticeTxt>
      )}

      <FlexBox col fullWidth gap={16}>
        <Title
          title="닉네임"
          subTitle="유저가 사용할 닉네임을 입력합니다."
          isRequired
        />
        <Input placeHolder="ex) 토니" disabled fullWidth />
      </FlexBox>

      <Title
        title="포지션 설정"
        subTitle="유저의 포지션을 설정합니다."
        isRequired
      />
      <FlexBox fullWidth align="center" gap={8} style={{ flexWrap: "wrap" }}>
        {positionList.map((pos, idx) => (
          <Select type="default" key={idx}>
            {pos}
          </Select>
        ))}
      </FlexBox>

      <FlexBox col fullWidth gap={16}>
        <Title
          title="소속"
          subTitle="유저가 소속중인 회사/동아리 등의 이름을 입력합니다."
          isSwitch
        />
        <Input placeHolder="ex) 라이톤" disabled fullWidth />
      </FlexBox>

      <FlexBox col fullWidth gap={16}>
        <Title
          title="한 줄 소개"
          subTitle="유저의 한 줄 소개를 입력합니다."
          isSwitch
        />
        <Input
          placeHolder="ex) 라이톤에서 서비스 기획을 담당하고 있는 토니입니다!"
          disabled
          fullWidth
        />
      </FlexBox>

      <FlexBox col fullWidth gap={16}>
        <Title
          title="합류 날짜"
          subTitle="유저가 소속(회사/동아리 등)에 합류한 날짜를 입력합니다."
          isSwitch
        />
        <Input placeHolder="ex) 2024-01-01" disabled fullWidth />
      </FlexBox>
    </FlexBox>
  );
};

export default PreviewContents;

const NoticeTxt = styled.p`
  ${({ theme }) => theme.font.b2}
  color: ${({ theme }) => theme.color.gray[60]};

  span {
    color: ${({ theme }) => theme.color.brand[50]};
  }
`;
