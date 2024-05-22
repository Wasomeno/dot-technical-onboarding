import { MainNavigation } from "@/components/main-navigation";
import React, { PropsWithChildren } from "react";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
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
      <MainNavigation />
      {children}
    </body>
  );
};

export default MainLayout;
