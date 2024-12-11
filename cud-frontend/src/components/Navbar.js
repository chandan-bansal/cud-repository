import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://clipart-library.com/img/1413172.png"
            alt="logo"
            className="h-10 w-10"
          />
          <span className="ml-2 text-xl font-bold text-gray-800">CUD- A Fodder Brand</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Our Products
          </Link>
          <Link to="/customizedFodder" className="text-gray-700 hover:text-blue-500" onClick={toggleMenu}>
            Customized Fodder
          </Link>
          <Link to="/orderHistory" className="text-gray-700 hover:text-blue-500">
            Order History
          </Link>
          <Link to="/userHistory" className="text-gray-700 hover:text-blue-500">
            User History
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-500">
            Cart
          </Link>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden flex items-center text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md absolute top-full left-0 right-0 py-4 flex flex-col space-y-2 px-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Our Products
          </Link>
          <Link to="/customizedFodder" className="text-gray-700 hover:text-blue-500">
            Customized Fodder
          </Link>
          <Link to="/orderHistory" className="text-gray-700 hover:text-blue-500">
            Order History
          </Link>
          <Link to="/userHistory" className="text-gray-700 hover:text-blue-500">
            User History
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-500">
            Cart
          </Link>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
