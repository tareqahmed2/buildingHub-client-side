// src/pages/AboutUs.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl bg-gray-100 rounded-lg my-10 mx-auto py-16 px-6">
      <Helmet>
        <title>Buildinghub | AboutUs</title>
      </Helmet>
      <motion.h1
        className="text-5xl font-extrabold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 text-center mb-12 leading-relaxed"
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
          className="bg-white p-8 rounded-xl shadow-xl border-2 border-transparent hover:border-indigo-500 transition-all ease-in-out duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We aim to create efficient, sustainable, and harmonious communities
            through innovative building management solutions. Our vision is to
            provide unmatched convenience, security, and comfort for every
            resident, while ensuring seamless communication and swift issue
            resolution.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-xl shadow-xl border-2 border-transparent hover:border-indigo-500 transition-all ease-in-out duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Team
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
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
        <p className="text-xl text-gray-600 leading-relaxed">
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
