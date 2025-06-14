import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                NovaCare
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {/* Navigation Links */}
            <NavLink to="/" isActive={isActive}>
              Home
            </NavLink>
            <NavLink to="/doctors" isActive={isActive}>
              Doctors
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/patients" isActive={isActive}>
                  Patients
                </NavLink>
                <NavLink to="/appointments" isActive={isActive}>
                  Appointments
                </NavLink>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg text-sm font-medium 
                hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium 
                  transition-colors hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium 
                  hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 
              transition-transform duration-200 transform hover:scale-110"
            >
              {/* ... existing SVG code ... */}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md rounded-lg shadow-lg mt-2">
              {/* ... existing mobile menu items ... */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper component for navigation links
const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive(to)
        ? "text-blue-600 bg-blue-50 shadow-sm transform scale-105"
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
