import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import g1 from "../../../assets/banner/banner1.jpg";
import g2 from "../../../assets/banner/banner2.jpg";
import g3 from "../../../assets/banner/banner3.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-5 px-2 mt-10 bg-gray-800">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div className="relative">
            <div
              className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${g1})` }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                About Building Management System
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
                Effortlessly manage your building with a powerful and
                user-friendly Building Management System (BMS). Simplify
                operations with features tailored for single-building
                management.
              </p>
              <button
                onClick={() => scrollToSection("building-management")}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Explore Now
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <div
              className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${g2})` }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Discover Exciting Coupon Deals
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
                Unlock amazing discounts and exclusive offers designed to
                maximize your savings and shopping experience.
              </p>
              <button
                onClick={() => scrollToSection("coupon-deals")}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <div
              className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${g3})` }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Explore All Apartment Rooms
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
                Browse through all available apartment rooms, each tailored for
                comfort and designed to meet your needs.
              </p>
              <button
                onClick={() => navigate("/apartment")}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View Rooms
              </button>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
