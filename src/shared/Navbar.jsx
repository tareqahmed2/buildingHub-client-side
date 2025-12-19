import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import HamburgerMenu from "react-hamburger-menu";

const daisyThemes = [
  "light","dark","cupcake","bumblebee","emerald","corporate","synthwave",
  "retro","cyberpunk","valentine","halloween","garden","forest","aqua",
  "lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk",
  "autumn","business","acid","lemonade","night","coffee","winter","dim",
  "nord","sunset",
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "font-bold text-primary" : "hover:text-primary"
        }>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/apartment" className={({ isActive }) =>
          isActive ? "font-bold text-primary" : "hover:text-primary"
        }>
          Apartments
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) =>
          isActive ? "font-bold text-primary" : "hover:text-primary"
        }>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar max-w-screen-xl mx-auto">

        {/* Left */}
        <div className="navbar-start">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full cursor-pointer border hidden md:block"
            onClick={() => navigate("/")}
          />
          <span
            onClick={() => navigate("/")}
            className="ml-2 text-xl font-bold cursor-pointer"
          >
            BuildingHub
          </span>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Mobile */}
        <div className="navbar-end lg:hidden mr-3 relative">
          <HamburgerMenu
            isOpen={hamburgerOpen}
            menuClicked={() => setHamburgerOpen(!hamburgerOpen)}
            width={30}
            height={20}
            strokeWidth={2}
            color="currentColor"
            animationDuration={0.5}
          />
          {hamburgerOpen && (
            <div className="absolute top-16 right-0 bg-base-100 shadow-lg rounded-lg w-48 border">
              <ul className="menu p-4">{links}</ul>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">

          {/* Theme Selector */}
          <select
            value={theme}
            onChange={handleThemeChange}
            className="select select-bordered select-sm"
          >
            {daisyThemes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : user ? (
            <div className="relative">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border border-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border z-20">
                  <div className="p-4 border-b">
                    <p className="font-semibold">{user?.displayName}</p>
                  </div>
                  <ul className="menu">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><button onClick={signOutUser}>Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
