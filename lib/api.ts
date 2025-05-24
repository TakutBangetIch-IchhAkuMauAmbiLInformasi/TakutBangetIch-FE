import { SearchQuery, SearchResponse, SearchResult } from "@/types/search";

const API_BASE_URL = process.env.NEXT_PUBLIC_SEARCH_ENGINE_URL || 'http://localhost:8080';
const API_PREFIX = '/api/v1';

// Log the API base URL to debug configuration
console.log("API Client Initialized with URL:", API_BASE_URL, "Environment variable value:", process.env.NEXT_PUBLIC_SEARCH_ENGINE_URL);

export async function searchPapers(query: SearchQuery): Promise<SearchResponse> {
  const url = `${API_BASE_URL}${API_PREFIX}/search`;
  
  // Debug log
  console.log("Making search request to:", url);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
}

export async function getAutocomplete(prefix: string, limit: number = 5): Promise<string[]> {
  const url = `${API_BASE_URL}${API_PREFIX}/autocomplete?prefix=${encodeURIComponent(prefix)}&limit=${limit}`;
  
  console.log("Autocomplete URL:", url);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Autocomplete raw response:", data);
    
    // Handle Elasticsearch suggestions format
    if (data.suggest && data.suggest.title_suggest && data.suggest.title_suggest.length > 0) {
      const options = data.suggest.title_suggest[0].options || [];
      return options.map((option: any) => option.text);
    }
    
    // Fallback for other response formats or empty results
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Autocomplete API error:', error);
    // Return mock suggestions during development to avoid breaking UI
    return [`${prefix} example`, `${prefix} research`, `${prefix} paper`];
  }
}

export async function getCategories(): Promise<string[]> {
  const url = `${API_BASE_URL}${API_PREFIX}/categories`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Categories API error:', error);
    return [];
  }
}

export async function searchByAuthor(author: string, limit: number = 10, offset: number = 0): Promise<SearchResponse> {
  const url = `${API_BASE_URL}${API_PREFIX}/author/${encodeURIComponent(author)}?limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Author search API error:', error);
    throw error;
  }
}

export async function searchByDoi(doi: string): Promise<SearchResponse> {
  const url = `${API_BASE_URL}${API_PREFIX}/doi/${encodeURIComponent(doi)}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('DOI search API error:', error);
    throw error;
  }
}

// Fetch a specific paper by ID
export async function getPaperById(id: string): Promise<SearchResult> {
  const url = `${API_BASE_URL}${API_PREFIX}/paper/${encodeURIComponent(id)}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Paper fetch API error:', error);
    throw error;
  }
}
