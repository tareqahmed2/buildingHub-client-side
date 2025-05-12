// src/pages/AboutUs.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTheme } from "next-themes";

const AboutUs = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`max-w-screen-xl  ${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      } rounded-lg my-10 mx-auto py-16 px-6`}
    >
      <Helmet>
        <title>Buildinghub | AboutUs</title>
      </Helmet>
      <motion.h1
        className={`text-5xl font-extrabold text-center mb-8  ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className={`text-xl  text-center mb-12 leading-relaxed ${
          theme === "light" ? "text-gray-600" : "text-white"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Welcome to{" "}
        <span className="text-indigo-600">Urban Space Management</span>, your
        trusted partner in building and community management. Our mission is to
        simplify property management for both residents and building owners by
        offering innovative solutions and exceptional service.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className={` p-8 border-gray-700 rounded-xl shadow-xl border-2  hover:border-indigo-500 transition-all ease-in-out duration-500
            ${
              theme === "light"
                ? "bg-white text-gray-800"
                : "text-white bg-gray-800"
            }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className={`text-3xl font-semibold  mb-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Our Vision
          </h2>
          <p
            className={` text-lg leading-relaxed ${
              theme === "light" ? "text-gray-600" : "text-white"
            }`}
          >
            We aim to create efficient, sustainable, and harmonious communities
            through innovative building management solutions. Our vision is to
            provide unmatched convenience, security, and comfort for every
            resident, while ensuring seamless communication and swift issue
            resolution.
          </p>
        </motion.div>

        <motion.div
          className={` p-8 rounded-xl shadow-xl border-2 border-gray-700 hover:border-indigo-500 transition-all ease-in-out duration-500
              ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "text-white bg-gray-800"
              }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className={`text-3xl font-semibold  mb-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Our Team
          </h2>
          <p
            className={` text-lg leading-relaxed ${
              theme === "light" ? "text-gray-600" : "text-white"
            }`}
          >
            Our team is made up of experienced professionals passionate about
            improving the living and working environments for tenants and
            property owners alike. From maintenance staff to customer support,
            each team member is dedicated to ensuring your experience with us is
            exceptional.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p
          className={` text-lg leading-relaxed ${
            theme === "light" ? "text-gray-600" : "text-white"
          }`}
        >
          At <span className="text-indigo-600">Urban Space Management</span>, we
          believe in creating a strong sense of community, prioritizing your
          needs, and ensuring that all building operations run smoothly and
          efficiently.
        </p>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      ></motion.div>
    </div>
  );
};

export default AboutUs;
