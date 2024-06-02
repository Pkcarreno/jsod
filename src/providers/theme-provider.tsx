import { createContext, useEffect, useState } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';

type Theme = 'dark' | 'light' | 'system';
type ThemeMode = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  themeMode: ThemeMode;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  themeMode: 'light',
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    let systemTheme = theme;

    if (theme === 'system') {
      systemTheme = isDarkMode ? 'dark' : 'light';
    }

    root.classList.add(systemTheme);
  }, [theme, isDarkMode]);

  useEffect(() => {
    if (theme === 'system') {
      setThemeMode(isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const value = {
    theme,
    themeMode,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
      if (theme === 'system') {
        setThemeMode(isDarkMode ? 'dark' : 'light');
      } else {
        setThemeMode(theme);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
