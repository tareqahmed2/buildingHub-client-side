import React from "react";

// Fake data imported as JSON
const buildingDetails = [
  {
    id: 1,
    image: "https://via.placeholder.com/400x300?text=Building+Exterior",
    title: "Modern Design",
    description:
      "Our building is designed with contemporary architecture that blends form and function seamlessly. From sleek, open layouts to energy-efficient features, every element is crafted for modern living.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x300?text=Building+Interior",
    title: "Spacious Interiors",
    description:
      "Inside our apartments, you’ll find spacious layouts with large windows, offering plenty of natural light. Each apartment is equipped with modern fixtures and finishes for a comfortable living experience.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x300?text=Building+Facilities",
    title: "Top-Notch Facilities",
    description:
      "Our building comes equipped with premium amenities including a fully equipped gym, rooftop terrace, 24/7 security, and dedicated parking spaces to provide you with an elevated living experience.",
  },
];

const AboutBuilding = () => {
  return (
    <section className="bg-blue-100 max-w-screen-xl mx-auto my-10 rounded-md py-10 px-2">
      <div className=" text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-8">
          About the Building
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Welcome to our building, where comfort meets convenience. Our
          apartments offer a range of modern amenities and are designed for your
          comfort and security. Read below to know more about our facility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {buildingDetails.map((building) => (
            <div
              key={building.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <img
                src={building.image}
                alt={building.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {building.title}
                </h3>
                <p className="text-gray-600">{building.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700">
            Whether you're looking for a cozy apartment or a space with modern
            amenities, our building is the perfect choice. Contact us today to
            learn more!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
