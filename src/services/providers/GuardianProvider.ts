import { 
  NewsAPIProvider, 
  BaseNewsArticle, 
  FetchArticlesParams,
  GuardianResponse,
  GuardianArticle,
  ProviderConfig,
  APIError
} from '../../types/api';

export class GuardianProviderImpl implements NewsAPIProvider {
  public name = 'The Guardian';
  public baseUrl = 'https://content.guardianapis.com';
  public apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey || '';
    this.baseUrl = config.baseUrl || this.baseUrl;
    console.log(`Guardian Provider initialized with API key: ${this.apiKey ? 'Present' : 'Missing'}`);
  }

  async fetchArticles(params: FetchArticlesParams): Promise<BaseNewsArticle[]> {
    try {
      const queryParams = new URLSearchParams({
        'api-key': this.apiKey,
        'page-size': (params.pageSize || 20).toString(),
        'page': (params.page || 1).toString(),
        'show-fields': 'thumbnail,bodyText',
        'show-tags': 'contributor',
        'order-by': this.mapSortBy(params.sortBy)
      });

      if (params.searchQuery) {
        queryParams.append('q', params.searchQuery);
      }

      const url = `${this.baseUrl}/search?${queryParams}`;
      console.log(`Guardian API request URL: ${url}`);

      const response = await fetch(url);
      
      console.log(`Guardian API response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Guardian API error response:`, errorText);
        throw new Error(`Guardian API error: ${response.status} ${response.statusText}`);
      }

      const data: GuardianResponse = await response.json();
      
      if (data.response.status !== 'ok') {
        throw new Error(`Guardian API returned status: ${data.response.status}`);
      }

      console.log(`Guardian API returned ${data.response.results.length} articles out of ${data.response.total} total`);
      return data.response.results.map(article => this.mapToBaseArticle(article));
    } catch (error) {
      const apiError: APIError = {
        provider: this.name,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
      throw apiError;
    }
  }

  async searchArticles(query: string): Promise<BaseNewsArticle[]> {
    return this.fetchArticles({
      searchQuery: query,
      pageSize: 20,
      sortBy: 'relevance'
    });
  }

  private mapToBaseArticle(article: GuardianArticle): BaseNewsArticle {
    const author = article.tags?.find(tag => tag.type === 'contributor')?.webTitle || 'Unknown Author';
    
    // Generate a proper ID from the Guardian article ID
    const generateId = (guardianId: string): string => {
      // Extract the last part of the path and create a hash-like ID
      const parts = guardianId.split('/');
      const lastPart = parts[parts.length - 1];
      // Create a simple hash from the full ID
      let hash = 0;
      for (let i = 0; i < guardianId.length; i++) {
        const char = guardianId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return `guardian-${Math.abs(hash)}`;
    };
    
    return {
      id: generateId(article.id),
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 200) + '...' || 'No description available',
      content: article.fields?.bodyText || 'No content available',
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail || '/placeholder-image.jpg',
      publishedAt: article.webPublicationDate,
      author: author,
      source: {
        id: 'guardian',
        name: 'The Guardian'
      }
    };
  }

  private mapSortBy(sortBy?: string): string {
    switch (sortBy) {
      case 'publishedAt':
        return 'newest';
      case 'relevance':
        return 'relevance';
      case 'popularity':
        return 'oldest'; // Guardian doesn't have popularity, using oldest as fallback
      default:
        return 'newest';
    }
  }
} 