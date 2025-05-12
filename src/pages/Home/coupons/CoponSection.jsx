import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useTheme } from "next-themes";

const CouponSection = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosPublic = useAxiosPublic();

  const { theme } = useTheme();
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

  const handleApplyCoupon = (couponCode, isAvailable) => {
    if (!isAvailable) {
      Swal.fire({
        title: "Coupon Unavailable!",
        text: "This coupon isn't available right now.",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }

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
    <section className="px-5">
      <div
        id="coupon-deals"
        className={`py-16 px-4 max-w-screen-xl mx-auto rounded-lg ${
          theme === "light"
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
            : "bg-gray-800"
        }`}
      >
        <div className=" text-center">
          <h2 className="text-2xl md:4xl font-bold text-white mb-8">
            Exclusive Coupons
          </h2>
          <p className="text-lg text-white mb-12">
            Save on your next payment! Choose the best coupon for your rental
            and apply it today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`card border-t-2 border-b-2 border-gray-700 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                  theme === "light" ? " bg-white" : "bg-gray-800"
                }`}
              >
                <div
                  className={`card-body text-center ${
                    theme === "light"
                      ? " bg-gradient-to-r from-indigo-400 to-pink-300 "
                      : "bg-gray-800"
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-white">
                    {coupon.code}
                  </h3>
                  <p className="text-white text-lg mt-2">
                    {coupon.description}
                  </p>
                </div>

                <div
                  className={`card-body text-center ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    <span className="font-semibold">Expires:</span>{" "}
                    {coupon.expiryDate}
                  </p>
                  <p className="text-lg font-bold text-indigo-600 mt-2">
                    {coupon.discountPercentage}% OFF
                  </p>
                  <div className="mt-2">
                    <span
                      className={`badge text-lg font-bold ${
                        coupon.availability
                          ? "badge-primary text-white"
                          : "badge-secondary text-gray-800"
                      }`}
                    >
                      {coupon.availability
                        ? "Coupon Is Available"
                        : "Coupon Not Available"}
                    </span>
                  </div>
                </div>

                <div
                  className={`card-footer p-4  text-center rounded-b-lg ${
                    theme === "light"
                      ? "bg-gradient-to-l from-pink-400 to-indigo-300"
                      : "bg-gray-800"
                  }`}
                >
                  <button
                    className={`bg-indigo-600 text-white py-2 px-4 rounded-lg transform hover:scale-105 transition-all duration-200 
                  }`}
                    onClick={() =>
                      handleApplyCoupon(coupon.code, coupon.availability)
                    }
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
