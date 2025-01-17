import React, { useState } from "react";

// Dummy apartment data
const apartments = [
  {
    id: 1,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 1,
    block: "A",
    aptNo: "101",
    rent: 1500,
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 2,
    block: "B",
    aptNo: "202",
    rent: 2000,
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 1,
    block: "C",
    aptNo: "103",
    rent: 1800,
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 3,
    block: "A",
    aptNo: "301",
    rent: 2500,
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 2,
    block: "B",
    aptNo: "204",
    rent: 2200,
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 1,
    block: "C",
    aptNo: "105",
    rent: 1600,
  },
  {
    id: 7,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 4,
    block: "A",
    aptNo: "401",
    rent: 2700,
  },
  {
    id: 8,
    image: "https://i.ibb.co.com/cttNZwD/sega.jpg",
    floor: 3,
    block: "B",
    aptNo: "305",
    rent: 2400,
  },
];

const Apartment = () => {
  const [searchRange, setSearchRange] = useState([1000, 3000]); // rent range state
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

  const handleAgreement = (apartment) => {
    // Logic for storing agreement in the database
    alert(`Applied for Apartment No: ${apartment.aptNo}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container max-w-screen-xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Available Apartments
        </h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <label htmlFor="min-rent" className="text-gray-600">
            Min Rent:
          </label>
          <input
            type="number"
            id="min-rent"
            className="px-3 py-2 border rounded"
            value={searchRange[0]}
            onChange={(e) =>
              setSearchRange([Number(e.target.value), searchRange[1]])
            }
          />
          <label htmlFor="max-rent" className="text-gray-600">
            Max Rent:
          </label>
          <input
            type="number"
            id="max-rent"
            className="px-3 py-2 border rounded"
            value={searchRange[1]}
            onChange={(e) =>
              setSearchRange([searchRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Apartments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredApartments.map((apartment) => (
          <div
            key={apartment.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <img
              src={apartment.image}
              alt={`Apartment ${apartment.aptNo}`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              Apartment No: {apartment.aptNo}
            </h3>
            <p className="text-sm text-gray-500">Floor: {apartment.floor}</p>
            <p className="text-sm text-gray-500">Block: {apartment.block}</p>
            <p className="text-lg font-bold text-gray-900">
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
      <div className="flex justify-center mt-6">
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
