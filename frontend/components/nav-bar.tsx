"use client"
import React,{useState} from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full pr-3">
      <div>
        <h5>Axon</h5>
      </div>
      <div className="flex gap-4">
        <div>
          <ModeToggle />
        </div>
        <div>
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;


