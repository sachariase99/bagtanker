import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import images from "../assets/bg-images"; // Importing an array of background images
import Home from "../pages/home";
import Logo from "../assets/logo.png"; // Importing the logo image
import Burgermenu from "./burgermenu"; // Importing the Burgermenu component
import NewsHome from "./newsHome"; // Importing the NewsHome component

const Header = () => {
  // State to track the current background image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get the current location (URL path) using React Router's useLocation hook
  const location = useLocation();

  // Determine if the current page is the home page
  const isHomePage = location.pathname === "/home";

  // Effect to change the background image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10,000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Handle changes in radio buttons to manually change the background image
  const handleRadioChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <header
      className={`relative w-full ${isHomePage ? "min-h-screen" : "h-auto"}`}
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`, // Set the background image based on the current index
        backgroundSize: "cover", // Ensure the background image covers the entire element
        backgroundPosition: "center", // Center the background image
        backgroundAttachment: "fixed", // Fix the background image while scrolling
        transition: "background-image 1s ease-in-out", // Smooth transition between images
      }}
    >
      {/* Navigation bar */}
      <nav className="relative flex items-center justify-between p-8 z-50">
        {/* Link to the homepage with the logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        {/* Hamburger menu component */}
        <Burgermenu />
      </nav>

      {/* Conditionally render the following sections only on the home page */}
      {isHomePage && (
        <div className="relative z-10">
          {/* NewsHome component */}
          <NewsHome />

          {/* Radio buttons to manually switch background images */}
          <div className="fixed rotate-90 top-1/2 -right-[25rem] transform -translate-x-1/2 z-10">
            <div className="flex justify-center space-x-4">
              {images.map((_, index) => (
                <label key={index} className="relative z-[1] hidden lg:block">
                  <input
                    type="radio"
                    name="background"
                    checked={currentImageIndex === index}
                    onChange={() => handleRadioChange(index)} // Change image on radio button change
                    className="hidden"
                  />
                  <span
                    className={`inline-block w-8 h-8 rounded-full cursor-pointer ${
                      currentImageIndex === index
                        ? "bg-black border border-black"
                        : "bg-gray-400 border border-black hover:bg-gray-500"
                    }`}
                  ></span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render the Home component on the home page */}
      {isHomePage && <Home />}
    </header>
  );
};

export default Header;
