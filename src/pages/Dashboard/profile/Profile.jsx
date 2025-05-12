import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useTheme } from "next-themes";

const Profile = () => {
  const { user } = useAuth();
  const [agreements, setAgreements] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  useEffect(() => {
    if (user?.email) {
      setIsLoading(true); // Start loading
      axiosSecure
        .get(`/agreements/${user.email}`)
        .then((res) => {
          setAgreements(res.data);
          console.log(res.data);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading
        });
    }
  }, []);

  // Destructuring agreement data
  const agreement = agreements || {};

  return (
    <div
      className={`p-0npm run dev  min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 to-blue-100"
          : "bg-gray-800"
      }`}
    >
      <Helmet>
        <title>Buildinghub | Profile</title>
      </Helmet>

      <h1 className="text-4xl  font-extrabold text-center text-blue-700 mb-8">
        My Profile
      </h1>
      <div
        className={` p-8 rounded-lg shadow-xl w-full py-5 md:max-w-lg mx-auto ${
          theme === "light"
            ? "bg-white"
            : "bg-gray-800 border-2 border-gray-700"
        }`}
      >
        {isLoading ? (
          // DaisyUI Spinner
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md"
                />
                <span className="absolute bottom-1 right-1 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  Active
                </span>
              </div>
              <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.displayName || "Unknown User"}
                </h2>
                <p
                  className={` text-xs md:text-lg ${
                    theme === "light" ? "text-gray-600" : "text-white"
                  }`}
                >
                  {user?.email || "No Email Provided"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3
                  className={` text-xs md:text-lg ${
                    theme === "light" ? "text-gray-600" : "text-white"
                  }`}
                >
                  Agreement Accept Date:
                </h3>
                <p
                  className={`text-sm  px-4 py-2 rounded-lg shadow ${
                    theme === "light" ? "bg-blue-100" : "bg-gray-800"
                  }`}
                >
                  {agreement.dateApplied || "None"}
                </p>
              </div>
              <div>
                <h3
                  className={`text-gray-600 text-xs md:text-lg ${
                    theme === "light" ? "text-gray-600" : "text-white"
                  }`}
                >
                  Rented Apartment Info:
                </h3>
                <div
                  className={` px-4 py-3 rounded-lg shadow space-y-2 ${
                    theme === "light" ? "bg-blue-50" : "bg-gray-800"
                  }`}
                >
                  <p
                    className={`text-sm  ${
                      theme === "light" ? "text-gray-600" : "text-white"
                    }`}
                  >
                    Floor: {agreement.floor || "None"}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-white"
                    }`}
                  >
                    Block: {agreement.block || "None"}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-white"
                    }`}
                  >
                    Room No: {agreement.aptNo || "None"}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="mt-8 border-t-2 border-dashed border-gray-300"></div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p
                className={`text-sm  ${
                  theme === "light" ? "text-gray-500" : "text-white"
                }`}
              >
                Want to update your profile? Contact the admin for more details.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
