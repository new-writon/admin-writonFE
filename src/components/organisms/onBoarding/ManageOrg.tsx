import { theme } from "../../../styles/theme";
import { Button, FlexBox, Select } from "../../atoms";
import { B1, H2, L3 } from "../../atoms/Text";
import { InputDropdown, PreviewContents, Title } from "../../molecules";
import styled from "styled-components";
import { ManageOrgProps } from "../../../interfaces/organization";

const ManageOrg = ({
  moveStep,
  disabled,
  data,
  setData,
  handleCreate,
}: ManageOrgProps) => {
  const handleComplete = () => {
    if (data.length !== 0) {
      handleCreate?.();
    } else {
      alert("포지션은 반드시 하나 이상 설정해야합니다.");
    }
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

      {/* ========== Position Input ========== */}
      <FlexBox col fullWidth gap={20}>
        <Title
          title="포지션 설정"
          subTitle="유저가 가입 시 선택할 포지션을 설정해주세요."
          isRequired
        />
        <InputDropdown
          type="position"
          list={data}
          setList={(value: string[]) => setData?.(value)}
        />
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
            {data.map((pos, idx) => (
              <Select type="default" key={idx}>
                {pos}
              </Select>
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <Line />

      {/* ========== Preview ========== */}
      <PreviewContents positionList={data} hasNotice />

      {/* ========== Button ========== */}
      <FlexBox fullWidth align="center" gap={16}>
        <Button
          type="empty"
          size="lg"
          fullWidth
          onClick={() => moveStep?.(-1)}
          disabled={disabled}
        >
          이전
        </Button>
        <Button
          type="dark"
          size="lg"
          fullWidth
          onClick={handleComplete}
          disabled={disabled}
        >
          개설 완료
        </Button>
      </FlexBox>
    </>
  );
};

export default ManageOrg;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray[30]};
`;
