import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu"; // Import the React Hamburger Menu
import Theme from "../global/Theme";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false); // State for hamburger menu
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartment"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
          }
        >
          Apartments
        </NavLink>
      </li>{" "}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={` shadow-lg sticky top-0 z-50 ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <img
            src={logo}
            alt="Profile"
            className="h-12 w-12 rounded-full cursor-pointer border-2 hidden md:block"
            onClick={() => navigate("/")}
          />
          <a
            href="/"
            className={`ml-2  text-xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            BuildingHub
          </a>
        </div>

        {/* Links on larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Hamburger menu for mobile */}
        <div
          className={`navbar-end lg:hidden mr-3 ${
            theme === "light" ? "bg-white" : "bg-gray-600"
          }`}
        >
          <HamburgerMenu
            isOpen={hamburgerOpen}
            menuClicked={() => setHamburgerOpen(!hamburgerOpen)}
            width={30}
            height={20}
            strokeWidth={2}
            color="black"
            animationDuration={0.5}
          />

          {/* Hamburger menu items */}
          {hamburgerOpen && (
            <div className="absolute top-16 right-0 bg-blue-500 text-white shadow-lg rounded-lg w-48">
              <ul className="flex flex-col p-4">{links}</ul>
            </div>
          )}
        </div>

        {/* User login/logout & dropdown */}
        <div className="navbar-end">
          {loading ? (
            <span className="loading-spinner">Loading...</span>
          ) : user ? (
            <div className="relative ">
              <div className="flex items-center">
                <div className="mr-3">
                  <Theme></Theme>
                </div>
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-500"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
              </div>

              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48  ${
                    theme === "light"
                      ? "bg-white text-gray-700 "
                      : "text-white bg-[#374151]"
                  } rounded-lg shadow-lg z-20`}
                >
                  <div className="p-4 border-b">
                    <p className="font-semibold">{user?.displayName}</p>
                  </div>
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:underline"
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={signOutUser}
                        className="block px-4 py-2 text-left w-full hover:underline"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <div className="mr-3">
                <Theme></Theme>
              </div>
              <a
                href="/login"
                className="btn btn-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
