import { Outlet, useLocation } from "react-router-dom";
import { TopNav, SideBar } from "../molecules";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { ScrollContext } from "../../states/FrameContext";

const Layout = () => {
  const loacation = useLocation();
  const pathname = loacation.pathname;
  const excludedPaths = ["/login", "/onBoarding"];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <>
      <TopNav />
      <Container>
        {!excludedPaths.includes(pathname) && <SideBar />}
        <ScrollContainer ref={scrollContainerRef}>
          <ScrollContext.Provider value={scrollToTop}>
            <Outlet />
          </ScrollContext.Provider>
        </ScrollContainer>
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

const ScrollContainer = styled.section`
  height: 100%;
  flex: 1;
  overflow-y: auto;
`;
