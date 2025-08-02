import { 
  NewsAPIProvider as INewsAPIProvider, 
  BaseNewsArticle, 
  FetchArticlesParams,
  NewsAPIResponse,
  NewsAPIArticle,
  ProviderConfig,
  APIError
} from '../../types/api';

export class NewsAPIProviderImpl implements INewsAPIProvider {
  public name = 'NewsAPI.org';
  public baseUrl = 'https://newsapi.org/v2';
  public apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey || '';
    this.baseUrl = config.baseUrl || this.baseUrl;
    console.log(`NewsAPI Provider initialized with API key: ${this.apiKey ? 'Present' : 'Missing'}`);
  }

  async fetchArticles(params: FetchArticlesParams): Promise<BaseNewsArticle[]> {
    try {
      const queryParams = new URLSearchParams({
        'apiKey': this.apiKey,
        'pageSize': (params.pageSize || 20).toString(),
        'page': (params.page || 1).toString(),
        'language': 'en',
        'sortBy': this.mapSortBy(params.sortBy)
      });

      if (params.searchQuery) {
        queryParams.append('q', params.searchQuery);
      }

      const url = `${this.baseUrl}/everything?${queryParams}`;
      console.log(`NewsAPI request URL: ${url}`);

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`NewsAPI error response:`, errorText);
        throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
      }

      const data: NewsAPIResponse = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(`NewsAPI returned status: ${data.status}`);
      }

      console.log(`NewsAPI returned ${data.articles.length} articles out of ${data.totalResults} total`);
      return data.articles.map(article => this.mapToBaseArticle(article));
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

  private mapToBaseArticle(article: NewsAPIArticle): BaseNewsArticle {
    return {
      id: this.generateId(article.url),
      title: article.title,
      description: article.description || 'No description available',
      content: article.content || 'No content available',
      url: article.url,
      urlToImage: article.urlToImage || '/placeholder-image.jpg',
      publishedAt: article.publishedAt,
      author: article.author || 'Unknown Author',
      source: {
        id: article.source.id || 'unknown',
        name: article.source.name
      }
    };
  }

  private generateId(url: string): string {
    // Create a simple hash from the URL
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `newsapi-${Math.abs(hash)}`;
  }

  private mapSortBy(sortBy?: string): string {
    switch (sortBy) {
      case 'publishedAt':
        return 'publishedAt';
      case 'relevance':
        return 'relevancy';
      case 'popularity':
        return 'popularity';
      default:
        return 'publishedAt';
    }
  }
} 