"use client";

import { useTheme } from "next-themes";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function Loader() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        currentTheme === "dark"
          ? "bg-gradient-to-b from-black to-neutral-900"
          : "bg-gradient-to-b from-white to-blue-50/30"
      }`}
    >
      <ClipLoader color="#2563EB" size={60} />
    </div>
  );
}
