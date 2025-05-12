import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useTheme } from "next-themes";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { theme } = useTheme();
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
          <table
            className={`min-w-full  rounded-lg shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <thead>
              <tr
                className={` ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-800"
                }`}
              >
                <th
                  className={`text-left p-4  font-semibold ${
                    theme === "light" ? "text-gray-700" : "text-white"
                  }`}
                >
                  Email
                </th>{" "}
                <th
                  className={`text-left p-4  font-semibold ${
                    theme === "light" ? "text-gray-700" : "text-white"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`text-left p-4  font-semibold ${
                    theme === "light" ? "text-gray-700" : "text-white"
                  }`}
                >
                  Rent
                </th>
                <th
                  className={`text-left p-4  font-semibold ${
                    theme === "light" ? "text-gray-700" : "text-white"
                  }`}
                >
                  Payment ID
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td
                    className={`p-4  ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {payment.email}
                  </td>
                  <td
                    className={`p-4  ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-4  ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    ${payment.rent}
                  </td>
                  <td
                    className={`p-4  ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
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
