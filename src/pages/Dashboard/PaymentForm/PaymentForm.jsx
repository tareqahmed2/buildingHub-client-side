import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const email = user.email;
  const [agreement, setAgreement] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [month, setMonth] = useState("");
  const [appliedRent, setAppliedRent] = useState(null);
  const [showError, setShowError] = useState(true);
  const [couponError, setCouponError] = useState(true);
  const [isCouponUsedModalOpen, setIsCouponUsedModalOpen] = useState(false);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await axiosSecure.get(`/agreements/${email}`);
        setAgreement(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load agreements");
      }
    };
    fetchAgreements();
  }, [email, axiosSecure]);

  const applyCoupon = async () => {
    if (!month) {
      toast.error("Please select a month first.");
      return;
    }

    try {
      const response = await axiosSecure.get(`/coupons/${coupon}`);
      if (response.data && response.data.length > 0) {
        const discountPercentage = response.data[0].discountPercentage;

        if (agreement.couponUsed === coupon) {
          setIsCouponUsedModalOpen(true);
          return;
        }

        const discountedRent =
          agreement.rent - (agreement.rent * discountPercentage) / 100;

        await axiosPublic.patch(`/agreements/${agreement._id}`, {
          rent: discountedRent,
          couponUsed: coupon,
        });

        setAppliedRent(discountedRent);
        setMessage(
          `Coupon applied! ${discountPercentage}% discount applied. Rent updated successfully.`
        );
        toast.success("Coupon applied and rent updated!");
      } else {
        setAppliedRent(agreement[0].rent);
        setMessage("Invalid coupon code.");
        toast.error("Invalid coupon code.");
      }
    } catch (error) {
      setMessage("Error applying coupon. Please try again.");
      toast.error("Error applying coupon. Please try again.");
    }
  };

  const closeCouponUsedModal = () => {
    setIsCouponUsedModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Helmet>
        <title>Buildinghub | Payment-form</title>
      </Helmet>

      <div className="card bg-base-100 shadow-xl max-w-lg mx-auto">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Make Payment</h2>

          <form className="space-y-4">

            <div>
              <label className="label">
                <span className="label-text">Member Email</span>
              </label>
              <input
                type="email"
                readOnly
                value={agreement.userEmail || ""}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Floor</span>
              </label>
              <input
                type="text"
                readOnly
                value={agreement.floor || ""}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Block Name</span>
              </label>
              <input
                type="text"
                readOnly
                value={agreement.block || ""}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Apartment No/Room No</span>
              </label>
              <input
                type="text"
                readOnly
                value={agreement.aptNo || ""}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Rent</span>
              </label>
              <input
                type="text"
                readOnly
                value={`$${appliedRent || agreement.rent}`}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Month</span>
              </label>
              <select
                required
                onChange={(e) => {
                  setMonth(e.target.value);
                  setShowError(!e.target.value);
                }}
                className="select select-bordered w-full"
              >
                <option value="">Select Month</option>
                {[
                  "January","February","March","April","May","June",
                  "July","August","September","October","November","December",
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {showError && (
              <span className="block text-error">
                Please select a month to apply a coupon.
              </span>
            )}

            {!showError && couponError && (
              <span className="block text-error">
                Please Apply a coupon code.
              </span>
            )}

            <div>
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <input
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponError(!e.target.value);
                }}
                disabled={!month}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={!month || coupon.trim() === ""}
                className="btn btn-primary w-full mt-2"
              >
                Apply Coupon
              </button>
            </div>

            {message && (
              <p className="text-success text-sm">{message}</p>
            )}

            <button
              type="button"
              onClick={() => {
                if (!month) {
                  toast.warn("Please select a month to proceed.");
                  return;
                }
                navigate("/dashboard/payment");
              }}
              className="btn btn-success w-full"
            >
              Pay Now
            </button>

          </form>
        </div>
      </div>

      {isCouponUsedModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-4">Coupon Already Used</h3>
            <p className="mb-4">
              This coupon has already been used. Please try a different coupon.
            </p>
            <div className="modal-action">
              <button
                onClick={closeCouponUsedModal}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
