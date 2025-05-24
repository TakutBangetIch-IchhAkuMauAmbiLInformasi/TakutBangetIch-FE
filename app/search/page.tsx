import { SearchResults } from "@/components/search-results"
import { AiOverviewCard } from "@/components/ai-overview-card"
import { SearchHeader } from "@/components/search-header"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string } | Promise<{ q?: string }>
}) {
  // Await the searchParams to properly handle it as a promise
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || ""

  return (
    <main className="min-h-screen bg-white">
      <SearchHeader query={query} />
      <div className="container mx-auto px-4 py-8">
        {/* AI Overview Card loads independently */}
        <div className="mb-8">
          <AiOverviewCard query={query} />
        </div>

        {/* Search Results load independently */}
        <div>
          <SearchResults query={query} />
        </div>
      </div>
    </main>
  )
}
