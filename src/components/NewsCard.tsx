'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NewsArticle } from '../utils/constants';

interface NewsCardProps {
  article: NewsArticle;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  formatDate: (dateString: string) => string;
}

export default function NewsCard({ article, onMouseEnter, onMouseLeave, formatDate }: NewsCardProps) {
  return (
    <Link href={`/news/${article.id}`} className="block">
      <article
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-600"
      >
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-md">
              {article.source.name}
            </span>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="mx-2">•</span>
            <span>{article.author}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
            {article.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
              {article.category || 'general'}
            </span>
            <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
} 