import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "daisyui/dist/full.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    } else {
      setLoading(false);
    }
  }, [user, navigate, location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-8 border-solid border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
