import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  User,
  LogOut,
  Calendar,
  Stethoscope,
  Globe,
  Home,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? darkMode
              ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-700/50"
              : "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50"
            : darkMode
            ? "bg-gray-900/80 backdrop-blur-lg"
            : "bg-white/80 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-3 group"
                onClick={closeMobileMenu}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700`}
                  >
                    NovaCare
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } -mt-1`}
                  >
                    Healthcare Excellence
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              <NavLink
                to="/"
                isActive={isActive}
                darkMode={darkMode}
                icon={Home}
              >
                Home
              </NavLink>
              <NavLink
                to="/doctors"
                isActive={isActive}
                darkMode={darkMode}
                icon={Stethoscope}
              >
                Doctors
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/contact"
                    isActive={isActive}
                    darkMode={darkMode}
                    icon={Globe}
                  >
                    International Enquiry
                  </NavLink>
                  <NavLink
                    to="/appointments"
                    isActive={isActive}
                    darkMode={darkMode}
                    icon={Calendar}
                  >
                    Book Appointment
                  </NavLink>
                </>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {isAuthenticated ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{user?.name || "User"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl transition-all duration-300 transform origin-top-right ${
                      showUserMenu
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    } ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                          darkMode
                            ? "text-red-400 hover:bg-gray-700"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="relative px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-100 text-gray-600"
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-4 pt-4 pb-6 space-y-2 ${
              darkMode
                ? "bg-gray-900/98 backdrop-blur-xl border-t border-gray-700/50"
                : "bg-white/98 backdrop-blur-xl border-t border-gray-200/50"
            }`}
          >
            <MobileNavLink
              to="/"
              isActive={isActive}
              darkMode={darkMode}
              icon={Home}
              onClick={closeMobileMenu}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/doctors"
              isActive={isActive}
              darkMode={darkMode}
              icon={Stethoscope}
              onClick={closeMobileMenu}
            >
              Doctors
            </MobileNavLink>
            {isAuthenticated && (
              <>
                <MobileNavLink
                  to="/contact"
                  isActive={isActive}
                  darkMode={darkMode}
                  icon={Globe}
                  onClick={closeMobileMenu}
                >
                  International Enquiry
                </MobileNavLink>
                <MobileNavLink
                  to="/appointments"
                  isActive={isActive}
                  darkMode={darkMode}
                  icon={Calendar}
                  onClick={closeMobileMenu}
                >
                  Book Appointment
                </MobileNavLink>
              </>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                    darkMode
                      ? "text-red-400 hover:bg-gray-800"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className={`block w-full px-4 py-3 rounded-xl text-center font-semibold transition-all duration-300 ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

const NavLink = ({ to, children, isActive, darkMode, icon: Icon }) => (
  <Link
    to={to}
    className={`group flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
      isActive(to)
        ? darkMode
          ? "text-blue-400 bg-blue-900/30 shadow-lg scale-105"
          : "text-blue-600 bg-blue-50 shadow-lg scale-105"
        : darkMode
        ? "text-gray-300 hover:text-white hover:bg-gray-800"
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
  >
    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({
  to,
  children,
  isActive,
  darkMode,
  icon: Icon,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
      isActive(to)
        ? darkMode
          ? "text-blue-400 bg-blue-900/30"
          : "text-blue-600 bg-blue-50"
        : darkMode
        ? "text-gray-300 hover:text-white hover:bg-gray-800"
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{children}</span>
  </Link>
);

export default Navbar;
