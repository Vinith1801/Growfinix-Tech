import React from "react";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl h-12 
                    bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
                    rounded-full shadow-md border border-gray-200 dark:border-gray-700 
                    flex items-center justify-between px-4 z-50">
      <h1 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        MyApp
      </h1>
      <DarkModeToggle className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" label />
    </nav>
  );
}
