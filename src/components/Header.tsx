'use client';

import { useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  headerRef: React.RefObject<HTMLElement | null>;
}

export default function Header({ headerRef }: HeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const handleToggleClick = () => {
    console.log('Toggle clicked! Current theme:', theme);
    toggleTheme();
  };

  return (
    <header ref={headerRef} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News Aggregator</h1>
          </div>
          <div className="flex items-center space-x-4">
            {mounted && (
              <button 
                onClick={handleToggleClick}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg 
                    className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform duration-200 group-hover:rotate-12" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                    />
                  </svg>
                ) : (
                  <svg 
                    className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform duration-200 group-hover:rotate-12" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 