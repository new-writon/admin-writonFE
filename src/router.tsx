import { createBrowserRouter, redirect } from "react-router-dom";
import { Layout } from "./components/organisms";
import {
  ChallengeCreatePage,
  ChallengeDashboardPage,
  ChallengeInfoPage,
  ChallengeQuestionPage,
  ChallengeCustomPage,
  LoginPage,
  OnBoardingPage,
  ParticipationInfoPage,
  ParticipationParticipatePage,
  OrganizationEditPage,
  EmptyChallengePage,
  HomePage,
  ErrorPage,
} from "./pages";
import Cookies from "js-cookie";
import { getAuthCheckAPI } from "./apis/authAPI";
import useOrganizationStore from "./states/OrganizationStore";

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

// 초기에 홈페이지 진입시 토큰 존재 여부에 따라 리다이렉트 진행
const initialAuthLoader = async () => {
  try {
    await getAuthCheckAPI();
    return redirect("/challenge/dashboard");
  } catch {
    return null;
  }
};

// 유효한 토큰을 가지고 로그인 페이지에 접근하는 것을 방지
const loginAuthLoader = () => {
  const isValid = Cookies.get("access_token_expire");

  if (isValid) {
    alert("잘못된 접근입니다.");
    throw new Response("잘못된 접근입니다.", {
      status: 403,
      statusText: "Forbidden",
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
      status: 403,
      statusText: "Forbidden",
    });
  }

  return null;
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <div>Unknown Error</div>,
        loader: initialAuthLoader,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
        loader: loginAuthLoader,
      },
      {
        path: "/onBoarding",
        element: <OnBoardingPage />,
        errorElement: <ErrorPage />,
        loader: onBoardingAuthLoader,
      },
      {
        path: "/challenge/create",
        element: <ChallengeCreatePage />,
        errorElement: <div>Unknown Error</div>,
        loader: checkTokenLoader,
      },
      {
        path: "/challenge/dashboard",
        element: <ChallengeDashboardPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/challenge/info",
        element: <ChallengeInfoPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/challenge/question",
        element: <ChallengeQuestionPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/challenge/custom",
        element: <ChallengeCustomPage />,
        errorElement: <div>Unknown Error</div>,
        loader: checkTokenLoader,
      },
      {
        path: "/participation/info",
        element: <ParticipationInfoPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/participation/participate",
        element: <ParticipationParticipatePage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/organization/edit",
        element: <OrganizationEditPage />,
        errorElement: <div>Unknown Error</div>,
        loader: checkTokenLoader,
      },
      {
        path: "/empty",
        element: <EmptyChallengePage />,
        errorElement: <div>Unknown Error</div>,
        loader: checkTokenLoader,
      },
    ],
  },
]);
