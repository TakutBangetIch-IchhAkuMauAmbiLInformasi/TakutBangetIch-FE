import { PaperDetail } from "@/components/paper-detail"
import { SearchHeader } from "@/components/search-header"
import { mockPapers } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default function PaperPage({ params }: { params: { id: string } }) {
  const paper = mockPapers.find((p) => p.id === params.id)

  if (!paper) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <SearchHeader query="" />
      <div className="container mx-auto px-4 py-8">
        <PaperDetail paper={paper} />
      </div>
    </main>
  )
}
