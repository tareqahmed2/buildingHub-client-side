// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-10 py-16 px-6 rounded-xl bg-base-200">
      <Helmet>
        <title>Buildinghub | About Us</title>
      </Helmet>

      <motion.h1
        className="text-5xl font-extrabold text-center mb-8 text-base-content"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="text-xl text-center mb-12 leading-relaxed text-base-content/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Welcome to{" "}
        <span className="text-primary font-semibold">
          Urban Space Management
        </span>
        , your trusted partner in building and community management. Our mission
        is to simplify property management for both residents and building owners
        by offering innovative solutions and exceptional service.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary transition-all"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="card-body">
            <h2 className="card-title text-3xl">Our Vision</h2>
            <p className="text-lg text-base-content/70 leading-relaxed">
              We aim to create efficient, sustainable, and harmonious
              communities through innovative building management solutions. Our
              vision is to provide unmatched convenience, security, and comfort
              for every resident, while ensuring seamless communication and
              swift issue resolution.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary transition-all"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="card-body">
            <h2 className="card-title text-3xl">Our Team</h2>
            <p className="text-lg text-base-content/70 leading-relaxed">
              Our team is made up of experienced professionals passionate about
              improving the living and working environments for tenants and
              property owners alike. From maintenance staff to customer support,
              each team member is dedicated to ensuring your experience with us
              is exceptional.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-lg leading-relaxed text-base-content/70">
          At{" "}
          <span className="text-primary font-semibold">
            Urban Space Management
          </span>
          , we believe in creating a strong sense of community, prioritizing your
          needs, and ensuring that all building operations run smoothly and
          efficiently.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
