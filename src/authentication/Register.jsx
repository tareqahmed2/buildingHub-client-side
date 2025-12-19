import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../hooks/useAuth";
import registerani from "../animation/register.json";
import { useNavigate, Link } from "react-router-dom";
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
    if (!/[A-Z]/.test(password)) return "At least one uppercase letter required";
    if (!/[a-z]/.test(password)) return "At least one lowercase letter required";
    if (password.length < 6) return "Minimum 6 characters required";
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;
      const formDataImg = new FormData();
      formDataImg.append("image", data.photoURL[0]);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        { method: "POST", body: formDataImg }
      );

      const imgData = await response.json();

      if (!imgData.success) throw new Error("Image upload failed");

      await signUpWithEmailPassword(
        data.name,
        data.email,
        data.password,
        imgData.data.url
      );

      Swal.fire("Success", "Account created successfully", "success");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire("Success", "Logged in with Google", "success");
      navigate("/", { replace: true });
    } catch {
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <Helmet>
        <title>Buildinghub | Register</title>
      </Helmet>

      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row items-center gap-10">

        {/* Animation */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Player autoplay loop src={registerani} className="w-72 md:w-96" />
        </div>

        {/* Register Card */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center">
                Create an Account
              </h2>

              <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    className="input input-bordered"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-error text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    className="input input-bordered"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-error text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Photo */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Profile Photo</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered"
                    {...register("photoURL", { required: "Photo is required" })}
                  />
                  {errors.photoURL && (
                    <p className="text-error text-sm">
                      {errors.photoURL.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="form-control mb-4 relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered pr-10"
                    {...register("password", {
                      required: "Password is required",
                      validate: validatePassword,
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[52px] text-base-content/60"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  {errors.password && (
                    <p className="text-error text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {error && <p className="text-error text-sm">{error}</p>}

                <button type="submit" className="btn btn-primary w-full mt-2">
                  Register
                </button>
              </form>

              <div className="divider">OR</div>

              <button
                onClick={handleGoogleLogin}
                className="btn btn-error btn-outline w-full"
              >
                Login with Google
              </button>

              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
