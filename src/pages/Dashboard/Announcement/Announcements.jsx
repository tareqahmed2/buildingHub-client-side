import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/announcements")
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch(() => {
        setError("Failed to fetch announcements");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-error text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Helmet>
        <title>Buildinghub | Announcements</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">
        Announcements
      </h2>

      {announcements.length === 0 ? (
        <p className="text-center text-base-content/60">
          No announcements available
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body">
                <h3 className="card-title">
                  {announcement.title}
                </h3>
                <p className="text-base-content/70">
                  {announcement.description}
                </p>
                <p className="text-sm text-base-content/50">
                  {new Date(
                    announcement.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
