import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import images from "../assets/bg-images"; // Import your background images array
import Home from "../pages/home";
import Logo from "../assets/logo.png";
import Burgermenu from "./burgermenu";
import Nyheder from "./nyheder";

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  // Determine if the current page is the home page
  const isHomePage = location.pathname === "/home";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle radio button change
  const handleRadioChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <header
      className={`relative p-8 ${
        isHomePage ? "h-screen max-h-screen" : "h-auto"
      }`}
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <Burgermenu />
      </nav>

      {isHomePage && (
        <div>
          <Nyheder />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center space-x-4">
              {images.map((_, index) => (
                <label key={index} className="relative">
                  <input
                    type="radio"
                    name="background"
                    checked={currentImageIndex === index}
                    onChange={() => handleRadioChange(index)}
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

      {isHomePage && <Home />}
    </header>
  );
};

export default Header;
