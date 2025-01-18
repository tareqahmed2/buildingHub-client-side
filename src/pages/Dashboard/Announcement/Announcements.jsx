import React, { useState, useEffect } from "react";

// Fake data to simulate announcements
const fakeAnnouncements = [
  {
    title: "Building Maintenance",
    description:
      "We will be performing maintenance in the building on the 5th of February. Please plan accordingly.",
    createdAt: "2025-01-16T10:00:00Z",
  },
  {
    title: "New Parking Rules",
    description:
      "New parking rules will be enforced starting next month. Please check your parking spot assignments.",
    createdAt: "2025-01-12T14:30:00Z",
  },
  {
    title: "Fire Drill",
    description:
      "A fire drill will take place on the 20th of January. Please ensure you are familiar with evacuation routes.",
    createdAt: "2025-01-10T09:00:00Z",
  },
];
//todo:fetch real data

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setAnnouncements(fakeAnnouncements);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="announcements-page">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
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
