import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import { FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useTheme } from "next-themes";
const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const { user } = useAuth();
  const {
    data: agreementRequest = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: () => axiosSecure.get("/agreements").then((res) => res.data),
    onSuccess: () => {
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });
  // Function to handle the Accept action
  const handleAccept = (userEmail, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this agreement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/agreements/${id}/accept`, { userEmail, id })
          .then((res) => {
            const updatedAgreement = res.data;
            if (updatedAgreement && updatedAgreement.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Agreement accepted and updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                refetch();
              });
            } else {
              Swal.fire({
                title: "No Changes!",
                text: "No changes were made to the agreement.",
                icon: "info",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to accept the agreement!",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };

  // Function to handle the Reject action
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this agreement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/agreements/${id}/reject`)
          .then((res) => {
            const updatedAgreement = res.data;

            if (updatedAgreement && updatedAgreement.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Agreement rejected successfully and the count is updated!",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                refetch();
              });
            } else {
              Swal.fire({
                title: "No Changes!",
                text: "No changes were made to the agreement.",
                icon: "info",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to reject the agreement!",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }
  return (
    <div
      className={` shadow-lg rounded-lg ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      <Helmet>
        <title>Buildinghub | Agreement Request</title>
      </Helmet>
      <h2
        className={`p-4 text-2xl font-semibold  mb-4  ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Agreement Requests ({agreementRequest.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="px-2 py-2 border-b whitespace-nowrap">
                User Name
              </th>
              <th className="px-2 py-2 border-b whitespace-nowrap">
                User Email
              </th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Floor</th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Block</th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Apt. No</th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Rent</th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Applied</th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Status</th>
              <th className="px-2 py-2 border-b whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agreementRequest.map((request) => (
              <tr
                key={request._id}
                className={`hover:bg-gray-100 ${
                  request._id % 2 === 0 ? "bg-red-500" : "bg-purple-200"
                }`} // Alternating row colors
              >
                <td className="pl-3 py-4 border-b border-r font-semibold text-gray-700 ">
                  {request.userName}
                </td>
                <td className="px-2  py-4 border-b border-r text-gray-600 ">
                  {request.userEmail}
                </td>
                <td className="px-2 py-4 border-b border-r text-gray-600 whitespace-nowrap">
                  {request.floor}
                </td>
                <td className="px-2 py-4 border-b border-r text-gray-600 whitespace-nowrap">
                  {request.block}
                </td>
                <td className="px-2 py-4 border-b border-r text-gray-600 whitespace-nowrap">
                  {request.aptNo}
                </td>
                <td className="px-2 py-4 border-b border-r text-gray-600 whitespace-nowrap">
                  ${request.rent}
                </td>
                <td className="px-2 py-4 border-b border-r text-gray-600 whitespace-nowrap">
                  {request?.dateApplied}
                </td>
                <td className="px-2 py-4 border-b border-r text-gray-600 whitespace-nowrap">
                  {request.status}
                </td>
                <td className="px-6 py-4 border-b border-r flex items-center gap-4">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleAccept(request.userEmail, request._id)
                        }
                        title="Accept"
                        className="flex items-center justify-center text-green-600 hover:bg-green-100  rounded-lg transition duration-300"
                      >
                        <FaCheck size={22} />
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        title="Reject"
                        className="flex items-center justify-center text-red-600 hover:bg-red-100  rounded-lg transition duration-300"
                      >
                        <FaTimes size={22} />
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
