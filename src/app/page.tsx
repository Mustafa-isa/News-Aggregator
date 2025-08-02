'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Pagination from '../components/Pagination';
import ClientOnly from '../components/ClientOnly';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import { formatDate, filterArticles } from '../utils/helpers';
import { useNewsAnimations } from '../hooks/useNewsAnimations';
import { useTheme } from '../contexts/ThemeContext';
import { useNewsService } from '../hooks/useNewsService';
import { BaseNewsArticle } from '../types/api';

function HomeContent() {
  const { theme } = useTheme();
  const { articles, loading, error, pagination, fetchArticles, searchArticles } = useNewsService();
  
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  
  // Refs for animations
  const headerRef = useRef<HTMLElement>(null);
  const searchSectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        // Fetch initial data from both Guardian and NYT
        await fetchArticles({ pageSize: 12, page: 1 });
        setIsClient(true);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [fetchArticles]);

  // Handle page changes
  const handlePageChange = async (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
    try {
      await fetchArticles({ 
        pageSize: 12, 
        page,
        searchQuery: searchQuery.trim() || undefined
      });
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching page:', error);
    }
  };

  // Handle search with pagination reset
  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
    
    if (query.trim()) {
      console.log('Searching for:', query);
      await searchArticles(query);
    } else {
      console.log('Fetching all articles');
      await fetchArticles({ pageSize: 12, page: 1 });
    }
  };


  // Animation handlers
  const {
    handleSearchFocus,
    handleSearchBlur,
    handleCardHover,
    handleCardLeave
  } = useNewsAnimations({
    isClient,
    headerRef,
    searchSectionRef,
    cardsRef,
    searchInputRef,
    articles
  });

  useEffect(() => {
    if (articles.length > 0) {
      const guardianArticles = articles.filter(a => a.source.id === 'guardian');
      const nytArticles = articles.filter(a => a.source.id === 'nyt');
      
    }
  }, [articles, pagination]);

  // Debug: Log pagination rendering
  useEffect(() => {
    if (pagination) {
      console.log('Pagination component should render with:', pagination);
    }
  }, [pagination]);

  const mainContainerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50";

  const loadingContainerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center";

  const loadingCardClasses = theme === 'dark'
    ? "text-center bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700"
    : "text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200";

  if (isLoading) {
    return (
      <LoadingSpinner 
        size="2xl" 
        text="Loading News Aggregator..." 
        color="purple"
        overlay={true}
      />
    );
  }

  return (
    <div className={mainContainerClasses}>
      <Header headerRef={headerRef} />
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        searchSectionRef={searchSectionRef}
        searchInputRef={searchInputRef}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <NewsGrid
          articles={articles}
          loading={loading}
          onCardHover={handleCardHover}
          onCardLeave={handleCardLeave}
          formatDate={formatDate}
          cardsRef={cardsRef}
        />
        
        <ClientOnly>
          {pagination && (
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </ClientOnly>
      </section>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    // <ErrorBoundary>
      <HomeContent />
    // </ErrorBoundary>
  );
}
