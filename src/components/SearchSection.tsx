'use client';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  searchSectionRef: React.RefObject<HTMLElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function SearchSection({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  searchSectionRef,
  searchInputRef
}: SearchSectionProps) {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  const sectionClasses = theme === 'dark'
    ? " backdrop-blur-sm "
    : " backdrop-blur-sm ";

  const inputClasses = theme === 'dark'
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500";

  return (
    <section 
      ref={searchSectionRef}
      className={`py-6 transition-all duration-300  ${sectionClasses}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              placeholder={t('common.searchPlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${inputClasses}`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none rtl:right-auto rtl:left-0 rtl:pr-0 rtl:pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 