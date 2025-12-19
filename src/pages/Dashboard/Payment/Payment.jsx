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
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const axiosPublic = useAxiosPublic();

const fetchAgreement = async (email) => {
  const response = await axiosPublic.get(`/payments/${email}`);
  return response.data;
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
    refetch: refetchAgreement,
  } = useQuery({
    queryKey: ["agreement", user.email],
    queryFn: () => fetchAgreement(user.email),
    enabled: !!user.email,
  });

  const { data: couponData } = useQuery({
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

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");

        await axiosPublic.post("/payment-history", {
          email: user.email,
          rent: appliedRent,
          date: new Date().toISOString(),
          paymentIntentId: result.paymentIntent.id,
        });

        await axiosPublic.patch(`/agreement?email=${user?.email}`, {
          payment: "successful",
        });

        refetchAgreement();
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <Helmet>
        <title>Buildinghub | Payment</title>
      </Helmet>

      <div className="card bg-base-100 shadow-xl max-w-lg w-full">
        <div className="card-body">

          {agreementData?.payment === "successful" ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-success">
                Payment Successful!
              </h2>
              <p className="mt-4 text-lg">
                You have successfully paid your rent. Thank you for your payment!
              </p>
              <div className="alert alert-success mt-6">
                <span>Your bill has been paid.</span>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Make a Payment</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Amount (USD)</span>
                  </label>
                  <input
                    type="number"
                    value={appliedRent ? appliedRent.toFixed(2) : ""}
                    readOnly
                    className="input input-bordered w-full bg-base-200"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Card Details</span>
                  </label>
                  <div className="input input-bordered p-3">
                    <CardElement />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className={`btn btn-primary w-full ${
                    (!stripe || loading) && "btn-disabled"
                  }`}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </form>

              {message && (
                <p className="mt-4 text-center text-error">{message}</p>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
