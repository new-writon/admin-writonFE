import { Outlet, useLocation } from "react-router-dom";
import { TopNav, SideBar } from "../molecules";
import { FlexBox } from "../atoms";
import ScrollToTop from "../../utils/ScrollToTop";
import styled from "styled-components";

const Layout = () => {
  const loacation = useLocation();
  const curPath = loacation.pathname;
  const excludedPaths = ["/login", "/onBoarding"];

  return (
    <>
      <ScrollToTop />
      <TopNav />
      <Container>
        {!excludedPaths.includes(curPath) && <SideBar />}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

const Container = styled.section`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
`;

`;
