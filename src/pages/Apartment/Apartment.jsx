import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { cssTransition, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Apartment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [userFromCollection, setUserFromCollection] = useState([]);

  const [apartments, setApartments] = useState([]);
  const axiosPublic = useAxiosPublic();
  axiosPublic
    .get("/apartments")
    .then((res) => {
      setApartments(res.data);

      setLoading(false);
    })
    .catch((error) => {
      console.log(error.message);
      setLoading(false);
    });
  const [searchRange, setSearchRange] = useState([1000, 3000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle pagination
  const apartmentsPerPage = 6;
  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const currentApartments = apartments.slice(
    indexOfFirstApartment,
    indexOfLastApartment
  );

  // Handle search/filtering by rent range
  const filteredApartments = currentApartments.filter(
    (apt) => apt.rent >= searchRange[0] && apt.rent <= searchRange[1]
  );

  useEffect(() => {
    axiosPublic.get(`/all-users/${user?.email}`).then((res) => {
      setUserFromCollection(res.data);
    });
  }, []);

  const handleAgreement = (apartment) => {
    const currentDate = new Date().toLocaleDateString();
    if (!user) {
      navigate("/login");
      return;
    }
    if (userFromCollection?.Role === "admin") {
      Swal.fire({
        title: "Admin Access",
        text: "As an administrator, you cannot give agreement requests.",
        icon: "warning",
        button: "OK",
      });
      return;
    }
    axiosPublic
      .post("/agreement", {
        userName: user?.displayName,
        userEmail: user?.email,
        userPhoto: user?.photoURL,
        // apartment data
        aptId: apartment._id,
        floor: apartment.floor,
        block: apartment.block,
        aptNo: apartment.aptNo,
        rent: apartment.rent,
        aptImg: apartment.image,
        status: "pending",
        dateApplied: currentDate,
      })
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: `You have successfully applied for Apartment No: ${apartment.aptNo}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        console.error("Error applying for apartment:", error);
        toast.error("You have already applied for Apartment");
        Swal.fire({
          title: "Error!",
          text: "There was an issue applying for the apartment.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }
  return (
    <div className="container max-w-screen-xl mx-auto p-4 sm:p-6">
      <Helmet>
        <title>Buildinghub | Apartments</title>
      </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          Available Apartments
        </h2>
        <div className="flex flex-wrap justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor="min-rent" className="text-gray-600">
              Min Rent:
            </label>
            <input
              type="number"
              id="min-rent"
              className="px-3 py-2 border rounded w-full sm:w-auto"
              value={searchRange[0]}
              onChange={(e) =>
                setSearchRange([Number(e.target.value), searchRange[1]])
              }
            />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor="max-rent" className="text-gray-600">
              Max Rent:
            </label>
            <input
              type="number"
              id="max-rent"
              className="px-3 py-2 border rounded w-full sm:w-auto"
              value={searchRange[1]}
              onChange={(e) =>
                setSearchRange([searchRange[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
      </div>

      {/* Apartments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredApartments.map((apartment) => (
          <div
            key={apartment._id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <img
              src={apartment.image}
              alt={`Apartment ${apartment.aptNo}`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
              Apartment No: {apartment.aptNo}
            </h3>
            <p className="text-sm text-gray-500">Floor: {apartment.floor}</p>
            <p className="text-sm text-gray-500">Block: {apartment.block}</p>
            <p className="text-base sm:text-lg font-bold text-gray-900">
              Rent: {apartment.rent} TK
            </p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={() => handleAgreement(apartment)}
            >
              Apply for Agreement
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={filteredApartments.length < apartmentsPerPage}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartment;
