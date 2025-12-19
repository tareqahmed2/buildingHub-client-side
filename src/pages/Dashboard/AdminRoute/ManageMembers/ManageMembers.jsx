import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageMembers = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: members = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-members");
      return res.data;
    },
    onSuccess: () => setLoading(false),
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to change this user's role to 'user'.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove them!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/remove-member/${id}`);

          if (response.data.deletedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Member role updated to user.",
              icon: "success",
              confirmButtonText: "OK",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while removing the member.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6">
      <Helmet>
        <title>Buildinghub | Manage Members</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">Manage Members</h2>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Floor</th>
                <th>Block</th>
                <th>Apt No</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id}>
                  <td>{member.userName}</td>
                  <td>{member.userEmail}</td>
                  <td className="capitalize">{member.Role}</td>
                  <td>{member.floor}</td>
                  <td>{member.block}</td>
                  <td>{member.aptNo}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleRemove(member._id)}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {members.length === 0 && (
            <p className="text-center py-6 opacity-70">
              No members found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
