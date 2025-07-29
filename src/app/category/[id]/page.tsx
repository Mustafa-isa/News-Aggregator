'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_ARTICLES, CATEGORIES, NewsArticle } from '../../../utils/constants';
import { formatDate, filterArticles } from '../../../utils/helpers';
import NewsCard from '../../../components/NewsCard';
import { useNewsAnimations } from '../../../hooks/useNewsAnimations';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Get category info
  const category = CATEGORIES.find(cat => cat.id === categoryId);

  useEffect(() => {
    // Filter articles by category
    const categoryArticles = MOCK_ARTICLES.filter(article => 
      article.category === categoryId || (categoryId === 'general' && !article.category)
    );
    setArticles(categoryArticles);
    setLoading(false);
  }, [categoryId]);

  // Filter articles based on search
  const filteredArticles = filterArticles(articles, searchQuery, categoryId);

  // Animation handlers
  const {
    handleCardHover,
    handleCardLeave
  } = useNewsAnimations({
    isClient: true,
    headerRef: { current: null },
    searchSectionRef: { current: null },
    cardsRef: { current: null },
    searchInputRef: { current: null },
    filteredArticles
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Category not found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The category you're looking for doesn't exist.</p>
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

      {/* Category Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name} News
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            Latest {category.name.toLowerCase()} stories from trusted sources
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()} news...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white/80 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {searchQuery ? 'No articles match your search.' : `No ${category.name.toLowerCase()} articles available.`}
            </p>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              ← Back to All News
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 