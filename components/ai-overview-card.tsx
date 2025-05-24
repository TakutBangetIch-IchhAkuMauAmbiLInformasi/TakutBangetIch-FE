"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Loader2, Sparkles } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { getQuerySummary } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from 'react-markdown'
import Link from "next/link"

export function AiOverviewCard({ query }: { query: string }) {
  const [expanded, setExpanded] = useState(true)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Only fetch summary if there's a query and the card is expanded
    if (query && expanded && !summary && !loading) {
      setLoading(true)
      setError(null)
      
      getQuerySummary(query)
        .then(response => {
          setSummary(response.summary)
          setRetryCount(0) // Reset retry count on success
        })
        .catch(err => {
          console.error('Failed to fetch summary:', err)
          setError('Failed to generate summary. Retrying...')
          
          // Implement exponential backoff for retries
          if (retryCount < 3) { // Limit to 3 retries
            const retryDelay = Math.min(10000, 5000 * Math.pow(2, retryCount))
            console.log(`Retrying summary in ${retryDelay/1000} seconds...`)
            
            // Clear any existing timeout
            if (retryTimeoutRef.current) {
              clearTimeout(retryTimeoutRef.current)
            }
            
            // Set new retry timeout
            retryTimeoutRef.current = setTimeout(() => {
              setRetryCount(prevCount => prevCount + 1)
              setLoading(false) // This will trigger the effect again
            }, retryDelay)
          } else {
            setError('Failed to generate summary after multiple attempts.')
          }
        })
        .finally(() => {
          if (retryCount >= 3) {
            setLoading(false)
          }
        })
    }
  }, [query, expanded, summary, loading, retryCount])

  return (
    <Card className="w-full border-blue-100 bg-blue-50/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI-Generated Overview
          {loading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="h-8 w-8 p-0">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {expanded && (
        <CardContent>
          <div className="text-sm text-gray-700 space-y-3">
            {loading ? (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : summary ? (
              <ReactMarkdown 
                components={{
                  // Process citations to make them clickable links
                  text: ({node, ...props}) => {
                    const text = props.children as string;
                    
                    // Check if this is a citation pattern like [0] or [1]
                    if (text && typeof text === 'string' && /\[\d+\]/.test(text)) {
                      // Split by citation pattern
                      const parts = text.split(/(\[\d+\])/g);
                      
                      return (
                        <>
                          {parts.map((part, index) => {
                            // If it matches citation pattern [n], create a link
                            const citationMatch = part.match(/\[(\d+)\]/);
                            if (citationMatch) {
                              const citationNum = citationMatch[1];
                              return (
                                <Link 
                                  key={index} 
                                  href={`/paper/${citationNum}`}
                                  className="text-blue-500 hover:underline"
                                >
                                  {part}
                                </Link>
                              );
                            }
                            // Otherwise render as plain text
                            return <span key={index}>{part}</span>;
                          })}
                        </>
                      );
                    }
                    
                    return <span {...props} />;
                  }
                }}
              >
                {summary}
              </ReactMarkdown>
            ) : !query ? (
              <p>Enter a search query to see an AI-generated overview of the results.</p>
            ) : (
              <p>Preparing summary for: <strong>{query}</strong>...</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
