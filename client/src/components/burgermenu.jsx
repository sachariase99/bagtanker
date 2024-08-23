import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Burgermenu = () => {
  // State to manage whether the menu is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // Ref to track the menu DOM element
  const menuRef = useRef(null);
  
  // React Router hook to track the current location (route)
  const location = useLocation();
  
  // AuthContext to check if the user is logged in
  const { isLoggedIn } = useContext(AuthContext);

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu
      }
    };

    // Add event listener for mouse clicks
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Burger Icon (visible button for toggling the menu) */}
      <button
        onClick={toggleMenu}
        className="z-[1] text-white absolute right-12 top-24 -translate-y-1/2"
      >
        {/* Three horizontal lines representing the burger icon */}
        <span className="block w-8 mb-[6px] h-[4px] bg-white"></span>
        <span className="block w-8 mb-[6px] h-[4px] bg-white"></span>
        <span className="block w-8 h-[4px] bg-white"></span>
      </button>
      
      {/* Slide-in Menu */}
      <div
        ref={menuRef} // Reference to the menu for outside click detection
        className={`fixed top-0 right-0 h-full w-[425px] bg-gray-800 bg-opacity-90 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-[2]`}
      >
        <div className="p-4 relative z-20">
          {/* Close Button (X icon) */}
          <button
            onClick={toggleMenu}
            className="text-white absolute right-[80px] top-[94px]"
          >
            {/* Two intersecting lines forming an X to close the menu */}
            <span className="block w-8 h-[4px] bg-white absolute rotate-45"></span>
            <span className="block w-8 h-[4px] bg-white absolute -rotate-45"></span>
          </button>

          {/* Navigation Links */}
          <nav className="mt-36 ml-12 text-xl leading-loose text-white z-[9999]">
            <ul>
              {/* Each list item represents a navigational link */}
              <li className="mb-4">
                <Link to="/">Forside</Link>
              </li>
              <li className="mb-4">
                <Link to="/rundstykker">Produkter</Link>
              </li>
              <li className="mb-4">
                <Link to="/news">Nyheder</Link>
              </li>
              <li className="mb-4">
                <Link to="/contact">Kontakt</Link>
              </li>
              <li className="mb-4">
                {/* Conditional rendering based on the user's login status */}
                {isLoggedIn ? (
                  <Link to="/user">Profil</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Burgermenu;
