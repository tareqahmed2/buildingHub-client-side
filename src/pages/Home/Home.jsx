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
    <div className="bg-base-100 text-base-content">
      <Helmet>
        <title>Buildinghub | Home</title>
      </Helmet>

      <Banner />
      <AboutBuilding />
      <CouponSection />
      <ApartmentLocationSection />
      <TenantReviews />
      <NewsEvents />
      <Faq />
      <ContactUs />
    </div>
  );
};

export default Home;
