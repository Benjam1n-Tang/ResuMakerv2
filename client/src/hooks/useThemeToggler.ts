"use client";

import { useEffect, useState } from "react";

export const getTheme = () => {
}

export const useThemeToggler = () => {
  const [theme, setTheme] = useState<null | "dark" | "light">(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const html = document.querySelector("html")!;
    html.classList.remove("dark", "light");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      html.classList.add(savedTheme);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html")!;
    html.classList.remove("dark", "light");
    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return { theme, toggleTheme };
};
