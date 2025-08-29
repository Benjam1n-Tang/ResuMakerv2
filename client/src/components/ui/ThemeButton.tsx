"use client";

// import { useThemeToggler } from "@/hooks/useThemeToggler";
import { useTheme } from "@/context/themeContext";

const ThemeButton = () => {
   const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => toggleTheme()}
      className="w-5 h-5 border-2 rounded-sm bg-light-fg dark:bg-dark-fg border-light-bd dark:border-dark-bd text-light-t dark:text-dark-t hover:bg-light-fg/10 hover:dark:bg-dark-fg/10 flex items-center justify-center"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.75em"
          height="1.75em"
          viewBox="0 0 24 24"
        >
          <path
            className="fill-dark-t"
            d="m5.64 17l-.71.71a1 1 0 0 0 0 1.41a1 1 0 0 0 1.41 0l.71-.71A1 1 0 0 0 5.64 17M5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1m7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1M5.64 7.05a1 1 0 0 0 .7.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41Zm12 .29a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.64.71a1 1 0 0 0 0 1.41a1 1 0 0 0 .66.29ZM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m-9 8a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1m6.36-2A1 1 0 0 0 17 18.36l.71.71a1 1 0 0 0 1.41 0a1 1 0 0 0 0-1.41ZM12 6.5a5.5 5.5 0 1 0 5.5 5.5A5.51 5.51 0 0 0 12 6.5m0 9a3.5 3.5 0 1 1 3.5-3.5a3.5 3.5 0 0 1-3.5 3.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.75em"
          height="1.75em"
          viewBox="0 0 24 24"
        >
          <path
            className="fill-light-t"
            d="M12.3 22h-.1a10.3 10.3 0 0 1-7.34-3.15a10.46 10.46 0 0 1-.26-14a10.1 10.1 0 0 1 4-2.74a1 1 0 0 1 1.06.22a1 1 0 0 1 .24 1a8.4 8.4 0 0 0 1.94 8.81a8.47 8.47 0 0 0 8.83 1.94a1 1 0 0 1 1.27 1.29A10.2 10.2 0 0 1 19.6 19a10.28 10.28 0 0 1-7.3 3"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeButton;
