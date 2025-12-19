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
      .catch(() => {
        Swal.fire({
          title: "Oops!",
          text: "Failed to copy the coupon code. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <section className="px-5 bg-base-100 text-base-content">
      <div
        id="coupon-deals"
        className="py-16 px-4 max-w-screen-xl mx-auto rounded-xl bg-base-200"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Exclusive Coupons
          </h2>
          <p className="text-lg mb-12">
            Save on your next payment. Choose the best coupon and apply it today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="card-body items-center text-center bg-primary text-primary-content rounded-t-xl">
                  <h3 className="text-2xl font-semibold">{coupon.code}</h3>
                  <p className="text-lg">{coupon.description}</p>
                </div>

                <div className="card-body items-center text-center">
                  <p className="text-sm">
                    <span className="font-semibold">Expires:</span>{" "}
                    {coupon.expiryDate}
                  </p>

                  <p className="text-lg font-bold text-primary">
                    {coupon.discountPercentage}% OFF
                  </p>

                  <span
                    className={`badge badge-lg font-bold ${
                      coupon.availability
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {coupon.availability
                      ? "Coupon Available"
                      : "Not Available"}
                  </span>
                </div>

                <div className="card-actions justify-center pb-6">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleApplyCoupon(
                        coupon.code,
                        coupon.availability
                      )
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
