import { UserProvider } from "@/context/userContext";
import React from "react";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full px-5 lg:px-0">
      <UserProvider>{children}</UserProvider>
    </div>
  );
};

export default LoginLayout;
