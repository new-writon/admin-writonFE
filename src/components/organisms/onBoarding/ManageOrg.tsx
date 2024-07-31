import { FormEvent, useState } from "react";
import { theme } from "../../../styles/theme";
import { Button, FlexBox, InputChip, Select } from "../../atoms";
import { B1, H2, L3 } from "../../atoms/Text";
import { Input, Title } from "../../molecules";
import styled from "styled-components";

interface ManageOrg {
  moveStep: (path: -1 | 1) => void;
}

const ManageOrg = ({ moveStep }: ManageOrg) => {
  const [position, setPosition] = useState("");
  const [positionList, setPositionList] = useState<string[]>([]);

  const addPosition = (e: FormEvent) => {
    e.preventDefault();
    setPositionList([...positionList, position]);
    setPosition("");
  };

  const deletePosition = (selectedIdx: number) => {
    setPositionList(positionList.filter((_, idx) => idx != selectedIdx));
  };

  return (
    <>
      {/* ========== Form Title ========== */}
      <FlexBox col align="center" gap={10}>
        <H2>조직 온보딩 관리</H2>
        <B1 color={theme.color.gray[60]}>
          조직에 가입할 유저의 온보딩 항목을 관리합니다.
        </B1>
      </FlexBox>

      {/* ========== 포지션 설정 ========== */}
      <FlexBox col fullWidth gap={20}>
        <Title
          title="포지션 설정"
          subTitle="유저가 가입 시 선택할 포지션을 설정해주세요."
          isRequired
        />
        <PositionInput
          style={{ padding: positionList.length == 0 ? "8px 16px" : "8px" }}
          onSubmit={addPosition}
        >
          {positionList.map((pos, idx) => (
            <InputChip key={idx} onClick={() => deletePosition(idx)}>
              {pos}
            </InputChip>
          ))}
          <input
            value={position}
            onChange={(e) => setPosition(e.currentTarget.value)}
            placeholder="포지션을 입력해주세요."
          />
        </PositionInput>
        <FlexBox col gap={10}>
          <L3 weight="sb" color={theme.color.gray[60]}>
            등록된 포지션
          </L3>
          <FlexBox
            fullWidth
            align="center"
            gap={8}
            style={{ flexWrap: "wrap" }}
          >
            <Select type="disabled">ex) 기획</Select>
            {positionList.map((pos) => (
              <Select type="default">{pos}</Select>
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <Line />

      {/* ========== 예시 화면 ========== */}
      <FlexBox col fullWidth gap={20} align="center">
        <NoticeTxt>
          온보딩 항목은 유저에게 다음과 같이 보여집니다. &nbsp;&nbsp;
          <span>예시</span>
        </NoticeTxt>
        <FlexBox col fullWidth gap={16}>
          <Title
            title="닉네임"
            subTitle="유저가 사용할 닉네임을 입력합니다."
            isRequired
          />
          <Input placeHolder="ex) 토니" disabled />
        </FlexBox>

        <Title
          title="포지션 설정"
          subTitle="유저의 포지션을 설정합니다."
          isRequired
        />
        <FlexBox fullWidth align="center" gap={8} style={{ flexWrap: "wrap" }}>
          {positionList.map((pos) => (
            <Select type="default">{pos}</Select>
          ))}
        </FlexBox>

        <FlexBox col fullWidth gap={16}>
          <Title
            title="소속"
            subTitle="유저가 소속중인 회사/동아리 등의 이름을 입력합니다."
            isSwitch
          />
          <Input placeHolder="ex) 라이톤" disabled />
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
          />
        </FlexBox>

        <FlexBox col fullWidth gap={16}>
          <Title
            title="합류 날짜"
            subTitle="유저가 소속(회사/동아리 등)에 합류한 날짜를 입력합니다."
            isSwitch
          />
          <Input placeHolder="ex) 2024-01-01" disabled />
        </FlexBox>
      </FlexBox>
      <FlexBox fullWidth align="center" gap={16}>
        <Button type="empty" size="lg" fullWidth onClick={() => moveStep(-1)}>
          이전
        </Button>
        <Button type="dark" size="lg" fullWidth onClick={() => moveStep(1)}>
          다음
        </Button>
      </FlexBox>
    </>
  );
};

export default ManageOrg;

const PositionInput = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray[30]};
  background: ${({ theme }) => theme.color.gray[10]};

  input {
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    flex: 1;
    background-color: transparent;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray[30]};
`;

const NoticeTxt = styled.p`
  ${({ theme }) => theme.font.b2}
  color: ${({ theme }) => theme.color.gray[60]};

  span {
    color: ${({ theme }) => theme.color.brand[50]};
  }
`;
