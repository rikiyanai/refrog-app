import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Theme, ThemeMode, themes, terminalTheme, ThemeName } from './constants';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  themeName: ThemeName;
  isDark: boolean;
  isDos: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName] = useState<ThemeName>('terminal');

  const theme = useMemo(() => {
    return terminalTheme;
  }, []);

  const value = useMemo(
    () => ({
      theme,
      mode: theme.mode,
      themeName,
      isDark: theme.mode === 'dark',
      isDos: theme.isDos,
    }),
    [theme, themeName]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { terminalTheme, themes };
