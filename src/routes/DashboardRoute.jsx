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
import Payment from "../pages/Dashboard/Payment/Payment";
import PrivateAdminRoute from "./PrivateAdminRoute";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      // admin route
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <PrivateAdminRoute>
              <AdminProfile></AdminProfile>
            </PrivateAdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <PrivateRoute>
            <PrivateAdminRoute>
              <ManageMembers />
            </PrivateAdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <PrivateRoute>
            <PrivateAdminRoute>
              <MakeAnnouncement></MakeAnnouncement>
            </PrivateAdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <PrivateRoute>
            <PrivateAdminRoute>
              <AgreementRequest></AgreementRequest>
            </PrivateAdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivateRoute>
            <PrivateAdminRoute>
              <ManageCoupons />
            </PrivateAdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
];
