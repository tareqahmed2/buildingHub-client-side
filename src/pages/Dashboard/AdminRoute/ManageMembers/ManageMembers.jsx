import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner, FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  // Query to fetch all members
  const {
    data: members = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-members");
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
          // Send DELETE request to remove the member
          const response = await axiosPublic.delete(`/remove-member/${id}`);

          // Check if the response is successful
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
          console.error("Error removing member:", error);
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
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto py-4 px-1 md:px-6">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Members</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">User Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Floor</th>
              <th className="px-6 py-3 text-left">Block</th>
              <th className="px-6 py-3 text-left">Apt No</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member) => (
              <tr
                key={member._id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-6 py-4">{member.userName}</td>
                <td className="px-6 py-4">{member.userEmail}</td>
                <td className="px-6 py-4">{member.Role}</td>
                <td className="px-6 py-4">{member.floor}</td>
                <td className="px-6 py-4">{member.block}</td>
                <td className="px-6 py-4">{member.aptNo}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemove(member._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
