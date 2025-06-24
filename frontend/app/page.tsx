"use client";

import LandingComponent from "@/components/landing";
import Navbar from "@/components/nav-bar";
import React from "react";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2">
      <Navbar />
      <LandingComponent />
    </div>
  );
};
export default Home;
