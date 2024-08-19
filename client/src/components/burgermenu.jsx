import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext"; // Adjust the path according to your project structure

const Burgermenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext); // Get authentication state from context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Burger Icon */}
      <button
        onClick={toggleMenu}
        className="z-[1] text-white absolute right-12 top-24 -translate-y-1/2"
      >
        <span className="block w-8 mb-[6px] h-[4px] bg-white"></span>
        <span className="block w-8 mb-[6px] h-[4px] bg-white"></span>
        <span className="block w-8 h-[4px] bg-white"></span>
      </button>
      {/* Slide-in Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[425px] bg-gray-800 bg-opacity-90 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-[2]`}
      >
        <div className="p-4 relative">
          <button
            onClick={toggleMenu}
            className="text-white absolute right-[80px] top-[94px]"
          >
            <span className="block w-8 h-[4px] bg-white absolute rotate-45"></span>
            <span className="block w-8 h-[4px] bg-white absolute -rotate-45"></span>
          </button>
          <nav className="mt-36 ml-12 text-xl leading-loose text-white">
            <ul>
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
