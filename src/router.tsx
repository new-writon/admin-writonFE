import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";
import { LoginPage } from "./pages";

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
    ],
  },
]);
