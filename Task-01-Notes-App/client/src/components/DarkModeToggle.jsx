import { useTheme } from "../theme/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function DarkModeToggle({ className = "", label = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full 
                 bg-gray-100 dark:bg-gray-700 
                 text-gray-700 dark:text-gray-200 
                 shadow-sm hover:shadow-md hover:bg-gray-200 
                 dark:hover:bg-gray-600 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <>
          <SunIcon className="w-5 h-5" />
          {label && <span className="text-sm font-medium">Light</span>}
        </>
      ) : (
        <>
          <MoonIcon className="w-5 h-5" />
          {label && <span className="text-sm font-medium">Dark</span>}
        </>
      )}
    </button>
  );
}
