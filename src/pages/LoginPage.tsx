import styled from "styled-components";
import { Button, FlexBox, Input } from "../components/atoms";
import { H2, L3 } from "../components/atoms/Text";
import { useState } from "react";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    navigate("/");
  };

  return (
    <Background>
      <Container>
        <Form>
          {/* ========== Title ========== */}
          <FlexBox align="center" gap={10}>
            <TitleTxt>Admin</TitleTxt>
            <H2>로그인</H2>
          </FlexBox>

          {/* ========== Inputs ========== */}
          <FlexBox col gap={20}>
            <Input
              title="아이디"
              placeHolder="이메일 형식의 아이디를 입력해주세요."
              value={id}
              setValue={setId}
            />
            <Input
              title="비밀번호"
              placeHolder="비밀번호를 입력해주세요."
              value={password}
              setValue={setPassword}
            />
          </FlexBox>

          {/* ========== Bottom ========== */}
          <L3 color={theme.color.brand[50]}>
            이메일로 받은 아이디와 비밀번호를 입력해주세요!
          </L3>
          <Button fullWidth type="dark" size="lg" onClick={submitLogin}>
            로그인
          </Button>
        </Form>
      </Container>
    </Background>
  );
};

export default LoginPage;

const Background = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: ${({ theme }) => theme.color.gray[10]};
`;

const Container = styled.section`
  max-width: 690px;
  width: 95%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 100px 0;
  gap: 50px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
`;

const Form = styled.form`
  max-width: 370px;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const TitleTxt = styled.p`
  font-size: 27px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%;
`;
