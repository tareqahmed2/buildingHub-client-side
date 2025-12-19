import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const email = user?.email;

  useEffect(() => {
    if (email) {
      const fetchPaymentHistory = async () => {
        try {
          const response = await axiosSecure.get(
            `/payment-history?email=${user.email}`
          );
          setPaymentHistory(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching payment history:", error);
        }
      };

      fetchPaymentHistory();
    }
  }, [email, axiosSecure, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Helmet>
        <title>Buildinghub | Payment-History</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      {paymentHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 shadow-lg rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Rent</th>
                <th>Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.email}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>${payment.rent}</td>
                  <td>{payment.paymentIntentId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
