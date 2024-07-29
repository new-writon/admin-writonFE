import { Outlet, useLocation } from "react-router-dom";
import { TopNav, SideBar } from "../molecules";
import { FlexBox } from "../atoms";

const Layout = () => {
  const loacation = useLocation();
  const curPath = loacation.pathname;
  const excludedPaths = ["/login"];

  return (
    <>
      <TopNav />
      <FlexBox fullWidth style={{ zIndex: "1" }}>
        {!excludedPaths.includes(curPath) && <SideBar />}
        <Outlet />
      </FlexBox>
    </>
  );
};

export default Layout;
