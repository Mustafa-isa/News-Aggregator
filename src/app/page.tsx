'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';
import { CATEGORIES, MOCK_ARTICLES, NewsArticle } from '../utils/constants';
import { formatDate, filterArticles } from '../utils/helpers';
import { useNewsAnimations } from '../hooks/useNewsAnimations';

export default function Home() {
  // Loading state to prevent hydration issues
  const [isLoading, setIsLoading] = useState(true);
  
  // State management
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isClient, setIsClient] = useState(false);
  
  // Refs for animations
  const headerRef = useRef<HTMLElement>(null);
  const searchSectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize everything after mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setArticles(MOCK_ARTICLES);
      setIsClient(true);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Filter articles based on search and category
  const filteredArticles = filterArticles(articles, searchQuery, selectedCategory);

  // Animation handlers
  const {
    handleSearchFocus,
    handleSearchBlur,
    handleCardHover,
    handleCardLeave,
    handleCategoryClick
  } = useNewsAnimations({
    isClient,
    headerRef,
    searchSectionRef,
    cardsRef,
    searchInputRef,
    filteredArticles
  });

  // Event handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId: string) => {
    handleCategoryClick(categoryId, setSelectedCategory);
  };

  // Show loading state until everything is ready
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading News Aggregator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header headerRef={headerRef} />
      
      <SearchSection
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        searchSectionRef={searchSectionRef}
        searchInputRef={searchInputRef}
        categories={CATEGORIES}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <NewsGrid
          articles={filteredArticles}
          loading={loading}
          onCardHover={handleCardHover}
          onCardLeave={handleCardLeave}
          formatDate={formatDate}
          cardsRef={cardsRef}
        />
      </section>

      <Footer />
    </div>
  );
}
