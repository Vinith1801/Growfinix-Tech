import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const baseButtonClasses = `
    text-sm font-medium
    transition-all duration-200
    rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
    px-3 py-1
  `;

  const linkButtonClasses = `
    ${baseButtonClasses}
    cursor-pointer
    hover:underline
  `;

  return (
    <nav
      aria-label="Primary navigation"
      className="
        fixed top-4 left-1/2 -translate-x-1/2
        w-[90%] max-w-4xl h-12
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        rounded-full shadow-md border border-gray-200 dark:border-gray-700
        flex items-center justify-between px-5 z-50
      "
    >
      <h1
        tabIndex={0}
        role="button"
        onClick={() => navigate("/")}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}
        className="
          text-sm font-semibold tracking-wide
          text-gray-900 dark:text-gray-100
          cursor-pointer select-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded
          transition-colors duration-200
          hover:text-blue-600 dark:hover:text-blue-400
        "
        aria-label="Navigate to home"
      >
        Notes
      </h1>

      <div className="flex items-center gap-3 md:gap-4">
        {!user ? (
          <>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={`${linkButtonClasses} text-gray-700 dark:text-gray-300`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className={`${linkButtonClasses} text-blue-600 dark:text-blue-400`}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleLogout}
              className={`${linkButtonClasses} text-red-600 dark:text-red-400`}
            >
              Logout
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className={`${linkButtonClasses} text-blue-600 dark:text-blue-400`}
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`${linkButtonClasses} text-blue-600 dark:text-blue-400`}
            >
              Home
            </button>
          </>
        )}

        <DarkModeToggle className="p-1 rounded-md" label />
      </div>
    </nav>
  );
}
