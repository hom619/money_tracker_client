import React from "react";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div>
      {/* NavBar */}
      <Header />
      {/* Body */}
      <main className="main">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
