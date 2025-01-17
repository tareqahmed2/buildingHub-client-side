import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartment"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          Apartments
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow-lg mb-5 sticky top-0 z-50">
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <img
            src={logo}
            alt="Profile"
            className="h-12 w-12 rounded-full cursor-pointer border-2"
            onClick={() => navigate("/")}
          />
          <a href="/" className="ml-2 text-xl font-bold">
            BuildingHub
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {loading ? (
            <span className="loading-spinner">Loading...</span>
          ) : user ? (
            <div className="relative">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg z-20">
                  <div className="p-4 border-b">
                    <p className="font-semibold">{user?.displayName}</p>
                  </div>
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={signOutUser}
                        className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="btn btn-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
