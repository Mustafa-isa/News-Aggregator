'use client';
import { useState, useCallback } from 'react';
import { NewsService } from '../services/NewsService';
import { BaseNewsArticle, FetchArticlesParams, PaginationInfo } from '../types/api';
import { providerConfigs } from '../config/providers';

export function useNewsService() {
  const [articles, setArticles] = useState<BaseNewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const newsService = new NewsService(providerConfigs);

  const fetchArticles = useCallback(async (params: FetchArticlesParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      console.log('useNewsService: Fetching articles with params:', params);
      const result = await newsService.fetchArticles(params);
      setArticles(result.articles);
      setPagination(result.pagination);
      console.log('useNewsService: Successfully fetched articles:', result.articles.length);
      console.log('useNewsService: Pagination info:', result.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles';
      setError(errorMessage);
      console.error('useNewsService: Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchArticles = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log('useNewsService: Searching articles for:', query);
      const result = await newsService.searchArticles(query);
      setArticles(result.articles);
      setPagination(result.pagination);
      console.log('useNewsService: Search results:', result.articles.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search articles';
      setError(errorMessage);
      console.error('useNewsService: Error searching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getArticleById = useCallback(async (id: string) => {
    try {
      return await newsService.getArticleById(id);
    } catch (err) {
      console.error('useNewsService: Error getting article by ID:', err);
      return null;
    }
  }, []);

  return {
    articles,
    loading,
    error,
    pagination,
    fetchArticles,
    searchArticles,
    getArticleById
  };
} 