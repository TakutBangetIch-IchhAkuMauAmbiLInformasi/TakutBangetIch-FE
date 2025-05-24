"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Loader2, Sparkles } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { getQuerySummary } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from 'react-markdown'
import Link from "next/link"
import { CitationReferencesCard } from "@/components/citation-references-card"
import { useSearch } from "@/lib/search-context"

interface CitationReference {
  id: string;  // Paper ID (e.g., 2502.05707)
  index: number; // Citation index (e.g., 0, 1, 2)
}

export function AiOverviewCard({ query }: { query: string }) {
  const [expanded, setExpanded] = useState(true)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [citations, setCitations] = useState<CitationReference[]>([])
  const { searchTimestamp } = useSearch()
  const [lastProcessedQuery, setLastProcessedQuery] = useState<string>("")

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Effect to reset summary when query changes or searchTimestamp updates
  useEffect(() => {
    // Only reset if we have a new query or the search was triggered
    if (query !== lastProcessedQuery || (query && query === lastProcessedQuery && searchTimestamp)) {
      console.log("Resetting AI summary due to new query or search trigger")
      setSummary(null)
      setError(null)
      setRetryCount(0)
      setLastProcessedQuery(query)
    }
  }, [query, searchTimestamp])

  useEffect(() => {
    // Only fetch summary if there's a query and the card is expanded
    if (query && expanded && !summary && !loading) {
      setLoading(true)
      setError(null)
      setCitations([]) // Reset citations when loading new summary
      
      getQuerySummary(query)
        .then(response => {
          setSummary(response.summary)
          setRetryCount(0) // Reset retry count on success
          
          // Extract citations from summary
          extractCitations(response.summary)
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
          // Always set loading to false when request completes (success or max retries)
          setLoading(false)
        })
    }
  }, [query, expanded, summary, loading, retryCount])
  
  // Extract citations from summary text
  const extractCitations = (text: string | null) => {
    if (!text) return
    
    // Collection for unique citations
    const extractedCitations: CitationReference[] = []
    
    // Check for the raw citation pattern first
    console.log("Processing text for citations:", text);
    
    // Direct raw detection for **Citations** followed by paper IDs
    if (text.includes("**Citations**")) {
      console.log("Found raw citations marker");
      
      // Try more flexible pattern matching for variable number of citations
      const citationMatch = text.match(/\*\*Citations\*\*\\n([\s\S]*?)(?:\\n\\n|$)/);
      if (citationMatch && citationMatch[1]) {
        const citationBlock = citationMatch[1];
        console.log("Citation block detected:", citationBlock);
        
        // Split by newline and process each citation line
        const citationLines = citationBlock.split('\\n');
        console.log("Citation lines split:", citationLines);
        
        citationLines.forEach(line => {
          // Look for [index] paper_id pattern in each line
          const match = line.match(/\[(\d+)\]\s+(\d+\.\d+)/);
          if (match) {
            const index = parseInt(match[1], 10);
            const paperId = match[2];
            console.log(`Found citation: [${index}] ${paperId}`);
            // Avoid duplicates
            if (!extractedCitations.some(c => c.id === paperId)) {
              extractedCitations.push({ id: paperId, index });
            }
          }
        });
    }
    
    }
    
    // Format 2: Regular Citations line - "Citations [0] 2502.05707 [1] 2501.09123"
    if (extractedCitations.length === 0) {
      const citationLineMatch = text.match(/^Citations\s+((?:\[\d+\]\s+\d+\.\d+\s*)+)/m)
      if (citationLineMatch && citationLineMatch[1]) {
        // Extract all [index] paper_id patterns
        const citationMatches = Array.from(citationLineMatch[1].matchAll(/\[(\d+)\]\s+(\d+\.\d+)/g))
        
        citationMatches.forEach(match => {
          const index = parseInt(match[1], 10)
          const paperId = match[2]
          // Avoid duplicates
          if (!extractedCitations.some(c => c.id === paperId)) {
            extractedCitations.push({ id: paperId, index })
          }
        })
      }
    }
    
    // Format 3: Inline citations - "[2501.15687]"
    const inlineCitationMatches = Array.from(text.matchAll(/\[(\d+\.\d+)\]/g))
    inlineCitationMatches.forEach((match, idx) => {
      const paperId = match[1]
      // Avoid duplicates
      if (!extractedCitations.some(c => c.id === paperId)) {
        extractedCitations.push({ id: paperId, index: extractedCitations.length })
      }
    })
    
    console.log("Extracted citations:", extractedCitations);
    setCitations(extractedCitations)
  }

  // Custom citation renderer that handles different citation formats
  const renderCitations = (text: string) => {
    // Handle citation pattern like "Citations [0] 2502.05707 [1] 2501.09123 [2] 2501.15687"
    if (text.includes('Citations') && /\[\d+\]\s+\d+\.\d+/.test(text)) {
      // Match pattern: [number] paper_id - handles both with and without spaces
      const matches = Array.from(text.matchAll(/\[(\d+)\]\s+(\d+\.\d+)/g));
      if (matches && matches.length > 0) {
        let lastIndex = 0;
        const elements = [];
        
        // Add "Citations" text at the beginning if present
        const citationsIndex = text.indexOf('Citations');
        if (citationsIndex === 0) {
          elements.push(
            <span key="citations-text">
              Citations{" "}
            </span>
          );
          lastIndex = "Citations".length;
        }
        
        for (const match of matches) {
          // Add text before the match (except for the "Citations" part)
          if (match.index !== undefined && match.index > lastIndex) {
            elements.push(
              <span key={`text-${lastIndex}`}>
                {text.substring(lastIndex, match.index)}
              </span>
            );
          }
          
          // Add the citation with link
          if (match.index !== undefined) {
            elements.push(
              <span key={`citation-${match.index}`}>
                [<span>{match[1]}</span>]{" "}
                <Link 
                  href={`/paper/${match[2]}`}
                  className="text-blue-500 hover:underline"
                >
                  {match[2]}
                </Link>
                {" "}
              </span>
            );
            
            lastIndex = match.index + match[0].length;
          }
        }
        
        // Add any remaining text
        if (lastIndex < text.length) {
          elements.push(
            <span key={`text-end`}>
              {text.substring(lastIndex)}
            </span>
          );
        }
        
        return <>{elements}</>;
      }
    }
    
    // For normal citation pattern like [0] or [paper_id]
    if (/\[([^\]]+)\]/.test(text)) {
      const parts = text.split(/(\[[^\]]+\])/g);
      
      return (
        <>
          {parts.map((part, index) => {
            const citationMatch = part.match(/\[([^\]]+)\]/);
            if (citationMatch) {
              const citationId = citationMatch[1];
              // Check if the citation ID is a paper ID (number with dot)
              if (/\d+\.\d+/.test(citationId)) {
                return (
                  <Link 
                    key={index} 
                    href={`/paper/${citationId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {part}
                  </Link>
                );
              }
              // Check if it's just a number, which might be a reference to another citation
              return <span key={index}>{part}</span>;
            }
            return <span key={index}>{part}</span>;
          })}
        </>
      );
    }
    
    // Default case: return unchanged text
    return text;
  };

  return (
    <div className="space-y-2">
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
                    p: ({ children }) => {
                      // Check if the paragraph contains our special citation format
                      const firstChild = Array.isArray(children) ? children[0] : null;
                      if (firstChild && typeof firstChild === 'string') {
                        // Skip rendering citation sections entirely - they'll be shown in CitationReferencesCard
                        if (
                          // Bold citations format
                          firstChild.includes('**Citations**') || 
                          // Regular Citations format  
                          (firstChild.startsWith('Citations [') && /\[\d+\]\s+\d+\.\d+/.test(firstChild)) ||
                          // Just a citation line
                          /^\[\d+\]\s+\d+\.\d+/.test(firstChild)
                        ) {
                          console.log("Skipping citation paragraph:", firstChild);
                          return null; // Don't render this paragraph
                        }
                        
                        // Handle other citation formats
                        if (firstChild.includes('[') && firstChild.includes(']')) {
                          return <p>{renderCitations(firstChild)}</p>;
                        }
                      }
                      return <p>{children}</p>;
                    },
                    strong: ({ children }) => {
                      // Check if this is a citation header
                      if (children && children.toString() === 'Citations') {
                        console.log("Found Citations strong tag");
                        return null; // Hide it since we'll show it in the CitationReferencesCard
                      }
                      return <strong>{children}</strong>;
                    },
                    text: ({node, children}) => {
                      const text = children as string;
                      
                      // If this is a citation line, process it
                      if (text && typeof text === 'string') {
                        // Skip the citation lines - they will be shown in CitationReferencesCard
                        if (text.startsWith('Citations [') || 
                            text === 'Citations' || 
                            (text.startsWith('[') && /^\[\d+\]\s+\d+\.\d+/.test(text))) {
                          return null; // Don't render this text node
                        }
                        
                        // Handle citations within regular text
                        if (/\[(\d+)\]\s+\d+\.\d+/.test(text) || /\[([^\]]+)\]/.test(text)) {
                          return <>{renderCitations(text)}</>;
                        }
                      }
                      
                      return <>{children}</>;
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
      
      {/* Show the new citation references card if there are citations */}
      {citations.length > 0 && (
        <CitationReferencesCard citations={citations} />
      )}
    </div>
  )
}
