import React, { useState } from "react";
import { Link } from "react-router-dom";

const Burgermenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
                <Link to="/">Produkter</Link>
              </li>
              <li className="mb-4">
                <Link to="/">Nyheder</Link>
              </li>
              <li className="mb-4">
                <Link to="/">Kontakt</Link>
              </li>
              <li className="mb-4">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Burgermenu;
