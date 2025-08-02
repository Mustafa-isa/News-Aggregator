import { BaseNewsArticle } from '../types/api';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function filterArticles(
  articles: BaseNewsArticle[],
  searchQuery: string
): BaseNewsArticle[] {
  let filtered = articles;
  


  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)
    );
  }

  return filtered;
} 