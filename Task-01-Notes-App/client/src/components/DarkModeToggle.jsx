import { useTheme } from "../theme/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-2 rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white hover:opacity-80 transition"
    >
      {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
