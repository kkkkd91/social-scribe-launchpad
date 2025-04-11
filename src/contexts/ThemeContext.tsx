
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeType = "light";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    // Always set light theme regardless of preferences
    setTheme("light");
    applyTheme("light");
  }, []);

  const applyTheme = (newTheme: ThemeType) => {
    const root = window.document.documentElement;
    // Always ensure dark mode is removed
    root.classList.remove("dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (newTheme) => {
          setTheme(newTheme);
          localStorage.setItem("socialScribe_theme", newTheme);
          applyTheme(newTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
