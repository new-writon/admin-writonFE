import styled from "styled-components";
import { Button, FlexBox, Line } from "../atoms";
import { useMutation } from "@tanstack/react-query";
import { postAuthLogoutAPI } from "../../apis";
import { useLocation, useNavigate } from "react-router-dom";
import useChallengeStore from "../../states/ChallengeStore";
import useOrganizationStore from "../../states/OrganizationStore";

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { reset: challengeReset } = useChallengeStore();
  const { reset: organizationReset } = useOrganizationStore();
  const excludedLogoutBtn = ["/login", "/onBoarding"];

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => postAuthLogoutAPI(),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      challengeReset();
      organizationReset();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onClickLogout = () => {
    const checked = confirm("로그아웃 하시겠습니까?");
    if (checked) {
      navigate("/login");
      handleLogout();
    }
  };

  return (
    <Container>
      <FlexBox align="center" gap={10}>
        <img src="/icons/logo-typo.svg" />
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

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 1240px;
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
