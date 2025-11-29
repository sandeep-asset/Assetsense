import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfully");
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#1c2735] shadow-lg sticky top-0 z-52">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-lg flex items-center justify-center">
              <img
                className="w-35 h-19 sm:w-28 sm:h-14 md:w-40 md:h-20 object-contain"
                src="/Assetsensefinallogo.webp"
                alt="Logo"
              />
            </div>
          </Link>

          {/* Hamburger Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none relative z-53"
            >
              {isOpen ? (
                <HiX className="w-7 h-7 text-white" />
              ) : (
                <HiMenu className="w-7 h-7 text-white" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-100 hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-gray-100 hover:text-blue-300 transition-colors font-medium"
            >
              Services
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-gray-100 hover:text-blue-300 transition-colors font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <span className="text-gray-100">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 text-white cursor-pointer hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-100 hover:text-blue-300 transition-colors font-medium"
                >
                  Login
                </Link>
                {/* <Link
                  to="/register"
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors font-medium"
                >
                  Register
                </Link> */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-500 flex flex-col justify-center items-center z-50">
          <div className="flex flex-col space-y-6 text-center">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-300 transition-colors font-medium text-lg"
            >
              Home
            </Link>
            <Link
              to="/search"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-300 transition-colors font-medium text-lg"
            >
              Services
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-blue-300 transition-colors font-medium text-lg"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <span className="text-white font-medium text-lg">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-300 transition-colors font-medium text-lg"
                >
                  Login
                </Link>
                {/* <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                >
                  Register
                </Link> */}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
