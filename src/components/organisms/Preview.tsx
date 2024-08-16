import { theme } from "../../styles/theme";
import { Button, FlexBox } from "../atoms";
import { B1, H2 } from "../atoms/Text";
import { PreviewContents } from "../molecules";

const Preview = () => {
  const positionList = ["포지션1", "포지션2"];

  return (
    <>
      {/* ========== Title ========== */}
      <FlexBox col gap={24} align="center">
        <FlexBox col gap={16} align="center">
          <img src="/icons/logo.svg" alt="logo" />
          <B1 weight="sb" color={theme.color.gray[70]}>
            라이톤 챌린지
          </B1>
        </FlexBox>
        <H2 style={{ textAlign: "center" }}>
          챌린지 시작 전,
          <br />
          몇가지 정보를 알려주세요
        </H2>
      </FlexBox>

      {/* ========== Questions ========== */}
      <FlexBox col fullWidth>
        <PreviewContents positionList={positionList} />
      </FlexBox>

      {/* ========== Button ========== */}
      <Button size="lg" type="dark" disabled fullWidth>
        완료하고 챌린지 시작하기
      </Button>
    </>
  );
};

export default Preview;
