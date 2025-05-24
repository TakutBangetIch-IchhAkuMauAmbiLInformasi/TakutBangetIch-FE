export interface SearchQuery {
  query: string;
  semantic_weight?: number;
  text_weight?: number;
  author?: string;
  category?: string;
  year?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  score: number;
  passage?: string;
  metadata?: {
    authors: string;
    categories: string;
    year: string;
    doi?: string;
    submitter?: string;
    [key: string]: any;
  };
  highlights?: {
    title?: string[];
    content?: string[];
    passage?: string[];
    [key: string]: string[] | undefined;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}
