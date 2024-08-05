import styled from "styled-components";
import { FlexBox } from "../atoms";

const TopNav = () => {
  return (
    <Container>
      <FlexBox align="center" gap={10}>
        <img src="/icons/logo-typo.svg" />
        <Hyphen />
        <TopNavTxt>Admin</TopNavTxt>
      </FlexBox>
    </Container>
  );
};

export default TopNav;

const Container = styled.nav`
  display: flex;
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

const Hyphen = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.color.gray[30]};
`;
