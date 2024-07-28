import styled from "styled-components";
import { FlexBox } from "../atoms";
import { Outlet } from "react-router-dom";
import { B2, L2, H1 } from "../atoms/Text";
import { theme } from "../../styles/theme";

const Layout = () => {
  return <></>;
};

export default Layout;

const TopNav = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[20]};
  background: ${({ theme }) => theme.color.base.white};
  box-shadow: 0px 8px 12px 0px rgba(210, 213, 219, 0.25);
`;

const SideBar = styled.section`
  display: flex;
`;
