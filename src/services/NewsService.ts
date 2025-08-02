import { 
  NewsAPIProvider, 
  BaseNewsArticle, 
  FetchArticlesParams,
  ProviderConfig,
  APIError,
  PaginationInfo
} from '../types/api';
import { NewsAPIProviderImpl } from './providers/NewsAPIProvider';
import { GuardianProviderImpl } from './providers/GuardianProvider';
import { NYTProviderImpl } from './providers/NYTProvider';

export class NewsService {
  private providers: NewsAPIProvider[] = [];
  private providerConfigs: ProviderConfig[] = [];
  private cachedArticles: BaseNewsArticle[] = [];
  private totalArticlesCount: number = 0;

  constructor(configs: ProviderConfig[]) {
    this.providerConfigs = configs;
    this.initializeProviders();
  }

  private initializeProviders() {
    const enabledProviders = this.providerConfigs
      .filter(config => config.enabled)
      .sort((a, b) => b.priority - a.priority); // Higher priority first

    // If no real providers are enabled, throw an error
    if (enabledProviders.length === 0) {
      throw new Error('No API providers are enabled. Please enable at least one provider in the configuration.');
    }

    this.providers = enabledProviders.map(config => {
      switch (config.name.toLowerCase()) {
        case 'newsapi':
          return new NewsAPIProviderImpl(config);
        case 'guardian':
          return new GuardianProviderImpl(config);
        case 'nyt':
        case 'new york times':
          return new NYTProviderImpl(config);
        default:
          throw new Error(`Unknown provider: ${config.name}`);
      }
    });
  }

  async fetchArticles(params: FetchArticlesParams): Promise<{ articles: BaseNewsArticle[], pagination: PaginationInfo }> {
    const errors: APIError[] = [];
    const allArticles: BaseNewsArticle[] = [];
    let totalArticles = 0;

    const pageSize = params.pageSize || 20;
    const currentPage = params.page || 1;
    
    const articlesPerProvider = Math.ceil(pageSize / this.providers.length);
    
    console.log(`Fetching ${articlesPerProvider} articles per provider for page ${currentPage}`);

    for (const provider of this.providers) {
      try {
        console.log(`Fetching articles from ${provider.name} with pageSize=${articlesPerProvider}, page=${currentPage}...`);
        
        // Each provider gets their own pagination parameters
        const providerParams = {
          ...params,
          pageSize: articlesPerProvider,
          page: currentPage
        };
        
        const articles = await provider.fetchArticles(providerParams);
        allArticles.push(...articles);
        console.log(`Successfully fetched ${articles.length} articles from ${provider.name}`);
        
      } catch (error) {
        const apiError = error as APIError;
        console.error(`Error fetching from ${provider.name}:`, apiError.message);
        errors.push(apiError);
      }
    }

    // Remove duplicates based on URL
    const uniqueArticles = this.removeDuplicates(allArticles);
    totalArticles = uniqueArticles.length;

    // Sort by published date (newest first)
    const sortedArticles = uniqueArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Cache the articles for getArticleById
    this.cachedArticles = sortedArticles;
    this.totalArticlesCount = totalArticles;

    // Calculate pagination info - use a reasonable estimate for total pages
    // Since we're getting mixed content, we'll estimate based on the current page
    const estimatedTotalArticles = Math.max(totalArticles * 20, 200); // More conservative estimate
    const totalPages = Math.max(Math.ceil(estimatedTotalArticles / pageSize), 5); // Ensure at least 5 pages

    const pagination: PaginationInfo = {
      currentPage,
      totalPages,
      totalArticles: estimatedTotalArticles,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      pageSize
    };

    console.log(`Pagination info: page ${currentPage} of ${totalPages}, estimated ${estimatedTotalArticles} total articles`);

    return { articles: sortedArticles, pagination };
  }

  async searchArticles(query: string): Promise<{ articles: BaseNewsArticle[], pagination: PaginationInfo }> {
    return this.fetchArticles({
      searchQuery: query,
      pageSize: 20,
      sortBy: 'relevance'
    });
  }

  async getArticleById(id: string): Promise<BaseNewsArticle | null> {
    console.log(`Looking for article with ID: ${id}`);
    
    // First try to find in cached articles
    const cachedArticle = this.cachedArticles.find(article => article.id === id);
    if (cachedArticle) {
      console.log(`Found article in cache: ${cachedArticle.title}`);
      return cachedArticle;
    }

    console.log(`Article not found in cache, searching providers...`);

    // If not found in cache, try to fetch from providers
    for (const provider of this.providers) {
      try {
        console.log(`Searching in ${provider.name}...`);
        const articles = await provider.fetchArticles({ pageSize: 100 });
        const article = articles.find(a => a.id === id);
        if (article) {
          console.log(`Found article in ${provider.name}: ${article.title}`);
          return article;
        }
      } catch (error) {
        console.error(`Error searching for article in ${provider.name}:`, error);
      }
    }
    
    console.log(`Article not found in any provider`);
    return null;
  }

  private removeDuplicates(articles: BaseNewsArticle[]): BaseNewsArticle[] {
    const seen = new Set<string>();
    return articles.filter(article => {
      const key = article.url.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  getProviderStatus(): Array<{ name: string; enabled: boolean; priority: number }> {
    return this.providerConfigs.map(config => ({
      name: config.name,
      enabled: config.enabled,
      priority: config.priority
    }));
  }

  getActiveProviders(): string[] {
    return this.providers.map(provider => provider.name);
  }
} 