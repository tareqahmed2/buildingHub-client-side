import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaCreditCard,
  FaHistory,
  FaUserShield,
  FaUsersCog,
  FaBullhorn,
  FaRegHandshake,
  FaGift,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userFromCollection, setUserFromCollection] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/all-users/${user.email}`).then((res) => {
        setUserFromCollection(res.data);
        setLoading(false);
      });
    }
  }, [axiosPublic, user]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (
        userFromCollection?.Role === "member" ||
        userFromCollection?.Role === "User"
      ) {
        navigate("/dashboard/profile");
      } else if (userFromCollection?.Role === "admin") {
        navigate("/dashboard/admin-profile");
      }
    }
  }, [userFromCollection, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const navClass = ({ isActive }) =>
    isActive
      ? "bg-primary text-primary-content font-semibold rounded-lg px-4 py-2 flex items-center gap-3"
      : "hover:bg-primary/20 rounded-lg px-4 py-2 flex items-center gap-3";

  return (
    <div className="min-h-screen bg-base-200">
      <Helmet>
        <title>Buildinghub | Dashboard</title>
      </Helmet>

      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row">

        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-base-100 shadow-lg p-6">
          <nav>
            <ul className="menu space-y-2">

              <li>
                <NavLink to="/" className={navClass}>
                  <FaHome /> Home
                </NavLink>
              </li>

              {(userFromCollection?.Role === "member" ||
                userFromCollection?.Role === "User") && (
                <li>
                  <NavLink to="profile" className={navClass}>
                    <FaUserAlt /> My Profile
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink to="announcement" className={navClass}>
                  <FaBullhorn /> Announcements
                </NavLink>
              </li>

              {userFromCollection?.Role === "member" && (
                <>
                  <li>
                    <NavLink to="make-payment" className={navClass}>
                      <FaCreditCard /> Make Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="payment-history" className={navClass}>
                      <FaHistory /> Payment History
                    </NavLink>
                  </li>
                </>
              )}

              {userFromCollection?.Role === "admin" && (
                <>
                  <li>
                    <NavLink to="admin-profile" className={navClass}>
                      <FaUserShield /> Admin Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="manage-members" className={navClass}>
                      <FaUsersCog /> Manage Members
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="make-announcement" className={navClass}>
                      <FaBullhorn /> Make Announcement
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="agreement-requests" className={navClass}>
                      <FaRegHandshake /> Agreement Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="manage-coupons" className={navClass}>
                      <FaGift /> Manage Coupons
                    </NavLink>
                  </li>
                </>
              )}

            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 bg-base-100 shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
