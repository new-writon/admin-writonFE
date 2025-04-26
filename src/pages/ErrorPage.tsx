import { useNavigate } from "react-router-dom";
import { Button, FlexBox } from "../components/atoms";
import { B1, C1, H1 } from "../components/atoms/Text";
import { theme } from "../styles/theme";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <FlexBox
      col
      justify="center"
      align="center"
      gap={28}
      style={{ height: "100%" }}
    >
      <H1>잘못된 접근입니다.</H1>
      <FlexBox
        col
        justify="center"
        align="center"
        gap={16}
        padding="0 0 16px 0"
      >
        <B1 style={{ textAlign: "center" }} color={theme.color.gray[90]}>
          인증에 실패하여 페이지에 접근할 수 없습니다. <br />{" "}
          <span style={{ color: theme.color.brand[50] }}>원래 페이지</span>로
          돌아가거나{" "}
          <span style={{ color: theme.color.brand[50] }}>대시보드 페이지</span>
          로 이동해 서비스를 다시 이용해주세요.
        </B1>
        <C1 color={theme.color.gray[70]}>
          문제가 지속될 경우 서비스 관리자에게 문의해주세요.
        </C1>
      </FlexBox>
      <Button
        size="lg"
        type="dark"
        onClick={() => navigate("/challenge/dashboard")}
      >
        대시보드 페이지 이동
      </Button>
    </FlexBox>
  );
};

export default ErrorPage;
