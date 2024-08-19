import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav"; // Import the Nav component

const Layout = () => {
  const location = useLocation();

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header>
        <Header />
        {!isHomePage && <Nav />} {/* Conditionally render Nav */}
      </header>

      {/* Main content area */}
      <main className="flex-grow w-[1200px] m-auto">
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
