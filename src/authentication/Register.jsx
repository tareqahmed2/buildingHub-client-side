import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";

import useAuth from "../hooks/useAuth";
import registerani from "../animation/register.json";

const Register = () => {
  const { name } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase)
      return "Password must have at least one uppercase letter.";
    if (!hasLowercase)
      return "Password must have at least one lowercase letter.";
    if (!hasMinLength) return "Password must be at least 6 characters long.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    setError("");

    try {
      const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;
      const formDataImg = new FormData();
      formDataImg.append("image", formData.photoURL);

      const imgResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const imgData = await imgResponse.json();
      if (imgData.success) {
        console.log("Image URL:", imgData.data.url);
        Swal.fire(
          "Registration Successful",
          "You have been registered!",
          "success"
        );
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <Player
          autoplay
          loop
          src={registerani}
          className="w-3/4 sm:w-1/2 md:w-2/5 lg:w-3/4 max-w-sm"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Create an Account
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-600"
            >
              Photo URL or Upload
            </label>
            <input
              type="file"
              id="photoURL"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.files[0] })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
