"use client";

import LandingComponent from "@/components/landing";
import Navbar from "@/components/nav-bar";
import { UserProvider } from "@/context/userContext";
import React from "react";

const Home = () => {
  return (
    <div className="h-full w-full">
      <UserProvider>
        <Navbar />
        <LandingComponent />
      </UserProvider>
    </div>
  );
};
export default Home;
