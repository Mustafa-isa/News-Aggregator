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
    ? "flex items-center justify-center space-x-2 rtl:space-x-reverse py-8"
    : "flex items-center justify-center space-x-2 rtl:space-x-reverse py-8";

  const buttonClasses = theme === 'dark'
    ? "px-3 py-2 rounded-lg border transition-all duration-200 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
    : "px-3 py-2 rounded-lg border transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const activeButtonClasses = theme === 'dark'
    ? "px-3 py-2 rounded-lg border transition-all duration-200 bg-blue-600 text-white border-blue-600"
    : "px-3 py-2 rounded-lg border transition-all duration-200 bg-blue-600 text-white border-blue-600";

  const generatePageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagination;
    
    // Always show first page
    pages.push(1);
    
    // Show pages around current page
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    
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
    <div className={containerClasses} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrevPage || loading}
        className={buttonClasses}
        title={t('pagination.previous')}
      >
        <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
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
              : "px-3 py-2 text-gray-500"
          }
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNextPage || loading}
        className={buttonClasses}
        title={t('pagination.next')}
      >
        <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Page Info */}
      <div className={`ml-4 rtl:mr-4 rtl:ml-0 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {t('pagination.showing')} {((pagination.currentPage - 1) * pagination.pageSize) + 1} - {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalArticles)} {t('pagination.of')} {pagination.totalArticles}
      </div>
    </div>
  );
} 