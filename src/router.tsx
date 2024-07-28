import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/molecules";

export const router = createBrowserRouter([
  {
    // layout
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
