import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg lg:h-100vh p-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">User Dashboard</h2>
        </div>
        <nav>
          <ul className="space-y-6">
            <li>
              <NavLink
                to="dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow"
                    : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block"
                }
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="announcements"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 py-2 px-4 rounded-lg block font-semibold shadow"
                    : "text-blue-200 hover:text-white hover:bg-blue-700 py-2 px-4 rounded-lg block"
                }
              >
                Announcements
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-white p-6 lg:p-10 rounded-tl-lg shadow-md">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
