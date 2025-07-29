import { NewsArticle } from './constants';

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Use a simple, consistent format to avoid hydration issues
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    return `${monthNames[month]} ${day}, ${year} at ${formattedTime}`;
  } catch (error) {
    // Fallback to a simple format if parsing fails
    return new Date(dateString).toISOString().split('T')[0];
  }
};

export const filterArticles = (
  articles: NewsArticle[], 
  searchQuery: string, 
  selectedCategory: string
): NewsArticle[] => {
  return articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'general' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}; 