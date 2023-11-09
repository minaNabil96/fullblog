import React from "react";
import Landing from "../components/mainRoute/landingCom/Landing";
import LandingNews from "../components/mainRoute/landingCom/LandingNews";
import LandingSections from "../components/mainRoute/landingCom/LandingSections";
const HomePage = () => {
  return (
    <div style={{ direction: "rtl" }}>
      <Landing />
      <LandingNews />
      <LandingSections />
    </div>
  );
};

export default HomePage;
