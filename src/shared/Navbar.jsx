import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <a href="/" className="hover:text-blue-600">
          Home
        </a>
      </li>
      <li>
        <a href="/apartments" className="hover:text-blue-600">
          Apartments
        </a>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow-lg mb-5">
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
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
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
