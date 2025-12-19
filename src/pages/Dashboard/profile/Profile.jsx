import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();
  const [agreements, setAgreements] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      axiosSecure
        .get(`/agreements/${user.email}`)
        .then((res) => {
          setAgreements(res.data || {});
        })
        .finally(() => setIsLoading(false));
    }
  }, [axiosSecure, user]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Helmet>
        <title>Buildinghub | Profile</title>
      </Helmet>

      <h1 className="text-4xl font-extrabold text-center mb-8">
        My Profile
      </h1>

      <div className="card bg-base-100 shadow-xl max-w-lg mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="card-body">

            {/* User Info */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-primary"
                />
                <span className="absolute bottom-2 right-2 badge badge-success">
                  Active
                </span>
              </div>

              <h2 className="text-2xl font-semibold mt-4">
                {user?.displayName || "Unknown User"}
              </h2>
              <p className="text-base-content/60">
                {user?.email || "No Email"}
              </p>
            </div>

            {/* Agreement Info */}
            <div className="space-y-4">

              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Agreement Date
                </h3>
                <p className="p-3 rounded-lg bg-base-200">
                  {agreements.dateApplied || "None"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Rented Apartment Info
                </h3>
                <div className="p-4 rounded-lg bg-base-200 space-y-1">
                  <p>Floor: {agreements.floor || "None"}</p>
                  <p>Block: {agreements.block || "None"}</p>
                  <p>Room No: {agreements.aptNo || "None"}</p>
                </div>
              </div>

            </div>

            <div className="divider"></div>

            <p className="text-center text-sm text-base-content/60">
              Want to update your profile? Contact the admin for assistance.
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
