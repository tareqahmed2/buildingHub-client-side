// src/components/sections/FAQ.js
import React from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "Q1: How do I apply for an apartment?",
    answer:
      'A1: Click the "Apply Now" button on the desired apartment and follow the prompts.',
  },
  {
    question: "Q2: How can I pay my rent?",
    answer:
      "A2: Log in and navigate to the Payment Due section in your dashboard.",
  },
  // Add more FAQs as needed
];

const Faq = () => {
  return (
    <motion.section
      id="faq"
      className="py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-10 bg-gray-100 rounded-lg shadow-lg">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          FAQ
        </motion.h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Faq;
