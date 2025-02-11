import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  applyTheme: (newTheme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (
      (localStorage.getItem('theme') as 'light' | 'dark' | 'system') ||
      (prefersDark ? 'dark' : 'light')
    );
  });

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle('dark', e.matches);
      };

      document.documentElement.classList.toggle('dark', mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      localStorage.setItem('theme', theme);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    return () => {};
  }, [theme]);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const contextValue = useMemo(
    () => ({
      theme,
      applyTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
