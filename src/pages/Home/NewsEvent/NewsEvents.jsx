// src/components/sections/NewsEvents.js
import React from "react";
import { motion } from "framer-motion";

const NewsEvents = () => {
  // Dummy news/events; replace with dynamic data as needed
  const events = [
    {
      id: 1,
      title: "Community Gathering",
      description: "Join us for a community gathering on Saturday!",
    },
    {
      id: 2,
      title: "Maintenance Notice",
      description: "Scheduled maintenance on all elevators next week.",
    },
    {
      id: 3,
      title: "Holiday Announcement",
      description:
        "Our office will be closed for the national holiday on Friday, 25th February.",
    },
  ];

  // Variants for the container to stagger children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 },
    },
  };

  // Variants for each event card with a flip effect and shadow animation
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="news-events" className="mt-10">
      <div className="max-w-screen-xl mx-auto px-4  bg-gradient-to-r from-green-200 via-blue-300 to-purple-400 py-20 rounded-lg">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          News & Events
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-indigo-500 transition-all ease-in-out duration-500 transform"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-indigo-600">
                {event.title}
              </h3>
              <p className="text-gray-700 text-lg">{event.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsEvents;
