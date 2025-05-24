"use client"

import { useState, useEffect } from "react"
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface AiInsightsCardProps {
  paperId: string
  isExpanded: boolean
  onToggle: () => void
}

interface InsightsResponse {
  paper_id: string
  insights: string
  generated_at: string
}

export function AiInsightsCard({ paperId, isExpanded, onToggle }: AiInsightsCardProps) {
  const [insights, setInsights] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const generateInsights = async () => {
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch(`/api/paper/${paperId}/insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to generate insights: ${response.status}`)
      }

      const data: InsightsResponse = await response.json()
      console.log('Raw insights data:', data.insights)
      setInsights(data.insights)
    } catch (err) {
      console.error('Error generating insights:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate insights')
    } finally {
      setLoading(false)
    }
  }  // Function to convert plain text to markdown format
  const preprocessTextToMarkdown = (text: string): string => {
    if (!text) return text

    let processedText = text
      // Remove markdown code fences that interfere with processing
      .replace(/```markdown\s*/g, '')
      .replace(/```\s*/g, '')
      
      // Clean up any existing markdown artifacts
      .replace(/\*\*/g, '**')
      .replace(/##/g, '##')
      
      // Convert headers - lines that end with "Summary", "Findings", "Methodology", etc.
      .replace(/^(## )(.+)$/gm, '## $2')
      .replace(/^([A-Z][a-zA-Z\s&]+)$/gm, (match) => {
        // Only convert to header if it's a typical section title
        if (match.match(/^(Executive Summary|Key Findings|Methodology|Significance|Impact|Technical Innovation|Background|Results|Conclusion|Discussion|Future Work)$/)) {
          return ## ${match}
        }
        return match
      })
      
      // Convert bullet points - lines starting with "- " or "• "
      .replace(/^[\s]*[-•]\s*(.+)$/gm, '- $1')
      
      // Convert numbered lists
      .replace(/^[\s]*(\d+)\.\s*(.+)$/gm, '$1. $2')
      
      // Convert bold text - text within **text** format
      .replace(/\*\*([^*]+)\*\*/g, '**$1**')
      
      // Convert percentage and numerical highlights
      .replace(/(\d+%)/g, '**$1**')
      .replace(/(\d+\.\d+%)/g, '**$1**')
      
      // Convert technical terms and models in parentheses or specific patterns
      .replace(/\b([A-Z]{2,})\b/g, '**$1**') // Acronyms like CNN, GRU
      .replace(/\b(GRUConv|3D-CNN|GRU)\b/g, '**$1**') // Specific technical terms
      
      // Ensure proper spacing around headers
      .replace(/^##\s*(.+)$/gm, '\n## $1\n')
      
      // Clean up multiple newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    return processedText
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(insights)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Generate insights when the component first loads and is expanded
  useEffect(() => {
    if (isExpanded && !insights && !loading && !error) {
      generateInsights()
    }
  }, [isExpanded, paperId])

  return (
    <Card className="border-blue-100">
      <CardHeader
        className="py-4 px-6 flex flex-row items-center justify-between cursor-pointer bg-blue-50/50"
        onClick={onToggle}
      >
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI Insights
        </CardTitle>
        <div className="flex items-center gap-2">
          {isExpanded && insights && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1"
              onClick={(e) => {
                e.stopPropagation()
                generateInsights()
              }}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-xs">Refresh</span>
            </Button>
          )}
        </div>
      </CardHeader>      {isExpanded && (
        <CardContent className="px-6 py-4 max-w-full overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                <span className="text-gray-600">Generating AI insights...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">{error}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={generateInsights}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}          {insights && !loading && (
            <div className="space-y-4">              {/* Debug section to show raw and processed content */}

                <div className="prose prose-sm max-w-none overflow-hidden break-words w-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h4 className="text-base font-medium text-gray-900 mb-2 mt-4" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h5 className="text-sm font-medium text-gray-900 mb-2 mt-3" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-700 mb-3 leading-relaxed" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 space-y-1 mb-3 text-gray-700" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5 space-y-1 mb-3 text-gray-700" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-gray-700 leading-relaxed" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold text-gray-900" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-gray-700" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-blue-600 underline" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props} />
                    ),
                    pre: ({ node, ...props }) => (
                      <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm border border-gray-200" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-blue-200 pl-4 py-2 bg-blue-50 text-gray-700 italic mb-3" {...props} />
                    ),
                    hr: ({ node, ...props }) => <hr className="border-gray-200 my-4" {...props} />,
                  }}
                >
                  {preprocessTextToMarkdown(insights)}
                </ReactMarkdown>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Generated by AI based on paper content. This summary may not capture all nuances of the original research.
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-xs">Copy insights</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {!insights && !loading && !error && (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <div className="text-gray-600 mb-4">Generate AI-powered insights for this paper</div>
              <Button
                variant="outline"
                onClick={generateInsights}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                                Generate Insights
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}