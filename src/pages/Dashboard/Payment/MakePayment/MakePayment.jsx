import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MakePayment = () => {
  const navigate = useNavigate();
  // Dummy data for demonstration
  const memberDetails = {
    email: "member@example.com",
    floor: "5th Floor",
    block: "B Block",
    apartmentNo: "12A",
    rent: 5000,
  };

  const [month, setMonth] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountedRent, setDiscountedRent] = useState(memberDetails.rent);

  // Dummy coupon for validation
  const validCoupons = {
    SAVE20: 20, // 20% discount
    SAVE10: 10, // 10% discount
  };

  const handleCouponApply = () => {
    if (validCoupons[coupon]) {
      const discount = (memberDetails.rent * validCoupons[coupon]) / 100;
      setDiscountedRent(memberDetails.rent - discount);
      alert(`Coupon applied! You saved ${validCoupons[coupon]}%.`);
    } else {
      alert("Invalid coupon code.");
    }
  };

  const handlePayment = () => {
    if (!month) {
      alert("Please select a month to proceed.");
      return;
    }
    alert(`Redirecting to payment for ${month} with rent: $${discountedRent}.`);
    // Redirect logic goes here (e.g., payment gateway integration)
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>
      <form>
        {/* Member details */}
        <div className="mb-4">
          <label className="block text-gray-700">Member Email</label>
          <input
            type="email"
            readOnly
            value={memberDetails.email}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Floor</label>
          <input
            type="text"
            readOnly
            value={memberDetails.floor}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Block Name</label>
          <input
            type="text"
            readOnly
            value={memberDetails.block}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apartment No/Room No</label>
          <input
            type="text"
            readOnly
            value={memberDetails.apartmentNo}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rent</label>
          <input
            type="text"
            readOnly
            value={`$${discountedRent}`}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Month Selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Month</label>
          <select
            value={month}
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

        {/* Payment Button */}
        <button
          type="button"
          onClick={() => navigate("payment-form")}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
