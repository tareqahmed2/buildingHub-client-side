import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdminProfile = () => {
  // Fake data
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  //for find all users
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-users");
      return res.data;
    },
  });
  //members
  const { data: allMembers = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-members");
      return res.data;
    },
  });
  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/apartments");
      return res.data;
    },
  });
  const { data: bookedRooms = [] } = useQuery({
    queryKey: ["bookedRooms"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookedRooms");
      return res.data;
    },
  });
  const adminData = {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    email: "john.doe@example.com",
    totalRooms: 150,
    availableRooms: 90,
    unavailableRooms: 60,
    users: 500,
    members: 450,
  };
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
        {/* Admin Image */}
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <img
            src={user?.photoURL}
            alt="Admin Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>

        {/* Admin Details */}
        <div className="md:ml-8 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800">
            {user?.displayName}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Rooms</h3>
          <p className="text-2xl font-bold text-blue-600">
            {apartments.length}
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Available Rooms
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {apartments?.length - bookedRooms.length}
          </p>
          <p className="text-gray-500">
            ({availablePercentage}% of total rooms)
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Unavailable Rooms
          </h3>
          <p className="text-2xl font-bold text-red-600">
            {bookedRooms.length}
          </p>
          <p className="text-gray-500">
            ({unavailablePercentage}% of total rooms)
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Users in Database
          </h3>
          <p className="text-2xl font-bold text-blue-600">{allUsers.length}</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Members in Database
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {allMembers?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
