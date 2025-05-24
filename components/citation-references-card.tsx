"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CitationReference {
  id: string;  // Paper ID (e.g., 2502.05707)
  index: number; // Citation index (e.g., 0, 1, 2)
}

interface CitationReferencesCardProps {
  citations: CitationReference[];
  title?: string;
}

export function CitationReferencesCard({ 
  citations, 
  title = "Citation References" 
}: CitationReferencesCardProps) {
  const [expanded, setExpanded] = useState(true)

  // If there are no citations, don't render the card
  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <Card className="w-full border-blue-100 bg-blue-50/50 mt-4">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          {title} ({citations.length})
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="h-8 w-8 p-0">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {expanded && (
        <CardContent>
          <ul className="space-y-2 text-sm">
            {citations.map((citation) => (
              <li key={`citation-${citation.index}-${citation.id}`} className="flex items-center">
                <span className="mr-2">[{citation.index}]</span>
                <Link 
                  href={`/paper/${citation.id}`}
                  className="text-blue-500 hover:underline hover:text-blue-700 transition-colors"
                >
                  {citation.id}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  )
}
