import { createBrowserRouter } from "react-router-dom";
import Register from "../authentication/Register";
import Main from "../layout/Main";
import Login from "../authentication/Login";
import Home from "../pages/Home/Home";
import Apartment from "../pages/Apartment/Apartment";
import { DashboardRoute } from "./DashboardRoute";
import ErrorPage from "../components/ErrorPage";
import AboutUs from "../pages/About/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "apartment",
        element: <Apartment></Apartment>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
    ],
  },

  ...DashboardRoute,
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
