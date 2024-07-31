import { Outlet, useLocation } from "react-router-dom";
import { TopNav, SideBar } from "../molecules";
import { FlexBox } from "../atoms";
import ScrollToTop from "../../utils/ScrollToTop";

const Layout = () => {
  const loacation = useLocation();
  const curPath = loacation.pathname;
  const excludedPaths = ["/login", "/onBoarding"];

  return (
    <>
      <ScrollToTop />
      <TopNav />
      <FlexBox fullWidth style={{ zIndex: "1" }}>
        {!excludedPaths.includes(curPath) && <SideBar />}
        <Outlet />
      </FlexBox>
    </>
  );
};

export default Layout;
