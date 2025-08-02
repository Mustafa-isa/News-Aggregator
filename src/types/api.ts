// Base interfaces for standardized data
export interface BaseNewsArticle {
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
}

// API Provider interfaces
export interface NewsAPIProvider {
  name: string;
  baseUrl: string;
  apiKey: string;
  fetchArticles(params: FetchArticlesParams): Promise<BaseNewsArticle[]>;
  searchArticles(query: string): Promise<BaseNewsArticle[]>;
}

export interface FetchArticlesParams {
  searchQuery?: string;
  pageSize?: number;
  page?: number;
  sortBy?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageSize: number;
}

// NewsAPI.org specific interfaces
export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

export interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Guardian API specific interfaces
export interface GuardianResponse {
  response: {
    status: string;
    total: number;
    results: GuardianArticle[];
  };
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    thumbnail?: string;
    bodyText?: string;
  };
  tags?: GuardianTag[];
}

export interface GuardianTag {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  firstName?: string;
  lastName?: string;
}

// New York Times API specific interfaces
export interface NYTResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: NYTArticle[];
}

export interface NYTArticle {
  slug_name: string;
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  uri: string;
  url: string;
  byline: string;
  item_type: string;
  source: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  first_published_date: string;
  material_type_facet: string;
  kicker: string;
  subheadline: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  related_urls: string[];
  multimedia: NYTMedia[];
}

export interface NYTMedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface NYTSection {
  section: string;
  display_name: string;
}

// Error handling
export interface APIError {
  provider: string;
  message: string;
  timestamp: Date;
}

// Provider configuration
export interface ProviderConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  enabled: boolean;
  priority: number;
  rateLimit: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
} 