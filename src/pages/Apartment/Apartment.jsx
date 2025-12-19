import React, { useEffect, useMemo, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Apartment = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [apartments, setApartments] = useState([]);
  const [userFromCollection, setUserFromCollection] = useState({});
  const [searchRange, setSearchRange] = useState([0, 0]);
  const [currentPage, setCurrentPage] = useState(1);

  const apartmentsPerPage = 6;

  useEffect(() => {
    axiosPublic.get("/apartments").then((res) => {
      setApartments(res.data);
      setLoading(false);

      const rents = res.data.map((apt) => apt.rent);
      const minRent = Math.min(...rents);
      const maxRent = Math.max(...rents);
      setSearchRange([minRent, maxRent]);
    });

    if (user?.email) {
      axiosPublic.get(`/all-users/${user.email}`).then((res) => {
        setUserFromCollection(res.data);
      });
    }
  }, [axiosPublic, user]);

  const filteredApartments = useMemo(() => {
    return apartments.filter(
      (apt) => apt.rent >= searchRange[0] && apt.rent <= searchRange[1]
    );
  }, [apartments, searchRange]);

  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const paginatedApartments = filteredApartments.slice(
    indexOfFirstApartment,
    indexOfLastApartment
  );

  const handleMinChange = (value) => {
    const min = Number(value);
    setSearchRange(([_, max]) => [min <= max ? min : max, max]);
    setCurrentPage(1);
  };

  const handleMaxChange = (value) => {
    const max = Number(value);
    setSearchRange(([min]) => [min, max >= min ? max : min]);
    setCurrentPage(1);
  };

  const handleAgreement = (apartment) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userFromCollection?.Role === "admin") {
      Swal.fire("Admin Access", "Admins cannot apply for apartments.", "warning");
      return;
    }

    const currentDate = new Date().toLocaleDateString();

    axiosPublic
      .post("/agreement", {
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
        aptId: apartment._id,
        floor: apartment.floor,
        block: apartment.block,
        aptNo: apartment.aptNo,
        rent: apartment.rent,
        aptImg: apartment.image,
        status: "pending",
        dateApplied: currentDate,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            "Success",
            `Applied for Apartment No: ${apartment.aptNo}`,
            "success"
          );
        }
      })
      .catch(() => {
        Swal.fire("Error", "You already applied for this apartment.", "error");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <Helmet>
        <title>Buildinghub | Apartments</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-4">
        Available Apartments
      </h2>

      {/* Filter */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex gap-4">
          <input
            type="number"
            min="0"
            className="input input-bordered w-40"
            value={searchRange[0]}
            onChange={(e) => handleMinChange(e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="input input-bordered w-40"
            value={searchRange[1]}
            onChange={(e) => handleMaxChange(e.target.value)}
          />
        </div>

        <p className="text-sm opacity-70">
          Showing apartments from{" "}
          <span className="font-semibold">{searchRange[0]} TK</span> to{" "}
          <span className="font-semibold">{searchRange[1]} TK</span>
        </p>
      </div>

      {/* Apartments */}
      {paginatedApartments.length === 0 ? (
        <div className="text-center text-lg opacity-70 mt-10">
          No apartments found in this rent range
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedApartments.map((apartment) => (
            <div key={apartment._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={apartment.image}
                  alt={`Apartment ${apartment.aptNo}`}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">
                  Apartment No: {apartment.aptNo}
                </h3>
                <p>Floor: {apartment.floor}</p>
                <p>Block: {apartment.block}</p>
                <p className="font-bold text-lg">
                  Rent: {apartment.rent} TK
                </p>
                <button
                  className="btn btn-primary w-full mt-3"
                  onClick={() => handleAgreement(apartment)}
                >
                  Apply for Agreement
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          className="btn btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost">Page {currentPage}</span>
        <button
          className="btn btn-outline"
          disabled={indexOfLastApartment >= filteredApartments.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartment;
