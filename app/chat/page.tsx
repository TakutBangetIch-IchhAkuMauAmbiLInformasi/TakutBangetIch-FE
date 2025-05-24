"use client"

import { useState } from "react"
import { SearchHeader } from "@/components/search-header"
import { ChatInterface } from "@/components/chat-interface"
import { ReferencedPapers } from "@/components/referenced-papers"
import { mockPapers } from "@/lib/mock-data"

export default function ChatPage() {
  const [selectedPapers, setSelectedPapers] = useState<any[]>([])

  // Add a paper to the referenced papers sidebar
  const addReferencedPaper = (paperId: string) => {
    const paper = mockPapers.find((p) => p.id === paperId)
    if (paper && !selectedPapers.some((p) => p.id === paperId)) {
      setSelectedPapers((prev) => [...prev, paper])
    }
  }

  // Remove a paper from the referenced papers sidebar
  const removeReferencedPaper = (paperId: string) => {
    setSelectedPapers((prev) => prev.filter((p) => p.id !== paperId))
  }

  // Clear all papers from the sidebar
  const clearReferencedPapers = () => {
    setSelectedPapers([])
  }

  return (
    <main className="min-h-screen bg-white">
      <SearchHeader query="" />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5">
          <ChatInterface addReferencedPaper={addReferencedPaper} selectedPapers={selectedPapers} />
        </div>

      </div>
    </main>
  )
}
