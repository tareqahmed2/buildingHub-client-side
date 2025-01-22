import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const axiosPublic = useAxiosPublic();

const fetchAgreement = async (email) => {
  try {
    const response = await axiosPublic.get(`/payments/${email}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching agreements:", error);
    toast.error("Failed to load agreements");
  } finally {
  }
};

const fetchCoupon = async (coupon) => {
  const response = await axiosPublic.get(`/coupons/${coupon}`);
  if (response.data && response.data.length > 0) {
    return response.data[0];
  }
  return null;
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedRent, setAppliedRent] = useState(null);
  const { user } = useAuth();

  const {
    data: agreementData,
    isLoading: isAgreementLoading,
    error: agreementError,
    refetch: refetchAgreement,
  } = useQuery({
    queryKey: ["agreement", user.email],
    queryFn: () => fetchAgreement(user.email),
    enabled: !!user.email,
  });

  const {
    data: couponData,
    isLoading: isCouponLoading,
    error: couponError,
  } = useQuery({
    queryKey: ["coupon", coupon],
    queryFn: () => fetchCoupon(coupon),
    enabled: !!coupon,
  });

  useEffect(() => {
    if (agreementData) {
      let rentAmount = agreementData.rent;

      if (couponData) {
        const discountPercentage = couponData.discountPercentage;
        rentAmount -= (agreementData.rent * discountPercentage) / 100;
      }

      setAppliedRent(rentAmount);
      setAmount(rentAmount);
    }
  }, [agreementData, couponData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountInCents = parseFloat(amount);
    if (!stripe || !elements || isNaN(amountInCents) || amountInCents <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axiosPublic.post("/create-payment-intent", {
        amount: Math.round(amountInCents * 100),
      });

      const clientSecret = data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        const paymentDetails = {
          email: user.email,
          rent: appliedRent,
          date: new Date().toISOString(),
          paymentIntentId: result.paymentIntent.id,
        };

        await axiosPublic.post("/payment-history", paymentDetails);
        await axiosPublic
          .patch(`/agreement?email=${user?.email}`, {
            payment: "successful",
          })
          .then((res) => {
            console.log("Payment status updated:", res.data);
            refetchAgreement();
          })
          .catch((error) => {
            console.error("Error updating payment status:", error);
          });
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      {agreementData?.payment === "successful" ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful!
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            You have successfully paid your rent. Thank you for your payment!
          </p>
          <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded">
            <p className="text-center text-green-600 font-semibold">
              Your bill has been paid.
            </p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Amount (USD)</label>
              <input
                type="number"
                min="1"
                step="any"
                value={appliedRent ? appliedRent.toFixed(2) : ""}
                readOnly
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Card Details</label>
              <div className="p-2 border rounded">
                <CardElement />
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full p-2 rounded ${
                !stripe || loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}
        </>
      )}
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
