import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const email = user.email;
  const [agreement, setAgreement] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [month, setMonth] = useState("");
  const [appliedRent, setAppliedRent] = useState(null); // Initialize to null for clarity
  const [validCoupons] = useState({
    SAVE10: 10, // 10% discount
    SAVE20: 20, // 20% discount
  });

  const axiosPublic = useAxiosPublic();

  // Fetch agreements for the logged-in user
  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await axiosPublic.get(`/agreements?email=${email}`);
        if (response.data && response.data.length > 0) {
          setAgreement(response.data);
          setAppliedRent(response.data[0].rent); // Set rent from the first agreement
        } else {
          console.log("No agreement found for this user.");
        }
      } catch (error) {
        console.error("Error fetching agreements:", error);
      }
    };

    if (email) {
      fetchAgreements();
    }
  }, [email]);

  // Handle coupon application
  const applyCoupon = () => {
    if (!coupon || coupon.trim() === "") {
      toast.warn("Please enter a valid coupon code.");
      return;
    }

    axiosPublic
      .get(`/coupons/${coupon}`)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.length > 0) {
          const discountPercentage = res.data[0].discountPercentage;
          const discountedRent =
            agreement[0].rent - (agreement[0].rent * discountPercentage) / 100;
          setAppliedRent(discountedRent);
          setMessage(
            `Coupon applied! ${discountPercentage}% discount applied.`
          );
        } else {
          setAppliedRent(agreement[0].rent); // No discount, so reset to original rent
          setMessage("Invalid coupon code.");
        }
      })
      .catch((error) => {
        console.log("Error applying coupon.", error);
        setMessage("Error applying coupon. Please try again.");
      });
  };

  // Handle the payment logic
  const handlePayment = () => {
    if (!month) {
      toast.warn("Please select a month to proceed.");
      setAppliedRent(agreement[0].rent); // Reset to original rent if no month is selected
      return; // Stop further execution if no month is selected
    }

    // Proceed to payment page
    navigate("/payment");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>
      <form className="space-y-4">
        {/* Member details */}
        {agreement.length > 0 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Member Email</label>
              <input
                type="email"
                readOnly
                value={agreement[0].userEmail || ""}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Floor</label>
              <input
                type="text"
                readOnly
                value={agreement[0].floor || ""}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Block Name</label>
              <input
                type="text"
                readOnly
                value={agreement[0].block || ""}
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
                value={agreement[0].aptNo || ""}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rent</label>
              <input
                type="text"
                readOnly
                value={`$${(appliedRent || agreement[0].rent).toFixed(2)}`}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
          </>
        )}

        {/* Month Selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Month</label>
          <select
            required
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            {/* Add more months as needed */}
          </select>
        </div>

        {/* Coupon Code */}
        <div className="mb-4">
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={applyCoupon}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Apply Coupon
          </button>
        </div>

        {/* Message Display */}
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}

        {/* Pay Button */}
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

export default PaymentForm;
