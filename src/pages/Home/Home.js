import React from "react";
import Banner from "./Banner";
import BusinessSumary from "./BusinessSumary";
import Homeproduct from "./Homeproduct";
import HomeReview from "./HomeReview";

const Home = () => {
  return (
    <div className="bg-base-100">
      <Banner></Banner>
      <Homeproduct></Homeproduct>
      <BusinessSumary></BusinessSumary>
      <HomeReview></HomeReview>
    </div>
  );
};

export default Home;
