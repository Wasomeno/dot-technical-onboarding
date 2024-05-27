import React, { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <body
      style={{
        minHeight: "100vh",
        display: "flex",
        flex: "1 1 0%",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      {children}
    </body>
  );
};

export default AuthLayout;
