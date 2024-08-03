import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";
import {
  ChallengeDashboardPage,
  ChallengeInfoPage,
  ChallengeQuestionPage,
  CustomPage,
  LoginPage,
  OnBoardingPage,
  ParticipationInfoPage,
  ParticipationParticipatePage,
} from "./pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <></>,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: "/onBoarding",
        element: <OnBoardingPage />,
        errorElement: <div>Unknown Error</div>,
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
        element: <CustomPage />,
        errorElement: <div>Unknown Error</div>,
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
    ],
  },
]);
