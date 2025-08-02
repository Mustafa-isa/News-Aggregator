'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../../../utils/helpers';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNewsService } from '../../../hooks/useNewsService';
import { BaseNewsArticle } from '../../../types/api';

export default function NewsDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { getArticleById, loading, error } = useNewsService();
  const [article, setArticle] = useState<BaseNewsArticle | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      const articleId = params.id as string;
      console.log(`Loading article with ID: ${articleId}`);
      try {
        const foundArticle = await getArticleById(articleId);
        if (foundArticle) {
          console.log(`Article found: ${foundArticle.title}`);
          setArticle(foundArticle);
        } else {
          console.log(`Article not found, redirecting to home`);
          // Redirect to home if article not found
          router.push('/');
        }
      } catch (error) {
        console.error('Error loading article:', error);
        router.push('/');
      }
    };

    loadArticle();
  }, [params.id, router, getArticleById]);

  // Dynamic classes based on theme
  const mainContainerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50";

  const loadingContainerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center";

  const loadingCardClasses = theme === 'dark'
    ? "text-center bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700"
    : "text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200";

  const loadingSpinnerClasses = theme === 'dark'
    ? "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"
    : "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4";

  const loadingTextClasses = theme === 'dark'
    ? "text-gray-300"
    : "text-gray-700";

  const notFoundCardClasses = theme === 'dark'
    ? "text-center bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700"
    : "text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200";

  const notFoundIconClasses = theme === 'dark'
    ? "text-gray-500 text-6xl mb-4"
    : "text-gray-400 text-6xl mb-4";

  const notFoundTitleClasses = theme === 'dark'
    ? "text-xl font-semibold text-white mb-2"
    : "text-xl font-semibold text-gray-900 mb-2";

  const notFoundTextClasses = theme === 'dark'
    ? "text-gray-300 mb-4"
    : "text-gray-600 mb-4";

  const notFoundLinkClasses = theme === 'dark'
    ? "text-blue-400 hover:text-blue-300 font-medium"
    : "text-blue-600 hover:text-blue-700 font-medium";

  const headerClasses = theme === 'dark'
    ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50"
    : "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50";

  const headerTitleClasses = theme === 'dark'
    ? "text-2xl font-bold text-white"
    : "text-2xl font-bold text-gray-900";

  const headerLinkClasses = theme === 'dark'
    ? "text-blue-400 hover:text-blue-300 font-medium transition-colors"
    : "text-blue-600 hover:text-blue-700 font-medium transition-colors";

  const articleCardClasses = theme === 'dark'
    ? "bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden"
    : "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden";

  const articleImageContainerClasses = theme === 'dark'
    ? "relative h-96 overflow-hidden bg-gray-700"
    : "relative h-96 overflow-hidden bg-gray-100";

  const metaClasses = theme === 'dark'
    ? "flex items-center text-sm text-gray-400 mb-6"
    : "flex items-center text-sm text-gray-600 mb-6";

  const titleClasses = theme === 'dark'
    ? "text-4xl font-bold text-white mb-6 leading-tight"
    : "text-4xl font-bold text-gray-900 mb-6 leading-tight";

  const descriptionClasses = theme === 'dark'
    ? "text-xl text-gray-300 mb-8 leading-relaxed"
    : "text-xl text-gray-700 mb-8 leading-relaxed";

  const contentClasses = theme === 'dark'
    ? "text-gray-300 leading-relaxed mb-6"
    : "text-gray-700 leading-relaxed mb-6";

  const borderClasses = theme === 'dark'
    ? "mt-8 pt-6 border-t border-gray-700"
    : "mt-8 pt-6 border-t border-gray-200";

  if (loading) {
    return (
      <div className={loadingContainerClasses}>
        <div className={loadingCardClasses}>
          <div className={loadingSpinnerClasses}></div>
          <p className={loadingTextClasses}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={loadingContainerClasses}>
        <div className={notFoundCardClasses}>
          <div className={notFoundIconClasses}>📰</div>
          <h3 className={notFoundTitleClasses}>Article not found</h3>
          <p className={notFoundTextClasses}>The article you're looking for doesn't exist.</p>
          <Link href="/" className={notFoundLinkClasses}>
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={mainContainerClasses}>
      {/* Header */}
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h1 className={headerTitleClasses}>News Aggregator</h1>
            </Link>
            <Link 
              href="/" 
              className={headerLinkClasses}
            >
              ← Back to News
            </Link>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className={articleCardClasses}>
          {/* Article Image */}
          <div className={articleImageContainerClasses}>
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md">
                {article.source.name}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Meta Information */}
            <div className={metaClasses}>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="mx-2">•</span>
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
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className={contentClasses}>
                {article.content}
              </p>
              <p className={contentClasses}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className={contentClasses}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={borderClasses}>
              <div className="flex items-center justify-between">
                <Link 
                  href="/"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  ← Back to News
                </Link>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                >
                  Read Full Article →
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
} 