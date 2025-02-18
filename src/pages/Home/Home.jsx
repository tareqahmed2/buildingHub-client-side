import React from "react";
import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import CouponSection from "./coupons/CoponSection";
import ApartmentLocationSection from "./LocationSection/ApartmentLocationSection";
import { Helmet } from "react-helmet-async";
import Faq from "./FAQ/Faq";
import ContactUs from "./ContactUs/ContactUs";
import TenantReviews from "./Tenant/TenantReviews";
import NewsEvents from "./NewsEvent/NewsEvents";

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
      <TenantReviews></TenantReviews>
      <NewsEvents></NewsEvents>
      <Faq></Faq>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
