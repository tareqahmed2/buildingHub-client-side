// src/components/sections/TenantReviews.js
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const TenantReviews = () => {
  const { theme } = useTheme();
  // Dummy reviews; replace with dynamic data as needed
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "Great place to live with excellent management!",
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Responsive maintenance and friendly staff.",
    },
    {
      id: 3,
      name: "Samuel Lee",
      review: "I really enjoy the vibrant community and top-notch service.",
    },
    {
      id: 4,
      name: "Emily Clark",
      review: "The building's amenities are simply outstanding.",
    },
  ];

  // Variants for container and each review card for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const reviewVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="reviews" className="px-5">
      <div
        className={`max-w-screen-xl mx-auto px-4  rounded-lg py-10  ${
          theme === "light"
            ? " bg-gradient-to-r from-blue-100 to-blue-50 "
            : "bg-gray-800"
        }`}
      >
        <motion.h2
          className={`text-3xl font-bold text-center mb-10 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tenant Reviews
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/*  */}
          {reviews.map((item) => (
            <motion.div
              key={item.id}
              className={` p-6 border-t-2  border-b-2 border-gray-500 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-white"
              }`}
              variants={reviewVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-semibold text-xl">{item.name}</h3>
              </div>
              <p
                className={` ${
                  theme === "light" ? "text-gray-700" : "text-white"
                }`}
              >
                {item.review}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TenantReviews;
