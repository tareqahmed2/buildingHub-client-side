import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../hooks/useAuth";
import loginani from "../animation/login.json";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
const Login = () => {
  const { signInWithGoogle, signInWithEmailPassword } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password toggling
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing error
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }
    try {
      const userCredential = await signInWithEmailPassword(
        formData.email,
        formData.password
      );
      console.log("User logged in:", userCredential.user);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
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
      navigate(from, { replace: true } || "/");
    } catch (error) {
      Swal.fire(
        "Login Failed",
        "There was an issue logging in with Google. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="flex max-w-screen-xl mx-auto flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-4">
      <Helmet>
        <title>Buildinghub | Login</title>
      </Helmet>
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <Player
          autoplay
          loop
          src={loginani}
          className="w-3/4 sm:w-1/2 md:w-2/5 lg:w-3/4 max-w-sm"
        />
      </div>

      <div className="w-full lg:w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Login to your account
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
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

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[45px] transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
