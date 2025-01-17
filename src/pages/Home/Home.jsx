import React from "react";
import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import CouponSection from "./coupons/CoponSection";
import ApartmentLocationSection from "./LocationSection/ApartmentLocationSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <CouponSection></CouponSection>
      <ApartmentLocationSection></ApartmentLocationSection>
    </div>
  );
};

export default Home;
