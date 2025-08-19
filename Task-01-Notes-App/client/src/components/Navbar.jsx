// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeToggle from "./DarkModeToggle";
import UserMenu from "./UserMenu"; // 👈 new dropdown component
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-black/30 border-b border-white/20 dark:border-gray-800/40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Growfinix Notes
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-indigo-500 dark:hover:text-indigo-400`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="navbar-underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-500 rounded-full"
                />
              )}
            </Link>
          ))}

          {/* Auth / User */}
          <div className="flex items-center gap-4">
            {user ? (
              <UserMenu /> // 👈 avatar dropdown replaces Profile+Logout
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-xl border dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 shadow-md transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Dark mode toggle */}
          <DarkModeToggle />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {menuOpen ? (
              <XMarkIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pt-4 pb-6 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:text-indigo-500 dark:hover:text-indigo-400`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90 shadow-md transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 shadow-md transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Dark mode toggle */}
              <div className="mt-3">
                <DarkModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
