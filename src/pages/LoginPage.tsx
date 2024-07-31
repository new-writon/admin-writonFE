import styled from "styled-components";
import { Button, FlexBox } from "../components/atoms";
import { Input, Title } from "../components/molecules";
import { H2, L3 } from "../components/atoms/Text";
import { useState } from "react";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/organisms";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    console.log(id, password);
    navigate("/onBoarding");
  };

  return (
    <Form contentsWidth={370}>
      {/* ========== Title ========== */}
      <FlexBox align="center" gap={10}>
        <TitleTxt>Admin</TitleTxt>
        <H2>로그인</H2>
      </FlexBox>

      {/* ========== Inputs ========== */}
      <FlexBox fullWidth col gap={20}>
        <FlexBox col fullWidth gap={6}>
          <Title title="아이디" />
          <Input
            placeHolder="이메일 형식의 아이디를 입력해주세요."
            value={id}
            setValue={setId}
          />
        </FlexBox>

        <FlexBox col fullWidth gap={6}>
          <Title title="비밀번호" />
          <Input
            placeHolder="비밀번호를 입력해주세요."
            value={password}
            setValue={setPassword}
          />
        </FlexBox>
      </FlexBox>

      {/* ========== Bottom ========== */}
      <L3 color={theme.color.brand[50]}>
        이메일로 받은 아이디와 비밀번호를 입력해주세요!
      </L3>
      <Button fullWidth type="dark" size="lg" onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginPage;

const TitleTxt = styled.p`
  font-size: 27px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%;
`;
