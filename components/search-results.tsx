"use client"

import { useState, useEffect } from "react"
import { PaperCard } from "@/components/paper-card"
import { Skeleton } from "@/components/ui/skeleton"
import { mockPapers } from "@/lib/mock-data"

export function SearchResults({ query }: { query: string }) {
  const [loading, setLoading] = useState(true)
  const [papers, setPapers] = useState<any[]>([])
  const [resultsCount, setResultsCount] = useState(0)
  const [searchTime, setSearchTime] = useState(0)

  useEffect(() => {
    // Simulate loading
    setLoading(true)

    const timer = setTimeout(() => {
      // Filter mock papers based on query
      const filteredPapers = mockPapers.filter(
        (paper) =>
          paper.title.toLowerCase().includes(query.toLowerCase()) ||
          paper.metadata.authors.toLowerCase().includes(query.toLowerCase()) ||
          paper.metadata.categories.toLowerCase().includes(query.toLowerCase()) ||
          paper.content.toLowerCase().includes(query.toLowerCase()),
      )

      setPapers(filteredPapers)
      setResultsCount(filteredPapers.length)
      setSearchTime(Math.random() * 0.5 + 0.1) // Random time between 0.1 and 0.6 seconds
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [query])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
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

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select id="sort" className="text-sm border rounded-md px-2 py-1" defaultValue="relevance">
            <option value="relevance">Relevance</option>
            <option value="date">Date (newest)</option>
            <option value="citations">Citations</option>
          </select>
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
