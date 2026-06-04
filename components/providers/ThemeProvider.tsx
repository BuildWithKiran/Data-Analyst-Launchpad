"use client";

import React, { createContext, useContext, useEffect, useState } from"react";

type Theme ="light" |"dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:"dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dal-theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ?"dark" :"light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial ==="dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev ==="dark" ?"light" :"dark";
      localStorage.setItem("dal-theme", next);
      document.documentElement.classList.toggle("dark", next ==="dark");
      return next;
    });
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme:"dark", toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
