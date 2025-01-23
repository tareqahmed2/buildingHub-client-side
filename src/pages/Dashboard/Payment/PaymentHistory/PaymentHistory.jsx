import React, { useEffect, useState } from "react";
import axios from "axios";
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
  }, [email]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>Buildinghub | Payment-History</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {paymentHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Email
                </th>{" "}
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Date
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Rent
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Payment ID
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="p-4 text-gray-800">{payment.email}</td>
                  <td className="p-4 text-gray-800">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-800">${payment.rent}</td>
                  <td className="p-4 text-gray-800">
                    {payment.paymentIntentId}
                  </td>
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
