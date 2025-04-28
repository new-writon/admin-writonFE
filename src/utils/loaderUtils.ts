import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { getAuthCheckAPI } from "../apis/authAPI";
import useOrganizationStore from "../states/OrganizationStore";
import useChallengeStore from "../states/ChallengeStore";

// Token 유효성 검사 Loader
// (페이지 진입시 Get API 진행하지 않는 페이지만 적용)
const checkTokenLoader = async () => {
  const isValid = Cookies.get("access_token_expire");
  if (!isValid) {
    try {
      await getAuthCheckAPI(); // redirect작업은 interceptors에서 일괄 처리
    } catch {}
  }

  return null;
};

// 조직 생성 여부 검사 Loader
const checkOrganiztionLoader = () => {
  const { organizationId } = useOrganizationStore.getState();

  if (!organizationId) {
    alert("조직을 먼저 생성해주세요");
    return redirect("/onBoarding");
  }

  return null;
};

// 챌린지 생성 여부 검사 Loader
const checkChallengeLoader = () => {
  const { challengeId } = useChallengeStore.getState();

  if (!challengeId) {
    alert("챌린지를 먼저 생성해주세요");
    return redirect("/challenge/create");
  }

  return null;
};

// 초기에 홈페이지 진입시 토큰 존재 여부에 따라 리다이렉트 진행
const initialAuthLoader = async () => {
  try {
    await getAuthCheckAPI(); // 실패시 login 페이지로 이동
    return redirect("/challenge/dashboard"); // 성공시 dashboard 페이지로 이동
  } catch {
    return null;
  }
};

// 유효한 토큰을 가지고 로그인 페이지에 접근하는 것을 방지
const loginAuthLoader = () => {
  const isValid = Cookies.get("access_token_expire");

  // 1. token 유효성 검사
  if (isValid) {
    // 2. token 유효할 경우 조직 생성 여부 검사
    const onBoardingRedirection = checkOrganiztionLoader();
    if (onBoardingRedirection) return onBoardingRedirection;

    // 3. token이 유효하고 조직도 생성되어있는 경우 403 error 던짐
    alert("잘못된 접근입니다.");
    throw new Response("잘못된 접근입니다.", {
      status: 401,
      statusText: "Unathorized",
    });
  }

  return null;
};

// 조직이 존재하면서 onBoarding 페이지에 접근하는 것을 방지
const onBoardingAuthLoader = () => {
  checkTokenLoader();

  const { organizationId } = useOrganizationStore.getState();

  if (organizationId) {
    alert("잘못된 접근입니다.");
    throw new Response("잘못된 접근입니다.", {
      status: 401,
      statusText: "Unathorized",
    });
  }

  return null;
};

// Get API가 존재하는 페이지에 대한 검증 로직
const APIPageAuthLoader = () => {
  // 1. 조직 존재 여부 검사
  const onBoardingRedirection = checkOrganiztionLoader();
  if (onBoardingRedirection) return onBoardingRedirection;

  // 2. 챌린지 존재 여부 검사
  return checkChallengeLoader();
};

// Get API가 존재하지 않는 페이지에 대한 검증 로직
const nonAPIPageAuthLoader = () => {
  // 1. 토큰 존재 여부 검사
  checkTokenLoader();

  // 2. 조직 존재 여부 검사
  return checkOrganiztionLoader();
};

export {
  initialAuthLoader,
  loginAuthLoader,
  onBoardingAuthLoader,
  APIPageAuthLoader,
  nonAPIPageAuthLoader,
};
