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
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigate = useNavigate();

  return (
    <section className="px-4 bg-base-100 text-base-content">
      <div className="max-w-screen-xl mx-auto py-5 px-2 mt-10 bg-base-200 rounded-xl">
        <div className="container mx-auto px-4">
          <Slider {...settings}>

            {/* Slide 1 */}
            <div className="relative">
              <div
                className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${g1})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 rounded-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  About Building Management System
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-white">
                  Effortlessly manage your building with a powerful and
                  user-friendly Building Management System (BMS).
                </p>
                <button
                  onClick={() => scrollToSection("building-management")}
                  className="btn btn-primary"
                >
                  Explore Now
                </button>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative">
              <div
                className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${g2})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 rounded-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Discover Exciting Coupon Deals
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-white">
                  Unlock amazing discounts and exclusive offers designed to
                  maximize your savings.
                </p>
                <button
                  onClick={() => scrollToSection("coupon-deals")}
                  className="btn btn-primary"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="relative">
              <div
                className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${g3})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 rounded-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Explore All Apartment Rooms
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-white">
                  Browse through all available apartment rooms tailored for
                  comfort.
                </p>
                <button
                  onClick={() => navigate("/apartment")}
                  className="btn btn-primary"
                >
                  View Rooms
                </button>
              </div>
            </div>

          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Banner;
