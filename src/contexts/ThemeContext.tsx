
import { createContext, useContext, ReactNode } from "react";

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
  // Always use light theme
  const theme: ThemeType = "light";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: () => {}, // No-op since we only support light theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
