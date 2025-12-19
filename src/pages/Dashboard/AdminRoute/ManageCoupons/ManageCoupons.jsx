import React, { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    expiryDate: null,
    discountPercentage: "",
  });

  const [editCoupon, setEditCoupon] = useState(null);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const { data: coupons, isLoading, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const addCouponMutation = useMutation({
    mutationFn: async (coupon) => {
      return axiosSecure.post("/coupons", {
        ...coupon,
        expiryDate: formatDate(coupon.expiryDate),
        availability: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      setShowModal(false);
      setNewCoupon({
        code: "",
        description: "",
        expiryDate: null,
        discountPercentage: "",
      });
      Swal.fire("Success!", "Coupon added successfully.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to add coupon.", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({
      ...newCoupon,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCouponMutation.mutate(newCoupon);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axiosSecure.patch(`/coupons/${editCoupon._id}`, editCoupon).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        setShowEditModal(false);
        Swal.fire("Success!", "Coupon updated successfully.", "success");
      } else {
        Swal.fire("Info", "No changes made.", "info");
      }
    });
  };

  return (
    <div className="p-4 md:p-8">
      <Helmet>
        <title>Buildinghub | Manage Coupons</title>
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Manage Coupons
      </h1>

      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowModal(true)}
      >
        Add Coupon
      </button>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <table className="table w-full bg-base-100 shadow-md rounded-lg">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Description</th>
                <th>Expiry Date</th>
                <th>Discount (%)</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons?.length ? (
                coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.description}</td>
                    <td>{coupon.expiryDate}</td>
                    <td>{coupon.discountPercentage}%</td>
                    <td>
                      <span
                        className={`font-semibold ${
                          coupon.availability
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {coupon.availability ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => {
                          setEditCoupon(coupon);
                          setShowEditModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center italic opacity-60">
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
        <div className="modal modal-open">
          <div className="modal-box bg-base-100">
            <h3 className="font-bold text-lg mb-4">Add New Coupon</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="code"
                value={newCoupon.code}
                onChange={handleChange}
                placeholder="Coupon Code"
                className="input input-bordered w-full mb-3"
                required
              />
              <textarea
                name="description"
                value={newCoupon.description}
                onChange={handleChange}
                placeholder="Description"
                className="textarea textarea-bordered w-full mb-3"
                required
              />
              <DatePicker
                selected={newCoupon.expiryDate}
                onChange={(date) =>
                  setNewCoupon({ ...newCoupon, expiryDate: date })
                }
                dateFormat="dd/MM/yyyy"
                className="input input-bordered w-full mb-3"
                placeholderText="Expiry Date"
                required
              />
              <input
                type="number"
                name="discountPercentage"
                value={newCoupon.discountPercentage}
                onChange={handleChange}
                placeholder="Discount %"
                className="input input-bordered w-full mb-4"
                required
              />

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditModal && editCoupon && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100">
            <h3 className="font-bold text-lg mb-4">Edit Coupon</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                value={editCoupon.code}
                onChange={(e) =>
                  setEditCoupon({ ...editCoupon, code: e.target.value })
                }
                className="input input-bordered w-full mb-3"
              />
              <select
                value={editCoupon.availability}
                onChange={(e) =>
                  setEditCoupon({
                    ...editCoupon,
                    availability: e.target.value === "true",
                  })
                }
                className="select select-bordered w-full mb-4"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
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
