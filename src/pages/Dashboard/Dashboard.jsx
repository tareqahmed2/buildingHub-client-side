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
} from "react-icons/fa"; // Importing React Icons
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userFromCollection, setUserFromCollection] = useState([]);
  useEffect(() => {
    axiosPublic.get(`/all-users/${user.email}`).then((res) => {
      setUserFromCollection(res.data);
    });
  }, []);
  console.log(userFromCollection);
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
  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg lg:h-100vh p-6">
        <div className="mb-8 text-center">
          {/* <h2 className="text-2xl font-bold">User Dashboard</h2> */}
        </div>
        <nav>
          <ul className="space-y-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                    : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                }
              >
                <FaHome /> Home
              </NavLink>
            </li>
            {/* user route */}
            {(userFromCollection?.Role === "member" ||
              userFromCollection?.Role === "User") && (
              <>
                <li>
                  <NavLink
                    to="profile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaUserAlt /> My Profile
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to="announcement"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                    : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                }
              >
                <FaBullhorn /> Announcements
              </NavLink>
            </li>

            {/* member route */}
            {userFromCollection?.Role === "member" && (
              <>
                <li>
                  <NavLink
                    to="make-payment"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaCreditCard /> Make Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="payment-history"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaHistory /> Payment History
                  </NavLink>
                </li>
              </>
            )}
            {/* admin route */}
            {userFromCollection?.Role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="admin-profile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaUserShield /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manage-members"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaUsersCog /> Manage Members
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="make-announcement"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaBullhorn /> Make Announcement
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="agreement-requests"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaRegHandshake /> Agreement Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manage-coupons"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow flex items-center gap-3 whitespace-nowrap"
                        : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block flex items-center gap-3 whitespace-nowrap"
                    }
                  >
                    <FaGift /> Manage Coupons
                  </NavLink>
                </li>
              </>
            )}

            {/* end of admin route */}
          </ul>
        </nav>
      </aside>

      <main className="flex-grow bg-white p-6 lg:p-10 rounded-tl-lg shadow-md">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
