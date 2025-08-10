import React from "react";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 
                    w-[90%] max-w-4xl h-10 
                    bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
                    rounded-full shadow-sm border border-gray-200 dark:border-gray-700 
                    flex items-center justify-between px-4 z-50">
      <h1 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        Notes
      </h1>
      <DarkModeToggle className="p-1" label />
    </nav>
  );
}
