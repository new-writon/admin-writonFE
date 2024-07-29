import { Outlet } from "react-router-dom";
import { TopNav, SideBar } from "../molecules";
import { FlexBox } from "../atoms";

const Layout = () => {
  return (
    <>
      <TopNav />
      <FlexBox fullWidth style={{ zIndex: "1" }}>
        <SideBar />
        <Outlet />
      </FlexBox>
    </>
  );
};

export default Layout;
