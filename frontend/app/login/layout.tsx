import React from "react";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="w-full px-5 lg:px-0">{children}</div>;
};

export default LoginLayout;
