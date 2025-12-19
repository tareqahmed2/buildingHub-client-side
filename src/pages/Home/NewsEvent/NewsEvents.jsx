import React from "react";
import { motion } from "framer-motion";

const NewsEvents = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 },
    },
  };

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
    <section id="news-events" className="mt-10 px-5 bg-base-100 text-base-content">
      <div className="max-w-screen-xl mx-auto px-4 py-20 rounded-xl bg-base-200">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-primary"
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
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-body">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {event.title}
                </h3>
                <p className="text-lg">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsEvents;
