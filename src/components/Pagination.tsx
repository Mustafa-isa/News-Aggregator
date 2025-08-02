'use client';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { PaginationInfo } from '../types/api';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({ pagination, onPageChange, loading = false }: PaginationProps) {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  console.log('Pagination component received:', pagination);

  if (!pagination || pagination.totalPages <= 1) {
    console.log('Pagination component returning null because:', { 
      hasPagination: !!pagination, 
      totalPages: pagination?.totalPages 
    });
    return null;
  }

  const containerClasses = theme === 'dark'
    ? "flex items-center justify-center space-x-1 sm:space-x-2 rtl:space-x-reverse py-8"
    : "flex items-center justify-center space-x-1 sm:space-x-2 rtl:space-x-reverse py-8";

  const buttonClasses = theme === 'dark'
    ? "px-3 sm:px-4 py-2.5 rounded-lg border transition-all duration-300 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border-gray-600 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
    : "px-3 sm:px-4 py-2.5 rounded-lg border transition-all duration-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95";

  const activeButtonClasses = theme === 'dark'
    ? "px-3 sm:px-4 py-2.5 rounded-lg border transition-all duration-300 bg-blue-600 text-white border-blue-600 text-sm font-medium shadow-md ring-2 ring-blue-500/20"
    : "px-3 sm:px-4 py-2.5 rounded-lg border transition-all duration-300 bg-blue-600 text-white border-blue-600 text-sm font-medium shadow-md ring-2 ring-blue-500/20";

  const generatePageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagination;
    
    // Always show first page
    pages.push(1);
    
    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    if (start > 2) {
      pages.push('...');
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="w-full">
      {/* Enhanced Pagination Container */}
      <div className={`${containerClasses} relative`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Previous Button with Enhanced Icon */}
        <button
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage || loading}
          className={`${buttonClasses} ${!pagination.hasPrevPage ? 'opacity-30' : ''}`}
          title={t('pagination.previous')}
        >
          <svg className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers with Enhanced Styling */}
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={typeof page !== 'number' || loading}
              className={
                typeof page === 'number' && page === pagination.currentPage
                  ? activeButtonClasses
                  : typeof page === 'number'
                  ? buttonClasses
                  : "px-3 sm:px-4 py-2.5 text-gray-500 text-sm font-medium cursor-default"
              }
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button with Enhanced Icon */}
        <button
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage || loading}
          className={`${buttonClasses} ${!pagination.hasNextPage ? 'opacity-30' : ''}`}
          title={t('pagination.next')}
        >
          <svg className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Enhanced Page Info with Progress Bar */}
      <div className="text-center space-y-2">
        <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('pagination.showing')} {((pagination.currentPage - 1) * pagination.pageSize) + 1} - {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalArticles)} {t('pagination.of')} {pagination.totalArticles}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className={`w-full h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className={`h-full rounded-full bg-blue-500 transition-all duration-500 ease-out`}
              style={{ 
                width: `${(pagination.currentPage / pagination.totalPages) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Jump to First/Last */}
      <div className="flex justify-center mt-4 space-x-2 rtl:space-x-reverse">
        <button
          onClick={() => onPageChange(1)}
          disabled={pagination.currentPage === 1 || loading}
          className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
            theme === 'dark' 
              ? 'text-gray-400 hover:text-gray-300 disabled:opacity-30' 
              : 'text-gray-500 hover:text-gray-700 disabled:opacity-30'
          }`}
        >
          {t('pagination.first')}
        </button>
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>|</span>
        <button
          onClick={() => onPageChange(pagination.totalPages)}
          disabled={pagination.currentPage === pagination.totalPages || loading}
          className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
            theme === 'dark' 
              ? 'text-gray-400 hover:text-gray-300 disabled:opacity-30' 
              : 'text-gray-500 hover:text-gray-700 disabled:opacity-30'
          }`}
        >
          {t('pagination.last')}
        </button>
      </div>
    </div>
  );
} 