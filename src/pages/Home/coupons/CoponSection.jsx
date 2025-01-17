import React from "react";

// Fake data for coupons
const coupons = [
  {
    id: 1,
    code: "DISCOUNT10",
    description: "10% off on your next rent payment.",
    expiryDate: "2025-02-28",
    discountPercentage: 10,
  },
  {
    id: 2,
    code: "SUMMER20",
    description: "20% off for summer season, valid for all apartments.",
    expiryDate: "2025-06-15",
    discountPercentage: 20,
  },
  {
    id: 3,
    code: "WELCOME5",
    description:
      "5% off for new users, apply this coupon during first payment.",
    expiryDate: "2025-03-01",
    discountPercentage: 5,
  },
];

const CouponSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-screen-xl mx-auto rounded-lg">
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
              className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6 bg-gradient-to-r from-indigo-400 to-pink-300 text-center">
                <h3 className="text-2xl font-semibold text-white">
                  {coupon.code}
                </h3>
                <p className="text-white text-lg mt-2">{coupon.description}</p>
              </div>

              <div className="bg-white p-4 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Expires:</span>{" "}
                  {coupon.expiryDate}
                </p>
                <p className="text-lg font-bold text-indigo-600 mt-2">
                  {coupon.discountPercentage}% OFF
                </p>
              </div>

              <div className="p-4 bg-gradient-to-l from-pink-400 to-indigo-300 text-center rounded-b-lg">
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg transform hover:scale-105 transition-all duration-200">
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
