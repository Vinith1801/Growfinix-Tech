import { useTheme } from "../theme/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const checked = theme === "dark";

  return (
    <label
      className="relative inline-flex items-center cursor-pointer select-none"
      aria-label="Toggle dark mode"
    >
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={toggleTheme}
      />

      {/* Slider track */}
      <div
        className={`
          relative w-[70px] h-[35px] rounded-full shadow-sm
          bg-white dark:bg-gray-800
          peer-checked:bg-gray-700
          transition-colors duration-300
          after:absolute after:content-[''] after:w-[25px] after:h-[25px]
          after:rounded-full after:top-[5px] after:left-[5px]
          after:bg-gradient-to-r after:from-yellow-400 after:to-orange-500
          peer-checked:after:from-gray-900 peer-checked:after:to-gray-900
          peer-checked:after:left-[40px]
          after:shadow-md after:transition-all after:duration-300
        `}
      ></div>

      {/* Sun Icon */}
      <SunIcon
        className={`
          absolute w-4 h-4 left-[8px]
          text-yellow-400 peer-checked:text-gray-300
          transition-colors duration-300
        `}
      />

      {/* Moon Icon */}
      <MoonIcon
        className={`
          absolute w-4 h-4 right-[8px]
          text-gray-700 peer-checked:text-white
          transition-colors duration-300
        `}
      />
    </label>
  );
}
