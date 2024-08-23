import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { useEffect } from "react";

const pageTitles = {
  "/": "Home Page",
  "/home": "Home Page",
  "/login": "Login Page",
  "/register": "Register Page",
  "/user": "User Profile",
  "/contact": "Contact Us",
  "/news": "News Page",
  "/about": "About Us",
  // Define other static routes
};

const getDynamicTitle = (pathname, params) => {
  if (pathname.startsWith("/news/")) {
    return `News Detail`;
  } 
  if (pathname.startsWith("/product/")) {
    return `Product Detail`;
  }
  if (pathname.startsWith("/")) {
    return `Product Category - ${params.productType || ''}`; // Safeguard against undefined
  }
  return "Default Title";
};

const Layout = () => {
  const location = useLocation();

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  // Extract and decode route parameters from the pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const params = {
    id: decodeURIComponent(pathSegments[2]), // For /news/:id
    productId: decodeURIComponent(pathSegments[2]), // For /product/:productId
    productType: decodeURIComponent(pathSegments[0]), // For /:productType
  };

  // Set page title based on the current route
  useEffect(() => {
    const path = location.pathname;
    const title = pageTitles[path] || getDynamicTitle(path, params);
    document.title = title;
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header>
        <Header />
        {!isHomePage && <Nav />} {/* Conditionally render Nav */}
      </header>

      {/* Main content area */}
      <main className="flex-grow w-[1200px] m-auto bg-white">
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
