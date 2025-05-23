"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AiOverviewCard({ query }: { query: string }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <Card className="w-full border-blue-100 bg-blue-50/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI-Generated Overview
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="h-8 w-8 p-0">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {expanded && (
        <CardContent>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              Recent research on <strong>{query}</strong> has shown significant advancements in the field. The papers in
              these results primarily focus on novel methodologies, improved accuracy, and practical applications across
              various domains.
            </p>
            <p>
              Key findings include improved algorithms for processing large datasets, novel approaches to feature
              extraction, and innovative applications in healthcare and finance. Several papers demonstrate
              state-of-the-art results on benchmark datasets.
            </p>
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sources</h4>
              <div className="flex flex-wrap gap-2">
                {["2503.08420", "2504.01121", "2503.09876"].map((id) => (
                  <div key={id} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                    {id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
