import styled from "styled-components";
import { Button, FlexBox } from "../atoms";
import { B2 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import {
  challengeMenuList,
  participationMenuList,
} from "../../data/SideBarMenu";

interface Menu {
  isTitle?: boolean;
  path?: string;
  children: React.ReactNode;
}

const Menu = ({ isTitle, children, path }: Menu) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isCurPath = pathname == path;

  return (
    <MenuContainer
      as={isTitle ? "div" : "button"}
      onClick={() => !isTitle && navigate(`${path}`)}
    >
      <B2
        weight={isTitle || isCurPath ? "sb" : "r"}
        color={isCurPath ? theme.color.brand[50] : theme.color.gray[100]}
      >
        {children}
      </B2>
    </MenuContainer>
  );
};

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      {/* ========== Top Info ========== */}
      <FlexBox
        fullWidth
        align="center"
        justify="space-between"
        gap={12}
        padding="0px 10px"
        style={{ width: "240px" }}
      >
        <img src="/icons/logo.svg" />
        <B2 weight="sb" color={theme.color.gray[100]} style={{ flex: 1 }}>
          조직 이름
        </B2>
        <Button size="sm" type="none" onClick={() => {}}>
          설정
        </Button>
      </FlexBox>
      <Hyphen />

      {/* ========== Menu Bar ========== */}
      <FlexBox col fullWidth>
        <Menu isTitle>챌린지 관리</Menu>
        {challengeMenuList.map(({ name, path }) => (
          <Menu key={path} path={path}>
            {name}
          </Menu>
        ))}
      </FlexBox>
      <FlexBox col fullWidth>
        <Menu isTitle>참여자 관리</Menu>
        {participationMenuList.map(({ name, path }) => (
          <Menu key={path} path={path}>
            {name}
          </Menu>
        ))}
      </FlexBox>
      <Hyphen />

      {/* ========== Button ========== */}
      <ButtonContainer>
        <Button
          fullWidth
          rightPlus
          size="lg"
          type="light"
          onClick={() => {
            navigate("/challenge/create");
          }}
          disabled={location.pathname === "/challenge/create"}
        >
          챌린지 개설
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SideBar;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 260px;
  height: 100%;
  padding: 16px 10px;
  background-color: ${({ theme }) => theme.color.gray[10]};
  z-index: 1;
`;

const Hyphen = styled.div`
  width: calc(100% - 20px);
  height: 1px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.color.gray[30]};
`;

const MenuContainer = styled.button`
  display: flex;
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`;
