import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useTheme } from "next-themes";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

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
      <Helmet>
        <title>Buildinghub | Announcements</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-purple-500">Announcements</h2>
      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`announcement-item  p-4 mb-4 rounded-lg shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p
              className={` ${
                theme === "light" ? "text-gray-600" : "text-white"
              }`}
            >
              {announcement.description}
            </p>
            <p
              className={` ${
                theme === "font-light" ? "text-gray-600" : "text-white"
              }`}
            >
              {new Date(announcement.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
