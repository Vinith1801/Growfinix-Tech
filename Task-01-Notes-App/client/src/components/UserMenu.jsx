// src/components/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 z-50"
        >
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <UserIcon className="w-4 h-4" />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
