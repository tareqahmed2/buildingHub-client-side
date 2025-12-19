import React from "react";
import { FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: agreementRequest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return res.data;
    },
  });

  const handleAccept = (userEmail, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this agreement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.put(`/agreements/${id}/accept`, {
            userEmail,
            id,
          });

          if (res.data?.modifiedCount > 0) {
            Swal.fire("Success!", "Agreement accepted successfully!", "success");
            refetch();
          } else {
            Swal.fire("Info", "No changes were made.", "info");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to accept the agreement!", "error");
        }
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this agreement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.put(`/agreements/${id}/reject`);

          if (res.data?.modifiedCount > 0) {
            Swal.fire("Success!", "Agreement rejected successfully!", "success");
            refetch();
          } else {
            Swal.fire("Info", "No changes were made.", "info");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to reject the agreement!", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="shadow-lg rounded-lg bg-base-100">
      <Helmet>
        <title>Buildinghub | Agreement Request</title>
      </Helmet>

      <h2 className="p-4 text-2xl font-semibold mb-4">
        Agreement Requests ({agreementRequest.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Apt. No</th>
              <th>Rent</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {agreementRequest.map((request) => (
              <tr key={request._id}>
                <td className="font-semibold">{request.userName}</td>
                <td>{request.userEmail}</td>
                <td>{request.floor}</td>
                <td>{request.block}</td>
                <td>{request.aptNo}</td>
                <td>${request.rent}</td>
                <td>{request.dateApplied}</td>
                <td>{request.status}</td>
                <td className="flex items-center gap-3">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleAccept(request.userEmail, request._id)
                        }
                        title="Accept"
                        className="btn btn-xs btn-success btn-outline"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        title="Reject"
                        className="btn btn-xs btn-error btn-outline"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementRequest;
