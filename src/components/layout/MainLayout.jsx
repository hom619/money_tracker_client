import React from "react";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div>
      <div className="layout">
        {/* NavBar */}
        <Header />
        <main className="main">
          {/* Body */}
          <Outlet />
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
