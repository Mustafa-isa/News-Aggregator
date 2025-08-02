'use client';
import {
  NewsAPIProvider,
  BaseNewsArticle,
  FetchArticlesParams,
  NYTResponse,
  NYTArticle,
  NYTMedia,
  ProviderConfig,
  APIError
} from '../../types/api';

export class NYTProviderImpl implements NewsAPIProvider {
  public name = 'The New York Times';
  public baseUrl = 'https://api.nytimes.com/svc/news/v3';
  public apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey || '';
    this.baseUrl = config.baseUrl || this.baseUrl;
    console.log(`NYT Provider initialized with API key: ${this.apiKey ? 'Present' : 'Missing'}`);
  }

  async fetchArticles(params: FetchArticlesParams): Promise<BaseNewsArticle[]> {
    try {
      const pageSize = params.pageSize || 20;
      const page = params.page || 1;
      const offset = (page - 1) * pageSize;
      
      const queryParams = new URLSearchParams({
        'api-key': this.apiKey,
        'limit': pageSize.toString(),
        'offset': offset.toString(),
      });

      if (params.searchQuery) {
        queryParams.append('q', params.searchQuery);
      }

      const url = `${this.baseUrl}/content/all/all.json?${queryParams}`;
      console.log(`NYT API request URL: ${url}`);
      console.log(`NYT API Key being used: ${this.apiKey.substring(0, 10)}...`);
      
      const response = await fetch(url);
      console.log(`NYT API response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`NYT API error response:`, errorText);
        throw new Error(`NYT API error: ${response.status} ${response.statusText}`);
      }

      const data: NYTResponse = await response.json();
      console.log(`NYT API returned ${data.results.length} articles out of ${data.num_results} total`);
      return data.results.map(article => this.mapToBaseArticle(article));
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
      pageSize: 20
    });
  }

  private mapToBaseArticle(article: NYTArticle): BaseNewsArticle {
    const imageUrl = this.getImageUrl(article.multimedia);
    const author = article.byline || 'Unknown Author';
    
    // Generate a proper ID from the NYT article URI
    const generateId = (nytUri: string): string => {
      // Create a simple hash from the full URI
      let hash = 0;
      for (let i = 0; i < nytUri.length; i++) {
        const char = nytUri.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return `nyt-${Math.abs(hash)}`;
    };
    
    return {
      id: generateId(article.uri),
      title: article.title,
      description: article.abstract || 'No description available',
      content: article.abstract || 'No content available',
      url: article.url,
      urlToImage: imageUrl || '/placeholder-image.jpg',
      publishedAt: article.published_date,
      author: author,
      source: {
        id: 'nyt',
        name: 'The New York Times'
      }
    };
  }

  private getImageUrl(multimedia: NYTMedia[]): string | null {
    if (!multimedia || multimedia.length === 0) return null;
    
    // Look for the best quality image
    const bestImage = multimedia.find(m => m.format === 'mediumThreeByTwo440') ||
                     multimedia.find(m => m.format === 'mediumThreeByTwo210') ||
                     multimedia.find(m => m.format === 'Standard Thumbnail');
    
    return bestImage?.url || null;
  }
} 