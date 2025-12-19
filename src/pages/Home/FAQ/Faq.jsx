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
];

const Faq = () => {
  return (
    <motion.section
      id="faq"
      className="py-10 px-5 bg-base-100 text-base-content"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-10 rounded-xl shadow-lg bg-base-200">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          FAQ
        </motion.h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Faq;
