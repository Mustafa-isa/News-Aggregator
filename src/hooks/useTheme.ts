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
    console.log('Initial theme setup:', { savedTheme, isDarkMode, currentTheme });
    setTheme(currentTheme);
    
    // Ensure DOM is in sync
    if (currentTheme === 'dark' && !isDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to DOM');
    } else if (currentTheme === 'light' && isDarkMode) {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from DOM');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      console.log('Added dark class - should see dark theme now');
    } else {
      root.classList.remove('dark');
      console.log('Removed dark class - should see light theme now');
    }
    
    // Force a re-render and check the result
    setTimeout(() => {
      console.log('Current DOM classes:', root.className);
      console.log('Current theme state:', newTheme);
      console.log('Is dark mode active?', root.classList.contains('dark'));
    }, 100);
  };

  return {
    theme,
    toggleTheme,
    mounted
  };
} 