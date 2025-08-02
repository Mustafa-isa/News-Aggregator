'use client';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../../utils/helpers';
import { useTheme } from '../../contexts/ThemeContext';
import { BaseNewsArticle } from '../../types/api';

interface ArticleProps {
  article: BaseNewsArticle;
}

export default function Article({ article }: ArticleProps) {
  const { theme } = useTheme();

  const articleCardClasses = theme === 'dark'
    ? "bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden"
    : "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden";

  const articleImageContainerClasses = theme === 'dark'
    ? "relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-700"
    : "relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-100";

  const metaClasses = theme === 'dark'
    ? "flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 space-y-1 sm:space-y-0"
    : "flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 space-y-1 sm:space-y-0";

  const titleClasses = theme === 'dark'
    ? "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight"
    : "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight";

  const descriptionClasses = theme === 'dark'
    ? "text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
    : "text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed";

  const contentClasses = theme === 'dark'
    ? "text-sm sm:text-base text-gray-300 leading-relaxed mb-6"
    : "text-sm sm:text-base text-gray-700 leading-relaxed mb-6";

  const borderClasses = theme === 'dark'
    ? "mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700"
    : "mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200";

  const sourceBadgeClasses = theme === 'dark'
    ? "px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-md"
    : "px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-md";

  const backLinkClasses = theme === 'dark'
    ? "text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm sm:text-base"
    : "text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base";

  const readButtonClasses = theme === 'dark'
    ? "bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base"
    : "bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base";

  return (
    <article className={articleCardClasses}>
      {/* Article Image */}
      <div className={articleImageContainerClasses}>
        <Image
          src={article.urlToImage}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          priority
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className={sourceBadgeClasses}>
            {article.source.name}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Meta Information */}
        <div className={metaClasses}>
          <span>{formatDate(article.publishedAt)}</span>
          <span className="hidden sm:inline mx-2">•</span>
          <span className="sm:hidden">•</span>
          <span>By {article.author}</span>
        </div>

        {/* Title */}
        <h1 className={titleClasses}>
          {article.title}
        </h1>

        {/* Description */}
        <p className={descriptionClasses}>
          {article.description}
        </p>

        {/* Full Content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <p className={contentClasses}>
            {article.content}
          </p>
        </div>

        {/* Action Buttons */}
        <div className={borderClasses}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <Link 
              href="/"
              className={backLinkClasses}
            >
              ← Back to News
            </Link>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${readButtonClasses} w-full sm:w-auto text-center`}
            >
              Read Full Article →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
} 