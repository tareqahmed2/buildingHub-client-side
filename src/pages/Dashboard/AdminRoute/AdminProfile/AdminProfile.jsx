import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const { data: allMembers = [], isLoading: membersLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-members");
      return res.data;
    },
  });

  const { data: apartments = [], isLoading: apartmentsLoading } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments");
      return res.data;
    },
  });

  const { data: bookedRooms = [], isLoading: bookedRoomsLoading } = useQuery({
    queryKey: ["bookedRooms"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookedRooms");
      return res.data;
    },
  });

  const availableRooms = apartments.length - bookedRooms.length;
  const totalRooms = apartments.length;
  const unavailableRooms = bookedRooms.length;

  const availablePercentage = ((availableRooms / totalRooms) * 100).toFixed(2);
  const unavailablePercentage = ((unavailableRooms / totalRooms) * 100).toFixed(
    2
  );

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <img
            src={user?.photoURL}
            alt="Admin Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>

        <div className="md:ml-8 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800">
            {user?.displayName}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Total Rooms */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Rooms</h3>
          {apartmentsLoading ? (
            <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto" />
          ) : (
            <p className="text-2xl font-bold text-blue-600">
              {apartments.length}
            </p>
          )}
        </div>

        {/* Available Rooms */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Available Rooms
          </h3>
          {apartmentsLoading || bookedRoomsLoading ? (
            <FaSpinner className="animate-spin text-3xl text-green-500 mx-auto" />
          ) : (
            <>
              <p className="text-2xl font-bold text-green-600">
                {availableRooms}
              </p>
              <p className="text-gray-500">
                ({availablePercentage}% of total rooms)
              </p>
            </>
          )}
        </div>

        {/* Unavailable Rooms */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Unavailable Rooms
          </h3>
          {bookedRoomsLoading ? (
            <FaSpinner className="animate-spin text-3xl text-red-500 mx-auto" />
          ) : (
            <>
              <p className="text-2xl font-bold text-red-600">
                {unavailableRooms}
              </p>
              <p className="text-gray-500">
                ({unavailablePercentage}% of total rooms)
              </p>
            </>
          )}
        </div>

        {/* Users */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Users in Database
          </h3>
          {usersLoading ? (
            <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto" />
          ) : (
            <p className="text-2xl font-bold text-blue-600">
              {allUsers.length}
            </p>
          )}
        </div>

        {/* Members */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Members in Database
          </h3>
          {membersLoading ? (
            <FaSpinner className="animate-spin text-3xl text-green-500 mx-auto" />
          ) : (
            <p className="text-2xl font-bold text-green-600">
              {allMembers.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
