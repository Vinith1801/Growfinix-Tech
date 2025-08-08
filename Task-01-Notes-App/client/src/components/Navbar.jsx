import React from "react";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md">
      <h1 className="text-lg font-bold">MyApp</h1>
      <div className="flex items-center gap-4">
        <DarkModeToggle
          className="px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          label
        />
      </div>
    </nav>
  );
}
