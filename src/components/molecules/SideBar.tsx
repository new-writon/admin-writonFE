import styled from "styled-components";
import { Button, FlexBox } from "../atoms";
import { B2 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import {
  challengeMenuList,
  participationMenuList,
} from "../../data/SideBarMenu";
import useOrganizationStore from "../../states/OrganizationStore";
import useChallengeStore from "../../states/ChallengeStore";
import { BiBuildings, IoIosArrowBack, IoIosArrowForward } from "../atoms/Icons";
import { useState } from "react";

interface Menu {
  isTitle?: boolean;
  path?: string;
  children: React.ReactNode;
}

const Menu = ({ isTitle, children, path }: Menu) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { challengeList } = useChallengeStore();

  const isCurPath = pathname == path;
  const disabled = challengeList.length === 0;

  return (
    <MenuContainer
      as={isTitle ? "div" : "button"}
      onClick={() => !isTitle && navigate(`${path}`)}
      disabled={disabled}
      $disabled={disabled}
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
  const { organizationName, organizationLogo } = useOrganizationStore();
  const [isSidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= theme.size.tablet
  );

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

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
        <ImgConatainer>
          {organizationLogo ? (
            <img src={organizationLogo} alt="organizaiton_logo" />
          ) : (
            <BiBuildings size={24} color={theme.color.gray[80]} />
          )}
        </ImgConatainer>
        <B2 weight="sb" color={theme.color.gray[100]} style={{ flex: 1 }}>
          {organizationName}
        </B2>
        <Button
          size="sm"
          type="none"
          onClick={() => {
            navigate("/organization/edit");
          }}
        >
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
      <MenuToggleButton onClick={toggleSidebar} $isOpen={isSidebarOpen}>
        {isSidebarOpen ? (
          <IoIosArrowBack size={24} color={theme.color.gray[80]} />
        ) : (
          <IoIosArrowForward size={24} color={theme.color.gray[80]} />
        )}
      </MenuToggleButton>
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
const MenuToggleButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  display: none;

  top: 80px;
  left: 20px;
  width: 40px;
  height: 40px;

  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid ${({ theme }) => theme.color.gray[40]};
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px rgba(33, 33, 33, 0.15);
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(260px)" : "translateX(0)"};
  z-index: 1;

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Hyphen = styled.div`
  width: calc(100% - 20px);
  height: 1px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.color.gray[30]};
`;

const MenuContainer = styled.button<{ $disabled: boolean }>`
  display: flex;
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const ImgConatainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.gray[30]};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
