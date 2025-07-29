'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import SearchSection from './SearchSection';
import NewsGrid from './NewsGrid';
import Footer from './Footer';
import { CATEGORIES, MOCK_ARTICLES, NewsArticle } from '../utils/constants';
import { formatDate, filterArticles } from '../utils/helpers';
import { useNewsAnimations } from '../hooks/useNewsAnimations';

// Dynamically import components to avoid SSR
const DynamicHeader = dynamic(() => import('./Header'), { ssr: false });
const DynamicSearchSection = dynamic(() => import('./SearchSection'), { ssr: false });
const DynamicNewsGrid = dynamic(() => import('./NewsGrid'), { ssr: false });

export default function DynamicPage() {
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

  // Initialize data
  useEffect(() => {
    setArticles(MOCK_ARTICLES);
  }, []);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <DynamicHeader headerRef={headerRef} />
      
      <DynamicSearchSection
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
        <DynamicNewsGrid
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