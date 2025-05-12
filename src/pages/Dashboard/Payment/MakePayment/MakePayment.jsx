import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useTheme } from "next-themes";

const MakePayment = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const [agreements, setAgreements] = useState([]);
  const [agreement, setAgreement] = useState({});

  const { user } = useAuth();
  const email = user.email;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [month, setMonth] = useState("");
  const [discountedRent, setDiscountedRent] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch agreements for the logged-in user
  useEffect(() => {
    const fetchAgreements = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosSecure.get(`/agreements/${email}`);
        setAgreement(response.data);
      } catch (error) {
        console.error("Error fetching agreements:", error);
        toast.error("Failed to load agreements");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAgreements();
  }, [email]);

  // Handle payment logic
  const handlePayment = () => {
    navigate("payment-form");
  };

  return (
    <div
      className={`p-4 max-w-md mx-auto rounded shadow ${
        theme === "light"
          ? "bg-white text-gray-700"
          : "  text-white tbg-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          {/* DaisyUI Spinner */}
          <span className="loading loading-spinner loading-lg text-green-500"></span>
        </div>
      ) : (
        <form>
          {/* Member details */}
          {/* {agreements.map((agreement, index) => (
            
          ))} */}
          <div>
            <div className="mb-4">
              <Helmet>
                <title>Buildinghub | Make Payment</title>
              </Helmet>
              <label
                className={`block ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Member Email
              </label>
              <input
                type="email"
                readOnly
                value={agreement.userEmail}
                className={`w-full p-2 border rounded  ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                className={`block ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Floor
              </label>
              <input
                type="text"
                readOnly
                value={agreement.floor}
                className={`w-full p-2 border rounded  ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                className={`block ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Block Name
              </label>
              <input
                type="text"
                readOnly
                value={agreement.block}
                className={`w-full p-2 border rounded  ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                className={`block ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Apartment No/Room No
              </label>
              <input
                type="text"
                readOnly
                value={agreement.aptNo}
                className={`w-full p-2 border rounded  ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                className={`block ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Rent
              </label>
              <input
                type="text"
                readOnly
                value={agreement.rent}
                className={`w-full p-2 border rounded  ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              />
            </div>
          </div>

          {/* Payment Button */}
          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

export default MakePayment;
