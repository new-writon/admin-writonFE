import { useNavigate } from "react-router-dom";
import { Button, FlexBox } from "../components/atoms";
import { B1 } from "../components/atoms/Text";
import { theme } from "../styles/theme";

const EmptyChallengePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <FlexBox
        col
        fullWidth
        align="center"
        gap={28}
        style={{ marginTop: "180px" }}
      >
        <img src="/images/page.svg" />
        <B1 color={theme.color.gray[70]}>아직 만들어진 챌린지가 없어요.</B1>
        <Button
          type="dark"
          size="lg"
          rightPlus
          onClick={() => navigate("/challenge/create")}
        >
          챌린지 개설하기
        </Button>
      </FlexBox>
    </>
  );
};

export default EmptyChallengePage;
