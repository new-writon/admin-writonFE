import { useNavigate } from "react-router-dom";
import { theme } from "../../../styles/theme";
import { Button, FlexBox } from "../../atoms";
import { B1, H2 } from "../../atoms/Text";

const CompleteOrg = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ========== Form Title ========== */}
      <FlexBox col align="center" gap={10}>
        <H2>조직 개설 완료!</H2>
        <B1 color={theme.color.gray[60]}>
          조직 개설을 완료했어요. 챌린지를 만들어 볼까요?
        </B1>
      </FlexBox>

      {/* ========== Image ========== */}
      <img src="/images/fanfare.svg" />

      {/* ========== Buttons ========== */}
      <FlexBox col fullWidth gap={16} align="center">
        <Button
          type="dark"
          size="lg"
          fullWidth
          onClick={() => {
            navigate("/login");
          }}
        >
          챌린지 개설하기
        </Button>
        <Button
          type="none"
          size="lg"
          onClick={() => {
            navigate("/");
          }}
        >
          어드민 홈으로
        </Button>
      </FlexBox>
    </>
  );
};

export default CompleteOrg;
