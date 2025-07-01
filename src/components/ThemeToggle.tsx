import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`w-16 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        } flex items-center justify-center`}
      >
        {isDark ? (
          <FaMoon className="text-gray-600 text-sm" />
        ) : (
          <FaSun className="text-yellow-400 text-sm" />
        )}
      </div>
    </button>
  );
}
