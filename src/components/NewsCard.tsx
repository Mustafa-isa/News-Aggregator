'use client';

import Image from 'next/image';
import { NewsArticle } from '../utils/constants';

interface NewsCardProps {
  article: NewsArticle;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  formatDate: (dateString: string) => string;
}

export default function NewsCard({ article, onMouseEnter, onMouseLeave, formatDate }: NewsCardProps) {
  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.urlToImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {article.source.name}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{formatDate(article.publishedAt)}</span>
          <span className="mx-2">•</span>
          <span>{article.author}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {article.category || 'general'}
          </span>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
} 