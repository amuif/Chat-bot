"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import SignIn from "./signin";
const MainSigningPage = () => {
  return (
    <div className="flex items-center  mx-auto justify-center h-screen w-full">
      <div className="flex flex-col gap-5 px-5 lg:px-0 dark:bg-[#171717] items-center m-auto justify-center h-full w-full ">
        <Tabs
          defaultValue="login"
          className=" w-full  h-fit border border-slate-700 p-5 rounded-md space-y-5 transition-all duration-500"
        >
          <TabsList className="!px-0">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signin">Signin</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainSigningPage;
