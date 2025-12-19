import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="footer max-w-screen-xl mx-auto p-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-xl font-bold">
            Building Management System
          </h2>
          <p className="text-sm opacity-80 mt-2">
            Ensuring safe, convenient, and modern living spaces for everyone.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center gap-5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline hover:scale-110 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline hover:scale-110 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline hover:scale-110 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline hover:scale-110 transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-base-300">
        <div className="max-w-screen-xl mx-auto py-4 text-center text-sm opacity-70">
          <p>© 2025 Building Management System. All rights reserved.</p>
          <p className="mt-1">Developed by Tareq Ahmed</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
