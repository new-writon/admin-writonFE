import { createBrowserRouter } from "react-router-dom";
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
import {
  initialAuthLoader,
  loginAuthLoader,
  onBoardingAuthLoader,
  APIPageAuthLoader,
  nonAPIPageAuthLoader,
} from "./utils/loaderUtils";

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
        errorElement: <ErrorPage />,
        loader: nonAPIPageAuthLoader,
      },
      {
        path: "/challenge/dashboard",
        element: <ChallengeDashboardPage />,
        errorElement: <ErrorPage />,
        loader: APIPageAuthLoader,
      },
      {
        path: "/challenge/info",
        element: <ChallengeInfoPage />,
        errorElement: <ErrorPage />,
        loader: APIPageAuthLoader,
      },
      {
        path: "/challenge/question",
        element: <ChallengeQuestionPage />,
        errorElement: <ErrorPage />,
        loader: APIPageAuthLoader,
      },
      {
        path: "/challenge/custom",
        element: <ChallengeCustomPage />,
        errorElement: <ErrorPage />,
        loader: nonAPIPageAuthLoader,
      },
      {
        path: "/participation/info",
        element: <ParticipationInfoPage />,
        errorElement: <ErrorPage />,
        loader: APIPageAuthLoader,
      },
      {
        path: "/participation/participate",
        element: <ParticipationParticipatePage />,
        errorElement: <ErrorPage />,
        loader: APIPageAuthLoader,
      },
      {
        path: "/organization/edit",
        element: <OrganizationEditPage />,
        errorElement: <ErrorPage />,
        loader: nonAPIPageAuthLoader,
      },
      {
        path: "/empty",
        element: <EmptyChallengePage />,
        errorElement: <ErrorPage />,
        loader: nonAPIPageAuthLoader,
      },
    ],
  },
]);
