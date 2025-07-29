export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: {
    id: string;
    name: string;
  };
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'general', name: 'General', icon: '📰' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'environment', name: 'Environment', icon: '🌱' }
];

export const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Breaking: Major Tech Innovation Announced',
    description: 'A revolutionary new technology has been unveiled that could change the way we interact with digital devices.',
    content: 'The technology sector is buzzing with excitement as a major breakthrough has been announced...',
    url: 'https://example.com/article1',
    urlToImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    publishedAt: '2025-01-27T10:00:00Z',
    author: 'John Smith',
    source: { id: 'tech-news', name: 'Tech News' },
    category: 'technology'
  },
  {
    id: '2',
    title: 'Global Economy Shows Signs of Recovery',
    description: 'Recent economic indicators suggest a positive trend in global markets.',
    content: 'Economic analysts are optimistic about the current market conditions...',
    url: 'https://example.com/article2',
    urlToImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    publishedAt: '2025-01-27T09:30:00Z',
    author: 'Sarah Johnson',
    source: { id: 'business-daily', name: 'Business Daily' },
    category: 'business'
  },
  {
    id: '3',
    title: 'New Environmental Policy Announced',
    description: 'Government introduces comprehensive environmental protection measures.',
    content: 'In a landmark decision, the government has announced sweeping environmental reforms...',
    url: 'https://example.com/article3',
    urlToImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    publishedAt: '2025-01-27T08:45:00Z',
    author: 'Mike Wilson',
    source: { id: 'environment-news', name: 'Environment News' },
    category: 'environment'
  },
  {
    id: '4',
    title: 'Sports: Championship Finals Set',
    description: 'The stage is set for an epic championship showdown this weekend.',
    content: 'After months of intense competition, the final teams have been determined...',
    url: 'https://example.com/article4',
    urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    publishedAt: '2025-01-27T07:15:00Z',
    author: 'Lisa Chen',
    source: { id: 'sports-central', name: 'Sports Central' },
    category: 'sports'
  },
  {
    id: '5',
    title: 'Healthcare Breakthrough in Medical Research',
    description: 'Scientists discover promising new treatment for chronic conditions.',
    content: 'A team of researchers has made a significant breakthrough in medical science...',
    url: 'https://example.com/article5',
    urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    publishedAt: '2025-01-27T06:30:00Z',
    author: 'Dr. Emily Brown',
    source: { id: 'health-news', name: 'Health News' },
    category: 'health'
  },
  {
    id: '6',
    title: 'Entertainment: Award Show Highlights',
    description: 'The biggest names in entertainment gathered for the annual awards ceremony.',
    content: 'Hollywood\'s finest came together to celebrate the year\'s best performances...',
    url: 'https://example.com/article6',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
    publishedAt: '2025-01-27T05:45:00Z',
    author: 'Alex Rodriguez',
    source: { id: 'entertainment-weekly', name: 'Entertainment Weekly' },
    category: 'entertainment'
  }
]; 