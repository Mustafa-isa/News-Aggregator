'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get the current theme from localStorage or check the DOM
    const savedTheme = localStorage.getItem('theme') as Theme;
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    const currentTheme = savedTheme || (isDarkMode ? 'dark' : 'light');
    setTheme(currentTheme);
    
    // Ensure DOM is in sync
    if (currentTheme === 'dark' && !isDarkMode) {
      document.documentElement.classList.add('dark');
    } else if (currentTheme === 'light' && isDarkMode) {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  return {
    theme,
    toggleTheme,
    mounted
  };
} 