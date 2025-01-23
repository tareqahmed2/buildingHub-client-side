import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../hooks/useAuth";
import registerani from "../animation/register.json";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, signUpWithEmailPassword } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase)
      return "Password must have at least one uppercase letter.";
    if (!hasLowercase)
      return "Password must have at least one lowercase letter.";
    if (!hasMinLength) return "Password must be at least 6 characters long.";
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;
      const formDataImg = new FormData();

      // Check if a file is selected and append it to the form data
      if (data.photoURL && data.photoURL[0]) {
        formDataImg.append("image", data.photoURL[0]);
      } else {
        throw new Error("No image selected.");
      }

      // Upload the image to imgbb using fetch
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed. Status: " + response.status);
      }

      const imgResponse = await response.json(); // Parse the JSON response

      if (imgResponse.success) {
        const imageUrl = imgResponse.data.url;
        console.log("Image URL:", imageUrl);

        const userData = {
          name: data.name,
          email: data.email,
          password: data.password,
          photoURL: imageUrl,
        };

        // Proceed with the user registration logic
        try {
          await signUpWithEmailPassword(
            userData.name,
            userData.email,
            userData.password,
            userData.photoURL
          );

          // Show success alert
          Swal.fire({
            title: "Success!",
            text: "Your account has been created successfully.",
            icon: "success",
            confirmButtonText: "Ok",
          });

          navigate("/", { replace: true });
        } catch (error) {
          console.error("Signup failed:", error);
          toast.error("Failed to create an account. Please try again.");
        }
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
      console.error("Image Upload Error:", error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire(
        "Google Login",
        "You have successfully logged in with Google!",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Login Failed",
        "There was an issue logging in with Google. Please try again.",
        "error"
      );
    }
  };
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <Helmet>
        <title>Buildinghub | Register</title>
      </Helmet>
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
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
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
              id="name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
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
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
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
              {...register("photoURL", { required: "Photo is required" })}
            />
            {errors.photoURL && (
              <p className="text-sm text-red-500">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                validate: validatePassword,
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[45px] transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 mb-2"
          >
            Login with Google
          </button>
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
