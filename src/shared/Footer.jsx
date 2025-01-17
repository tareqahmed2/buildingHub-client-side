import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-screen-xl mx-auto text-center px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Building Management System</p>
            <p className="text-sm">
              Ensuring safe, convenient, and modern living spaces for everyone.
            </p>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <p className="text-lg font-medium mb-2">Follow Us</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            © 2025 Building Management System. All rights reserved.
          </p>
        </div>

        <div className="mt-2">
          <p className="text-sm">Developed by Tareq Ahmed</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
