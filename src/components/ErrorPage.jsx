import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="text-center max-w-lg bg-white shadow-xl rounded-lg p-8">
        <div className="mb-4">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Error Illustration"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
