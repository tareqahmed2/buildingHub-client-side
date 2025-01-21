import React, { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const ManageCoupons = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    expiryDate: null, // Updated for DatePicker
    discountPercentage: "",
    allProperties: false,
  });

  // Format date to dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch coupons with useQuery
  const { data: coupons, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axiosPublic.get("/coupons");
      return response.data;
    },
  });

  // Mutation for adding a new coupon
  const addCouponMutation = useMutation({
    mutationFn: async (newCoupon) => {
      const response = await axiosPublic.post("/coupons", {
        ...newCoupon,
        expiryDate: formatDate(newCoupon.expiryDate),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      setShowModal(false);
      setNewCoupon({
        code: "",
        description: "",
        expiryDate: null,
        discountPercentage: "",
        allProperties: false,
      });
      Swal.fire({
        icon: "success",
        title: "Coupon Added!",
        text: "The coupon has been added successfully.",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error adding the coupon. Please try again.",
      });
    },
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCoupon({
      ...newCoupon,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle date change for DatePicker
  const handleDateChange = (date) => {
    setNewCoupon({
      ...newCoupon,
      expiryDate: date,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addCouponMutation.mutate(newCoupon);
  };

  return (
    <div className="manage-coupons p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Manage Coupons
      </h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => setShowModal(true)}
      >
        Add Coupon
      </button>

      {/* Coupons Table */}
      <div className="mt-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading coupons...</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4 text-gray-700 font-semibold whitespace-nowrap">
                  Coupon Code
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Description
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Expiry Date
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Discount (%)
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  All Properties
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.length > 0 ? (
                coupons.map((coupon, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 text-gray-800">{coupon?.code}</td>
                    <td className="p-4 text-gray-800">{coupon?.description}</td>
                    <td className="p-4 text-gray-800 whitespace-nowrap">
                      {coupon?.expiryDate}
                    </td>
                    <td className="p-4 text-gray-800">
                      {coupon?.discountPercentage}%
                    </td>
                    <td className="p-4 text-gray-800">
                      {coupon?.allProperties ? "Yes" : "No"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No coupons added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="code"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={newCoupon.code}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter coupon code"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newCoupon.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter coupon description"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Expiry Date
                </label>
                <DatePicker
                  id="expiryDate"
                  selected={newCoupon.expiryDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 border rounded-lg"
                  placeholderText="Select expiry date"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={newCoupon.discountPercentage}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter discount (%)"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="allProperties"
                  name="allProperties"
                  checked={newCoupon.allProperties}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label
                  htmlFor="allProperties"
                  className="text-sm font-semibold text-gray-700"
                >
                  Apply to All Properties
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
