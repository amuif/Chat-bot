import MainSigningPage from "@/components/login/main";
import { UserProvider } from "@/context/userContext";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <UserProvider>
        <MainSigningPage />
      </UserProvider>
    </div>
  );
};

export default LoginPage;
