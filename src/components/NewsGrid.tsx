'use client';

import { useRef } from 'react';
import NewsCard from './NewsCard';
import { NewsArticle } from '../utils/constants';

interface NewsGridProps {
  articles: NewsArticle[];
  loading: boolean;
  onCardHover: (e: React.MouseEvent<HTMLElement>) => void;
  onCardLeave: (e: React.MouseEvent<HTMLElement>) => void;
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
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-white/80 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📰</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
        <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or category filters</p>
      </div>
    );
  }

  return (
    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onMouseEnter={onCardHover}
          onMouseLeave={onCardLeave}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
} 