import styled from "styled-components";
import { Button, FlexBox, Line } from "../atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAuthLogoutAPI } from "../../apis";
import { useLocation } from "react-router-dom";
import useChallengeStore from "../../states/ChallengeStore";
import useOrganizationStore from "../../states/OrganizationStore";
import { removeAccessTokenExpireCookie } from "../../utils/cookieUtils";
import useAuthStore from "../../states/AuthStore";

const TopNav = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { reset: challengeReset } = useChallengeStore();
  const { reset: organizationReset } = useOrganizationStore();
  const { setIsLoggedOut } = useAuthStore();
  const excludedLogoutBtn = ["/login", "/onBoarding"];

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => postAuthLogoutAPI(),
    onSuccess: () => {
      setIsLoggedOut(true);

      queryClient.removeQueries(); // 캐싱된 모든 데이터 삭제
      removeAccessTokenExpireCookie(); // 프론트엔드 측에 저장한 토큰 만료여부 쿠키 제거
      challengeReset(); // 챌린지 정보 전역 상태 제거
      organizationReset(); // 조직 정보 전역 상태 제거

      window.location.href = "/login";
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onClickLogout = () => {
    const checked = confirm("로그아웃 하시겠습니까?");
    if (checked) {
      handleLogout();
    }
  };

  return (
    <Container>
      <FlexBox align="center" gap={10}>
        <img src="/icons/logo-typo.svg" alt="logo-typo" />
        <Line height={20} />
        <TopNavTxt>Admin</TopNavTxt>
      </FlexBox>
      {!excludedLogoutBtn.includes(location.pathname) && (
        <Button type="none" size="sm" onClick={onClickLogout}>
          로그아웃
        </Button>
      )}
    </Container>
  );
};

export default TopNav;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0px 30px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[20]};
  background: ${({ theme }) => theme.color.base.white};
  box-shadow: 0px 8px 12px 0px rgba(210, 213, 219, 0.25);
  z-index: 2;
`;

const TopNavTxt = styled.p`
  color: ${({ theme }) => theme.color.gray[100]};
  font-size: 24px;
  font-weight: 300;
  line-height: 100%;
`;
