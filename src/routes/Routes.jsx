import { createBrowserRouter } from "react-router-dom";
import Register from "../authentication/Register";
import Main from "../layout/Main";
import Login from "../authentication/Login";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);
