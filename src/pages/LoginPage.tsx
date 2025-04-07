import styled from "styled-components";
import { Button, FlexBox } from "../components/atoms";
import { Input, Title } from "../components/molecules";
import { H2, L3 } from "../components/atoms/Text";
import { FormEvent, useState } from "react";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/organisms";
import { useMutation } from "@tanstack/react-query";
import { postAuthLoginAPI } from "../apis";
import useOrganizationStore from "../states/OrganizationStore";
import useChallengeStore from "../states/ChallengeStore";
import { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/error";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    setOrganizationId,
    setOrganizationName,
    setOrganizationLogo,
    setThemeColor,
  } = useOrganizationStore();
  const { setChallengeId, setChallengeList } = useChallengeStore();

  const { mutate: handleLogin } = useMutation({
    mutationFn: () => postAuthLoginAPI(id, password),
    onSuccess: ({
      accessToken,
      refreshToken,
      hasOrganization,
      organizationId,
      organizationName,
      organizationLogo,
      themeColor,
      challengeList,
    }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setOrganizationId(organizationId);
      setOrganizationName(organizationName);
      setOrganizationLogo(organizationLogo);
      setThemeColor(themeColor);

      setChallengeList(challengeList);
      setChallengeId(challengeList.length === 0 ? 0 : challengeList[0].id);

      navigate(
        !hasOrganization
          ? "/onBoarding"
          : challengeList.length === 0
          ? "/empty"
          : "/challenge/dashboard"
      );
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const data = err.response?.data;

      if (data?.code === "A01" || data?.code === "A02") {
        setError("아이디와 비밀번호를 확인해주세요.");
      }
    },
  });

  const submitLogin = (e: FormEvent) => {
    e.preventDefault();

    if (id !== "" && password !== "") {
      handleLogin();
    } else {
      setError("아이디와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <Form contentsWidth={370} isLoginForm onSubmit={submitLogin}>
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
            error={error}
          />
        </FlexBox>

        <FlexBox col fullWidth gap={6}>
          <Title title="비밀번호" />
          <Input
            placeHolder="비밀번호를 입력해주세요."
            value={password}
            setValue={setPassword}
            type="password"
            error={error}
          />
        </FlexBox>
      </FlexBox>

      {/* ========== Bottom ========== */}
      <L3 color={theme.color.brand[50]}>
        이메일로 받은 아이디와 비밀번호를 입력해주세요!
      </L3>
      <Button fullWidth type="dark" size="lg">
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
