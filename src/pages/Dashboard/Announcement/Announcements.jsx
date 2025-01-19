import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaSpinner } from "react-icons/fa";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosPublic.get("/announcements");
        setAnnouncements(response.data);
      } catch (err) {
        setError("Failed to fetch announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="announcements-page">
      <h2 className="text-2xl font-bold mb-4 text-purple-500">Announcements</h2>
      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="announcement-item bg-white p-4 mb-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-600">{announcement.description}</p>
            <p className="text-gray-400 text-sm mt-2">
              {new Date(announcement.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
