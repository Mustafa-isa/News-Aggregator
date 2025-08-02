'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNewsService } from '../../../hooks/useNewsService';
import { BaseNewsArticle } from '../../../types/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageHeader from '@/components/Article/PageHeader';
import Article from '@/components/Article/Article';
import LoadingState from '@/components/LoadingState';

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
          router.push('/');
        }
      } catch (error) {
        console.error('Error loading article:', error);
        router.push('/');
      }
    };

    loadArticle();
  }, [params.id, router, getArticleById]);

  const mainContainerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50";

  if (loading) {
    return <LoadingState />;
  }

  if (!article) {
    return <LoadingSpinner overlay={true} />;
  }

  return (
    <div className={mainContainerClasses}>
      <PageHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Article article={article} />
      </main>
    </div>
  );
} 