import { createBrowserRouter } from "react-router-dom";
import Register from "../authentication/Register";
import Main from "../layout/Main";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
