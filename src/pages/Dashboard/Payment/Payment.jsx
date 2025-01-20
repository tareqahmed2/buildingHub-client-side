import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const axiosPublic = useAxiosPublic();

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [agreement, setAgreement] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [appliedRent, setAppliedRent] = useState(null);

  useEffect(() => {
    const fetchAgreement = async () => {
      try {
        const email = "user-email@example.com";
        const response = await axiosPublic.get(`/agreements?email=${email}`);
        if (response.data && response.data.length > 0) {
          const agreementData = response.data[0];
          setAgreement([agreementData]);

          let rentAmount = agreementData.rent;

          if (coupon) {
            const couponResponse = await axiosPublic.get(`/coupons/${coupon}`);
            if (couponResponse.data && couponResponse.data.length > 0) {
              const discountPercentage =
                couponResponse.data[0].discountPercentage;
              rentAmount -= (agreementData.rent * discountPercentage) / 100;
            }
          }

          setAppliedRent(rentAmount);
          setAmount(rentAmount);
        }
      } catch (error) {
        console.error("Error fetching agreement or coupon:", error);
        setMessage("Error fetching agreement or coupon.");
      }
    };

    fetchAgreement();
  }, [coupon]);

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
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
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

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
