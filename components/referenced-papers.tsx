"use client"

import Link from "next/link"
import { X, FileText, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ReferencedPapersProps {
  papers: any[]
  removePaper: (id: string) => void
  clearPapers: () => void
}

export function ReferencedPapers({ papers, removePaper, clearPapers }: ReferencedPapersProps) {
  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Referenced Papers</CardTitle>
        {papers.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearPapers} className="h-8 gap-1">
            <RefreshCw className="h-4 w-4" />
            <span className="text-xs">Clear All</span>
          </Button>
        )}
      </CardHeader>

      <ScrollArea className="flex-1 h-[calc(100%-4rem)]">
        <CardContent className="p-4">
          {papers.length > 0 ? (
            <div className="space-y-4">
              {papers.map((paper, index) => (
                <div key={paper.id} className="relative">
                  <Card className="border-gray-200 hover:border-blue-200 transition-colors">
                    <CardContent className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                        onClick={() => removePaper(paper.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-medium rounded-full h-5 w-5">
                          {index + 1}
                        </div>
                        <div className="text-xs text-gray-500">{paper.id}</div>
                      </div>

                      <Link href={`/paper/${paper.id}`}>
                        <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 mb-1">
                          {paper.title}
                        </h3>
                      </Link>

                      <div className="text-xs text-gray-600 mb-2">{paper.metadata.authors}</div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {paper.metadata.categories.split(" ").map((category: string) => (
                          <Badge key={category} variant="outline" className="text-xs px-1 py-0">
                            {category}
                          </Badge>
                        ))}
                        <span className="text-xs text-gray-500">{paper.metadata.year}</span>
                      </div>

                      <div className="text-xs text-gray-700 line-clamp-3">{paper.content.substring(0, 150)}...</div>

                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          <span className="font-medium">{paper.score.toFixed(1)}</span>
                          <span className="text-xs">relevance</span>
                        </div>

                        <Link href={`/paper/${paper.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 gap-1">
                            <FileText className="h-3 w-3" />
                            <span className="text-xs">View</span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <FileText className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No papers referenced yet</h3>
              <p className="text-sm text-gray-600">
                Ask a question about research topics, and I'll reference relevant papers here.
              </p>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
