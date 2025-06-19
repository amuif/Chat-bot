"use client";
import { useUser } from "@/context/userContext";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const router = useRouter();

  return (
    <div className="fixed w-full px-2 mt-4">
      <div className="flex  w-full lg:w-[95%] mx-auto border-b  justify-between items-center">
        <div>
          <h5 className="text-xl lg:text-3xl font-bold">Axon</h5>
        </div>
        <div>
          {user.name ? (
            <div className=" h-10 w-10 rounded-full bg-white/40">
              <p className="text-base item-center justify-center rounded-full p-3 h-full w-full">
                {user.name[0] || "C"}
              </p>
            </div>
          ) : (
            <div>
              <Button onClick={() => router.push("/login")}>Login</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
