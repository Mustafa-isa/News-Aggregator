'use client';

import { useRef } from 'react';
import NewsCard from './NewsCard';
import { BaseNewsArticle } from '../types/api';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from './LoadingSpinner';

interface NewsGridProps {
  articles: BaseNewsArticle[];
  loading: boolean;
  onCardHover: (articleId: string) => void;
  onCardLeave: () => void;
  formatDate: (dateString: string) => string;
  cardsRef: React.RefObject<HTMLDivElement | null>;
}

export default function NewsGrid({
  articles,
  loading,
  onCardHover,
  onCardLeave,
  formatDate,
  cardsRef
}: NewsGridProps) {
  const { theme } = useTheme();

  const emptyStateClasses = theme === 'dark'
    ? "text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg"
    : "text-center py-12 bg-white/80 rounded-xl border border-gray-100 shadow-lg";

  const emptyStateIconClasses = theme === 'dark'
    ? "text-gray-500 text-6xl mb-4"
    : "text-gray-400 text-6xl mb-4";

  const emptyStateTitleClasses = theme === 'dark'
    ? "text-xl font-semibold text-white mb-2"
    : "text-xl font-semibold text-gray-900 mb-2";

  const emptyStateTextClasses = theme === 'dark'
    ? "text-gray-300"
    : "text-gray-600";

  if (loading) {
    return <div className="flex justify-center items-center h-[500px]">
      <LoadingSpinner size="lg" text="Loading articles..." color="gradient" />
    </div>;
  }

  if (articles.length === 0) {
    return (
      <div className={emptyStateClasses}>
        <div className={emptyStateIconClasses}>📰</div>
        <h3 className={emptyStateTitleClasses}>No articles found</h3>
        <p className={emptyStateTextClasses}>
          Try adjusting your search criteria or check back later for new articles.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={cardsRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onCardHover={onCardHover}
          onCardLeave={onCardLeave}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
} 