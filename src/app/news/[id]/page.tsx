'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_ARTICLES, NewsArticle } from '../../../utils/constants';
import { formatDate } from '../../../utils/helpers';

export default function NewsDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articleId = params.id as string;
    const foundArticle = MOCK_ARTICLES.find(a => a.id === articleId);
    
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      // Redirect to home if article not found
      router.push('/');
    }
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Article not found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The article you're looking for doesn't exist.</p>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News Aggregator</h1>
            </Link>
            <Link 
              href="/" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to News
            </Link>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Article Image */}
          <div className="relative h-96 overflow-hidden bg-gray-100 dark:bg-gray-700">
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
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-gray-800/80 dark:bg-gray-900/80 text-white text-sm font-medium rounded-full shadow-md">
                {article.category || 'general'}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>By {article.author}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{article.category || 'general'}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Full Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {article.content}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <Link 
                  href={`/category/${article.category || 'general'}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  ← More {article.category || 'general'} news
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