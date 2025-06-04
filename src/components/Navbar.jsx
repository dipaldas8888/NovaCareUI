import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-gray-800">NovaCare</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/doctors")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Doctors
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/patients"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/patients")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Patients
                </Link>
                <Link
                  to="/appointments"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/appointments")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Appointments
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/doctors")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Doctors
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/patients"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/patients")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Patients
                  </Link>
                  <Link
                    to="/appointments"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/appointments")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Appointments
                  </Link>
                </>
              )}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
