"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className="relative size-8 flex items-center justify-center rounded-full border"
      onClick={toggleTheme}
    >
      <Sun className="absolute size-4 rotate-0 scale-100 dark:scale-0 dark:-rotate-90 transition-all duration-300" />
      <Moon className="absolute size-4 rotate-90 scale-0 dark:scale-100 dark:rotate-0 transition-all duration-300" />
    </div>
  );
};

export default ModeToggle;
