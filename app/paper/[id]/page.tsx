import { PaperDetail } from "@/components/paper-detail"
import { SearchHeader } from "@/components/search-header"
import { mockPapers } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { getPaperById } from "@/lib/api"
import { SearchResult } from "@/types/search"

// Make this a dynamic page with server-side data fetching
export default async function PaperPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  let paper: SearchResult | undefined;
  
  // Await the params to properly handle it as a promise
  const resolvedParams = await params;
  
  try {
    // Try to fetch the paper from the API
    paper = await getPaperById(resolvedParams.id);
  } catch (error) {
    console.error("Failed to fetch paper from API:", error);
    // Fall back to mock data
    paper = mockPapers.find((p) => p.id === resolvedParams.id);
  }

  if (!paper) {
    notFound();
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
