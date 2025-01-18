import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import Announcements from "../pages/Dashboard/Announcement/Announcements";
import Profile from "../pages/Dashboard/profile/Profile";
import MakePayment from "../pages/Dashboard/Payment/MakePayment/MakePayment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

export const DashboardRoute = [
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "announcement",
        element: <Announcements />,
      },
      {
        path: "make-payment",
        element: <MakePayment></MakePayment>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
];
