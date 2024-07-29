import styled from "styled-components";
import { Button, FlexBox } from "../atoms";
import { B2 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

interface Menu {
  isTitle?: boolean;
  path?: string;
  children: React.ReactNode;
}

const Menu = ({ isTitle, children, path }: Menu) => {
  const navigate = useNavigate();

  return (
    <MenuContainer
      as={isTitle ? "div" : "button"}
      onClick={() => !isTitle && navigate(`/${path}`)}
    >
      <B2 weight={isTitle ? "sb" : "r"} color={theme.color.gray[100]}>
        {children}
      </B2>
    </MenuContainer>
  );
};

const SideBar = () => {
  return (
    <Container>
      {/* ========== Top Info ========== */}
      <FlexBox
        fullWidth
        align="center"
        justify="space-between"
        gap="12px"
        padding="0px 10px"
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
        <Menu>챌린지 참여 현황</Menu>
        <Menu>챌린지 정보</Menu>
        <Menu>챌린지 질문 관리</Menu>
        <Menu>기능 커스텀</Menu>
      </FlexBox>
      <FlexBox col fullWidth>
        <Menu isTitle>참여자 관리</Menu>
        <Menu>참여자 정보</Menu>
        <Menu>참여자 초대</Menu>
      </FlexBox>
      <Hyphen />

      {/* ========== Button ========== */}
      <ButtonContainer>
        <Button fullWidth rightPlus size="lg" type="light" onClick={() => {}}>
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
  height: calc(100vh - 60px);
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
