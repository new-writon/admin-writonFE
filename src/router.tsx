import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/organisms";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <></>,
        errorElement: <div>Unknown Error</div>,
      },
    ],
  },
]);
