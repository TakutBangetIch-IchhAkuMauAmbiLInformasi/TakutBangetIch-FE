"use client"

import { useState, useEffect } from "react"
import { PaperCard } from "@/components/paper-card"
import { Skeleton } from "@/components/ui/skeleton"
import { mockPapers } from "@/lib/mock-data"
import { SearchQuery, SearchResult } from "@/types/search"
import { searchPapers } from "@/lib/api"

export function SearchResults({ query }: { query: string }) {
  const [loading, setLoading] = useState(true)
  const [papers, setPapers] = useState<SearchResult[]>([])
  const [resultsCount, setResultsCount] = useState(0)
  const [searchTime, setSearchTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query || query.trim() === "") {
      setPapers([]);
      setResultsCount(0);
      setLoading(false);
      return;
    }

    // Set loading state
    setLoading(true);
    setError(null);
    
    const startTime = Date.now();

    // Create search query object
    const searchQuery: SearchQuery = {
      query,
      semantic_weight: 0.7,
      text_weight: 0.3,
      limit: 10,
      offset: 0
    };

    // Log API URL to debug connection issues
    console.log("API URL:", process.env.NEXT_PUBLIC_SEARCH_ENGINE_URL);
    
    // Fetch search results from API
    searchPapers(searchQuery)
      .then((response) => {
        setPapers(response.results);
        setResultsCount(response.total);
        setSearchTime((Date.now() - startTime) / 1000);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setError("Failed to fetch search results. Please try again.");
        // Fallback to mock data in case of error
        const filteredPapers = mockPapers.filter(
          (paper) =>
            paper.title.toLowerCase().includes(query.toLowerCase()) ||
            paper.metadata.authors.toLowerCase().includes(query.toLowerCase()) ||
            paper.metadata.categories.toLowerCase().includes(query.toLowerCase()) ||
            paper.content.toLowerCase().includes(query.toLowerCase()),
        );
        setPapers(filteredPapers);
        setResultsCount(filteredPapers.length);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Skeleton className="h-6 w-48" />
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 border rounded-lg p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          About <span className="font-medium">{resultsCount}</span> results ({searchTime.toFixed(2)} seconds)
        </div>
      </div>

      {papers.length > 0 ? (
        <div className="space-y-6">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} query={query} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}
