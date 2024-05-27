import React, { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flex: "1 1 0%",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
