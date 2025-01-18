import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import Announcements from "../pages/Dashboard/Announcement/Announcements";
import Profile from "../pages/Dashboard/profile/Profile";
import MakePayment from "../pages/Dashboard/Payment/MakePayment/MakePayment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import PaymentForm from "../pages/Dashboard/PaymentForm/PaymentForm";
import AdminProfile from "../pages/Dashboard/AdminRoute/AdminProfile/AdminProfile";
import ManageMembers from "../pages/Dashboard/AdminRoute/ManageMembers/ManageMembers";
import MakeAnnouncement from "../pages/Dashboard/AdminRoute/MakeAnnouncement/MakeAnnouncement";
import AgreementRequest from "../pages/Dashboard/AdminRoute/AgreementRequest/AgreementRequest";
import ManageCoupons from "../pages/Dashboard/AdminRoute/ManageCoupons/ManageCoupons";

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
        path: "make-payment/payment-form",
        element: <PaymentForm></PaymentForm>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      // admin route
      {
        path: "admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "manage-members",
        element: <ManageMembers />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement></MakeAnnouncement>,
      },
      {
        path: "agreement-requests",
        element: <AgreementRequest></AgreementRequest>,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupons />,
      },
    ],
  },
];
