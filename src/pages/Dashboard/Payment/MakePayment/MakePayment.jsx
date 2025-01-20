import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const MakePayment = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState([]);
  const { user } = useAuth();
  const email = user.email;
  const axiosPublic = useAxiosPublic();
  const [month, setMonth] = useState("");
  const [discountedRent, setDiscountedRent] = useState(0);

  // Fetch agreements for the logged-in user
  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await axiosPublic.get(`/agreements?email=${email}`);
        setAgreements(response.data);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      }
    };

    fetchAgreements();
  }, [email]);

  // Handle payment logic
  const handlePayment = () => {
    navigate("payment-form");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>
      <form>
        {/* Member details */}
        {agreements.map((agreement, index) => (
          <div key={index}>
            <div className="mb-4">
              <label className="block text-gray-700">Member Email</label>
              <input
                type="email"
                readOnly
                value={agreement.userEmail}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Floor</label>
              <input
                type="text"
                readOnly
                value={agreement.floor}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Block Name</label>
              <input
                type="text"
                readOnly
                value={agreement.block}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Apartment No/Room No
              </label>
              <input
                type="text"
                readOnly
                value={agreement.aptNo}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rent</label>
              <input
                type="text"
                readOnly
                value={agreement.rent}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
          </div>
        ))}

        {/* Month Selection */}

        {/* Payment Button */}
        <button
          type="button"
          onClick={handlePayment}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
