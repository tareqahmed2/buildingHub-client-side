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
  const [appliedRent, setAppliedRent] = useState(null);
  const [showError, setShowError] = useState(true);
  const [couponError, setCouponError] = useState(true);
  const [isCouponUsedModalOpen, setIsCouponUsedModalOpen] = useState(false); // Modal state

  const axiosPublic = useAxiosPublic();

  // Fetch agreements for the logged-in user
  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await axiosPublic.get(`/agreements?email=${email}`);
        if (response.data && response.data.length > 0) {
          setAgreement(response.data);
          setAppliedRent(response.data[0].rent);
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
  const applyCoupon = async () => {
    if (!month) {
      toast.error("Please select a month first.");
      return;
    }

    try {
      const response = await axiosPublic.get(`/coupons/${coupon}`);
      if (response.data && response.data.length > 0) {
        const discountPercentage = response.data[0].discountPercentage;

        // Check if coupon is already used
        if (agreement[0].couponUsed === coupon) {
          setIsCouponUsedModalOpen(true); // Show modal if coupon is already used
          return;
        }

        const discountedRent =
          agreement[0].rent - (agreement[0].rent * discountPercentage) / 100;

        // Update the database with the new rent and couponUsed property
        await axiosPublic.patch(`/agreements/${agreement[0]._id}`, {
          rent: discountedRent,
          couponUsed: coupon,
        });

        setAppliedRent(discountedRent);
        setMessage(
          `Coupon applied! ${discountPercentage}% discount applied. Rent updated successfully.`
        );
        toast.success(
          `Coupon applied! ${discountPercentage}% discount applied!`
        );
      } else {
        setAppliedRent(agreement[0].rent);
        setMessage("Invalid coupon code.");
        toast.error("Invalid coupon code.");
      }
    } catch (error) {
      console.error("Error applying coupon or updating rent:", error);
      setMessage("Error applying coupon. Please try again.");
      toast.error("Error applying coupon. Please try again.");
    }
  };

  // Close the coupon-used modal
  const closeCouponUsedModal = () => {
    setIsCouponUsedModalOpen(false);
  };

  // Handle Pay Now button click
  const handlePayNow = () => {
    if (!month) {
      toast.warn("Please select a month to proceed.");
      return;
    }
    if (!coupon.trim()) {
      toast.warn("Please enter a coupon code to proceed.");
      return; // Prevent proceeding if coupon is not entered
    }

    navigate("/dashboard/payment");
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
            onChange={(e) => {
              setMonth(e.target.value);
              setShowError(!e.target.value);
            }}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        {/* Coupon Code */}
        <div className="mb-4">
          {showError && (
            <span className="block mb-2 text-red-500">
              Please select a month to apply a coupon.
            </span>
          )}
          {!showError && couponError && (
            <span className="block mb-2 text-red-500">
              Please Apply a coupon code.
            </span>
          )}

          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value);
              setCouponError(!e.target.value);
            }}
            disabled={!month}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={applyCoupon}
            disabled={!month || coupon.trim() === ""}
            className={`mt-2 w-full p-2 rounded ${
              month && coupon.trim()
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Apply Coupon
          </button>
        </div>

        {/* Message Display */}
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}

        {/* Pay Button */}
        <button
          type="button"
          onClick={handlePayNow}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>
      </form>

      {/* Coupon Used Modal */}
      {isCouponUsedModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">Coupon Already Used</h3>
            <p className="text-gray-700 mb-4">
              This coupon has already been used. Please try a different coupon.
            </p>
            <button
              onClick={closeCouponUsedModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
