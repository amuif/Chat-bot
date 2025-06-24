"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/server-side-actions/get-user";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const { setUser } = useUserStore();
  async function handleLogout() {
    await logout();
    router.push("/");
    toast.message("Successfully logged out");
    setUser({ name: "", email: "" });
  }
  return (
    <div className="fixed w-full px-2 mt-4">
      <div className="flex w-full lg:w-[95%] mx-auto border-b justify-between items-center ">
        <div>
          <h5 className="text-xl lg:text-3xl font-bold">Axon</h5>
        </div>
        <div>
          {user.name ? (
            <div className="flex items-center gap-3  rounded-lg p-2 shadow-sm border-none">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-sm">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {user.name[0].toUpperCase()}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="!bg-gray-900">
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <Button onClick={() => router.push("/login")} className="mb-2">
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
