import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h5>Tulip Chatbot</h5>
      </div>
      <div className="flex gap-4">
        <div>
          <ModeToggle />
        </div>
        <div>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
