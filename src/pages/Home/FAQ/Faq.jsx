// src/components/sections/FAQ.js
import React from "react";

const Faq = () => {
  return (
    <section id="faq" className="">
      <div className="max-w-screen-xl mx-auto px-4 py-10 bg-gray-100 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">
              Q1: How do I apply for an apartment?
            </h3>
            <p>
              A1: Click the "Apply Now" button on the desired apartment and
              follow the prompts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Q2: How can I pay my rent?</h3>
            <p>
              A2: Log in and navigate to the Payment Due section in your
              dashboard.
            </p>
          </div>
          {/* Add more FAQs as needed */}
        </div>
      </div>
    </section>
  );
};

export default Faq;
