import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AdminProfile = () => {
  const { user } = useAuth();
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

  const totalRooms = apartments.length;
  const unavailableRooms = bookedRooms.length;
  const availableRooms = totalRooms - unavailableRooms;

  const availablePercentage =
    totalRooms > 0 ? ((availableRooms / totalRooms) * 100).toFixed(2) : 0;

  const unavailablePercentage =
    totalRooms > 0 ? ((unavailableRooms / totalRooms) * 100).toFixed(2) : 0;

  return (
    <div className="container mx-auto p-5">
      <Helmet>
        <title>Buildinghub | Admin</title>
      </Helmet>

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-md mb-8">
        <div className="card-body flex flex-col md:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="Admin Profile" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
            <p className="opacity-70">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat bg-base-100 shadow rounded-box text-center">
          <div className="stat-title">Total Rooms</div>
          <div className="stat-value text-primary">
            {apartmentsLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              totalRooms
            )}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box text-center">
          <div className="stat-title">Available Rooms</div>
          <div className="stat-value text-success">
            {apartmentsLoading || bookedRoomsLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              availableRooms
            )}
          </div>
          {!apartmentsLoading && !bookedRoomsLoading && (
            <div className="stat-desc">
              {availablePercentage}% of total rooms
            </div>
          )}
        </div>

        <div className="stat bg-base-100 shadow rounded-box text-center">
          <div className="stat-title">Unavailable Rooms</div>
          <div className="stat-value text-error">
            {bookedRoomsLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              unavailableRooms
            )}
          </div>
          {!bookedRoomsLoading && (
            <div className="stat-desc">
              {unavailablePercentage}% of total rooms
            </div>
          )}
        </div>

        <div className="stat bg-base-100 shadow rounded-box text-center">
          <div className="stat-title">Users in Database</div>
          <div className="stat-value text-info">
            {usersLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              allUsers.length
            )}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box text-center">
          <div className="stat-title">Members in Database</div>
          <div className="stat-value text-success">
            {membersLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              allMembers.length
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
