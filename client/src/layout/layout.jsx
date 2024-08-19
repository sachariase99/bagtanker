import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

const Layout = () => {
  const location = useLocation();

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/home";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header className="sticky top-0 z-50">
        <Header />
      </header>

      {/* Main content area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      {!isHomePage && (
        <footer className="mt-auto">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
