import Link from "next/link"
import { Bookmark, Share2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchResult } from "@/types/search"

interface PaperCardProps {
  paper: SearchResult
  query: string
}

export function PaperCard({ paper, query }: PaperCardProps) {
  // Function to highlight search terms in text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(`(${searchTerm.trim()})`, "gi")
    return text.replace(regex, '<em class="bg-yellow-100 not-italic">$1</em>')
  }

  // Use API highlights if available, otherwise highlight manually
  const highlightedTitle = paper.highlights?.title 
    ? paper.highlights.title[0]
    : highlightText(paper.title, query);
  
  const highlightedAbstract = paper.highlights?.content 
    ? paper.highlights.content[0] 
    : highlightText(paper.content.substring(0, 250) + "...", query);

  // Format categories as badges
  const categories = paper.metadata?.categories?.split(" ") || []

  return (
    <Card className="overflow-hidden hover:border-blue-200 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 mb-1">{paper.id}</div>
            <Link href={`/paper/${paper.id}`}>
              <h3
                className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                dangerouslySetInnerHTML={{ __html: highlightedTitle }}
              />
            </Link>
            <div className="text-sm text-gray-600">{paper.metadata?.authors || "Unknown Authors"}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category: string) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {paper.metadata?.year && (
                <span className="text-xs text-gray-500">{paper.metadata.year}</span>
              )}
              {paper.metadata?.doi && (
                <a
                  href={`https://doi.org/${paper.metadata.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  DOI: {paper.metadata.doi}
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
              <span className="font-medium">{paper.score.toFixed(1)}</span>
              <span className="text-xs">relevance</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlightedAbstract }} />
        </div>

        {paper.highlights && paper.highlights.passage && paper.highlights.passage.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Highlighted Passages</h4>
            <div className="text-sm text-gray-700">{paper.highlights.passage[0]}</div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Bookmark className="h-4 w-4" />
            <span className="text-xs">Save</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <FileText className="h-4 w-4" />
            <span className="text-xs">Cite</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Share2 className="h-4 w-4" />
            <span className="text-xs">Share</span>
          </Button>
        </div>

        <Link href={`/paper/${paper.id}`}>
          <Button size="sm" variant="outline" className="h-8">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
