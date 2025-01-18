import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const location = useLocation();
  const { email, floor, blockName, apartmentNo, rent } = location.state || {
    email: "",
    floor: "",
    blockName: "",
    apartmentNo: "",
    rent: 0,
  };

  const [appliedRent, setAppliedRent] = useState(rent);
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  // Sample valid coupons
  const validCoupons = {
    SAVE10: 10, // 10% discount
    SAVE20: 20, // 20% discount
  };

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      const discount = validCoupons[coupon];
      const discountedRent = rent - (rent * discount) / 100;
      setAppliedRent(discountedRent);
      setMessage(`Coupon applied! ${discount}% discount applied.`);
    } else {
      setMessage("Invalid coupon code.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Floor:</label>
          <input
            type="text"
            value={floor}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Block Name:</label>
          <input
            type="text"
            value={blockName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Apartment No/Room No:</label>
          <input
            type="text"
            value={apartmentNo}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Rent:</label>
          <input
            type="text"
            value={`$${appliedRent.toFixed(2)}`}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Coupon Code:</label>
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
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        <button
          type="button"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
