import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../hooks/useAuth";
import loginani from "../animation/login.json";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInWithGoogle, signInWithEmailPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const demoAdminLogin = async () => {
    try {
      await signInWithEmailPassword("turjo@admin.com", "Turjo123");
      navigate("/", { replace: true });
    } catch {
      setError("Failed to log in as admin.");
    }
  };

  const demoMemberLogin = async () => {
    try {
      await signInWithEmailPassword("elonMask@gmail.com", "MaskVai");
      navigate("/", { replace: true });
    } catch {
      setError("Failed to log in as member.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await signInWithEmailPassword(formData.email, formData.password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire("Success", "Logged in with Google!", "success");
      navigate(from, { replace: true });
    } catch {
      Swal.fire("Error", "Google login failed.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <Helmet>
        <title>Buildinghub | Login</title>
      </Helmet>

      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row items-center gap-10">

        {/* Animation */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Player
            autoplay
            loop
            src={loginani}
            className="w-72 md:w-96"
          />
        </div>

        {/* Login Card */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center">
                Welcome Back
              </h2>
              <p className="text-center text-base-content/60">
                Login to your account
              </p>

              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control mb-4 relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered pr-10"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[52px] text-base-content/60"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {error && (
                  <p className="text-error text-sm mb-2">{error}</p>
                )}

                <button type="submit" className="btn btn-primary w-full mt-2">
                  Login
                </button>
              </form>

              <div className="divider">OR</div>

              <button
                onClick={handleGoogleLogin}
                className="btn btn-error btn-outline w-full"
              >
                Login with Google
              </button>

              <button
                onClick={demoAdminLogin}
                className="btn btn-secondary btn-outline w-full mt-3"
              >
                Demo Admin
              </button>

              <button
                onClick={demoMemberLogin}
                className="btn btn-accent btn-outline w-full mt-2"
              >
                Demo Member
              </button>

              <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="link link-primary">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
