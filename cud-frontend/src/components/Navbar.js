import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customerContext from "../context/CustomerContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const navigate = useNavigate();
  const customerCtx = useContext(customerContext);

  const {loggedInCustomer} = customerCtx;
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleUserClick = () => {
    setShowUserDialog((prev) => !prev);
  };

  const handleNewCustomerClick = () =>{
    navigate("/newCustomer")
    setShowUserDialog(false);
  }
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
          <span className="ml-2 text-xl font-bold text-gray-800">
            CUD- A Fodder Brand
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
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

          {/* User Section */}
          <div
            className="relative flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex flex-col justify-center border-black border-2 rounded-lg p-2 cursor-pointer"
              onClick={handleUserClick}
            >
              <p className="font-bold">{loggedInCustomer?.name?loggedInCustomer.name:"Select Customer"}</p>
              <p className="text-gray-500 text-sm">{loggedInCustomer?.village?loggedInCustomer.village:""}</p>
            </div>
            {showUserDialog && (
              <div className="absolute min-w-20 bg-white border border-gray-300 shadow-lg rounded-lg p-4 mt-2 z-50" style={{ top: "100%" }}>
                <button
                  className="min-w-20 px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-500 rounded-lg text-left" 
                  onClick={handleNewCustomerClick}
                >
                  Order For New Customer
                </button>
              </div>
            )}
          </div>

          {/* Login Button */}
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button> */}
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
          <div className="flex flex-col">
            <button
              className="w-full px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-500 rounded-lg text-left" style={{ top: "100%" }}
              onClick={handleNewCustomerClick}
            >
              Order For New Customer
            </button>
          </div>
          {/* <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
