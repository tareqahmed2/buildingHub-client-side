import React from "react";
import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import CouponSection from "./coupons/CoponSection";
import ApartmentLocationSection from "./LocationSection/ApartmentLocationSection";
import { Helmet } from "react-helmet-async";
import Faq from "./FAQ/Faq";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Buildinghub | Home</title>
      </Helmet>
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <CouponSection></CouponSection>
      <ApartmentLocationSection></ApartmentLocationSection>
      <Faq></Faq>
    </div>
  );
};

export default Home;
