import { useTheme } from "../theme/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(theme === "dark");

  const handleToggle = () => {
    toggleTheme();
    setChecked(!checked);
  };

  return (
    <label className="inline-flex items-center relative cursor-pointer select-none">
  {/* Hidden checkbox */}
  <input
    type="checkbox"
    className="peer hidden"
    checked={checked}
    onChange={handleToggle}
  />

  {/* Slider background */}
  <div
    className={`
      relative w-[70px] h-[35px] rounded-full
      bg-white dark:bg-gray-800
      peer-checked:bg-gray-700
      shadow-sm transition-colors duration-300
      after:absolute after:content-[''] after:w-[25px] after:h-[25px]
      after:rounded-full after:top-[5px] after:left-[5px]
      after:bg-gradient-to-r from-yellow-400 to-orange-500
      peer-checked:after:from-gray-900 peer-checked:after:to-gray-900
      peer-checked:after:left-[40px]
      after:shadow-md after:transition-all after:duration-300
    `}
  ></div>

  {/* Sun Icon */}
  <SunIcon
    className={`
      absolute w-4 h-4 left-[8px] text-yellow-400
      peer-checked:text-gray-300
      transition-all duration-300
    `}
  />

  {/* Moon Icon */}
  <MoonIcon
    className={`
      absolute w-4 h-4 right-[8px] text-gray-700
      peer-checked:text-white
      transition-all duration-300
    `}
  />
</label>

  );
}
