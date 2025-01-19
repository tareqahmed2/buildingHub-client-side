import React, { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const MakeAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting

    try {
      const response = await axiosPublic.post("/announcements", {
        title,
        description,
      });

      if (response.status === 200) {
        console.log("Announcement created:", response.data);
        toast.success("Announcement posted successfully!");
        // Reset form fields after success
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("There was an error posting the announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-500">
        Make Announcement
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg  mb-2 text-purple-600 font-bold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of the announcement"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg  text-purple-600 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description of the announcement"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Announcement"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
