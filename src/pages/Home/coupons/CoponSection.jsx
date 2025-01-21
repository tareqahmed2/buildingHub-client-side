import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CouponSection = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosPublic.get("/coupons");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleApplyCoupon = (couponCode) => {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        Swal.fire({
          title: "Coupon Applied!",
          text: `Coupon code ${couponCode} has been copied to your clipboard.`,
          icon: "success",
          confirmButtonText: "Close",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops!",
          text: "Failed to copy the coupon code. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <section
      id="coupon-deals"
      className="py-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-screen-xl mx-auto rounded-lg"
    >
      <div className=" text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Exclusive Coupons
        </h2>
        <p className="text-lg text-white mb-12">
          Save on your next payment! Choose the best coupon for your rental and
          apply it today.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="card bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="card-body bg-gradient-to-r from-indigo-400 to-pink-300 text-center">
                <h3 className="text-2xl font-semibold text-white">
                  {coupon.code}
                </h3>
                <p className="text-white text-lg mt-2">{coupon.description}</p>
              </div>

              <div className="card-body bg-white text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Expires:</span>{" "}
                  {coupon.expiryDate}
                </p>
                <p className="text-lg font-bold text-indigo-600 mt-2">
                  {coupon.discountPercentage}% OFF
                </p>
              </div>

              <div className="card-footer p-4 bg-gradient-to-l from-pink-400 to-indigo-300 text-center rounded-b-lg">
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => handleApplyCoupon(coupon.code)}
                >
                  Apply Coupon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
