import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userFromCollection, setUserFromCollection] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get(`/all-users/${user.email}`).then((res) => {
      setUserFromCollection(res.data);
    });
  }, []);
  useEffect(() => {
    if (!user || !userFromCollection.Role === "admin") {
      {
        navigate("/login");
      }
    }
  }, [user, userFromCollection, location]);

  return children;
};

export default PrivateAdminRoute;
