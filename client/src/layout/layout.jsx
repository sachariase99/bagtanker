import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { useEffect } from "react";

// Mapping for static page titles
const pageTitles = {
  "/": "Home Page",
  "/home": "Home Page",
  "/login": "Login Page",
  "/register": "Register Page",
  "/user": "User Profile",
  "/contact": "Contact Us",
  "/news": "News Page",
  "/about": "About Us",
};

// Function to generate dynamic page titles
const getDynamicTitle = (pathname, params) => {
  if (pathname.startsWith("/news/")) {
    return `News Detail`;
  } 
  if (pathname.startsWith("/product/")) {
    return `Product Detail`;
  }
  if (pathname.startsWith("/")) {
    return `Product Category - ${params.productType || ''}`;
  }
  return "Default Title";
};

const Layout = () => {
  const location = useLocation(); // Get current location from react-router

  // Determine if the current page is the home page
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  // Extract path segments from the current URL
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const params = {
    id: decodeURIComponent(pathSegments[2]),
    productId: decodeURIComponent(pathSegments[2]),
    productType: decodeURIComponent(pathSegments[0]),
  };

  useEffect(() => {
    // Determine the title based on the current path
    const path = location.pathname;
    const title = pageTitles[path] || getDynamicTitle(path, params);
    document.title = title; // Set the document title
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header>
        <Header />
        {!isHomePage && <Nav />}
      </header>

      {/* Main content area */}
      <main className="flex-grow w-[1200px] m-auto bg-white">
        <Outlet /> {/* Render the matched child route component */}
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
