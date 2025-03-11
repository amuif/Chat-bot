"use client";
import Image from "next/image";
import React from "react";
import mainBg from "@/public/signin-bg.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import SignIn from "./signin";
const MainSigningPage = () => {
  return (
    <div className="flex items-center mx-auto justify-center">
      <div className="flex flex-col gap-5 items-start justify-center h-screen ">
        <Tabs
          defaultValue="login"
          className="w-[400px] space-y-5 transition-all duration-500"
        >
          <TabsList>
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
