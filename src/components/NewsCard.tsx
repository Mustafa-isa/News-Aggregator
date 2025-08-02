'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BaseNewsArticle } from '../types/api';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NewsCardProps {
  article: BaseNewsArticle;
  onCardHover: (articleId: string) => void;
  onCardLeave: () => void;
  formatDate: (dateString: string) => string;
}

export default function NewsCard({
  article,
  onCardHover,
  onCardLeave,
  formatDate
}: NewsCardProps) {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  const cardClasses = theme === 'dark'
    ? "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600"
    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300";

  const titleClasses = theme === 'dark'
    ? "text-white group-hover:text-blue-300"
    : "text-gray-900 group-hover:text-blue-600";

  const descriptionClasses = theme === 'dark'
    ? "text-gray-300"
    : "text-gray-600";

  const metaClasses = theme === 'dark'
    ? "text-gray-400"
    : "text-gray-500";

  const readMoreClasses = theme === 'dark'
    ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-700";

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${cardClasses}`}
      onMouseEnter={() => onCardHover(article.id)}
      onMouseLeave={onCardLeave}
      dir={isRTL ? 'rtl' : 'ltr'}
      data-article-id={article.id}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.urlToImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-lg font-semibold mb-3 line-clamp-2 ${titleClasses}`}>
          {article.title}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-3 ${descriptionClasses}`}>
          {article.description}
        </p>

        {/* Meta Information */}
        <div className={`text-xs space-y-1 mb-4 ${metaClasses}`}>
          <div className="flex items-center justify-between rtl:flex-row-reverse">
            <span>{t('common.publishedOn')} {formatDate(article.publishedAt)}</span>
            <span>{t('common.source')}: {article.source.name}</span>
          </div>
          {article.author && article.author !== 'Unknown Author' && (
            <div className="flex items-center rtl:flex-row-reverse">
              <span>{t('common.by')} {article.author}</span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <Link
          href={`/news/${article.id}`}
          className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${readMoreClasses}`}
        >
          {t('common.readMore')}
          <svg 
            className={`w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
} 