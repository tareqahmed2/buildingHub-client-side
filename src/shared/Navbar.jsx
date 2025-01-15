import React, { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = {
    name: "Jane Doe",
    profilePic: "https://via.placeholder.com/40",
  };

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
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl font-bold">
            BuildingHub
          </a>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="relative">
              <img
                src={user.profilePic}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg z-20">
                  <div className="p-4 border-b">
                    <p className="font-semibold">{user.name}</p>
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
                        onClick={() => setIsLoggedIn(false)}
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
