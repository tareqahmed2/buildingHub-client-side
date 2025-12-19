import React from "react";
import { motion } from "framer-motion";

const TenantReviews = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
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
    <section id="reviews" className="px-5 bg-base-100 text-base-content">
      <div className="max-w-screen-xl mx-auto px-4 rounded-xl py-10 bg-base-200">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 text-primary"
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
          {reviews.map((item) => (
            <motion.div
              key={item.id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
              variants={reviewVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar placeholder mr-4">
                    <div className="bg-primary text-primary-content rounded-full w-12">
                      <span className="font-bold">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                </div>

                <p>{item.review}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TenantReviews;
