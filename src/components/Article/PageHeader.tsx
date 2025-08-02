'use client';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';

export default function PageHeader() {
  const { theme } = useTheme();

  const headerClasses = theme === 'dark'
    ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50"
    : "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50";

  const headerTitleClasses = theme === 'dark'
    ? "text-2xl font-bold text-white"
    : "text-2xl font-bold text-gray-900";

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className={headerTitleClasses}>News Aggregator</h1>
          </Link>
        </div>
      </div>
    </header>
  );
} 