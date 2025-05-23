import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { AiOverviewCard } from "@/components/ai-overview-card"
import { SearchHeader } from "@/components/search-header"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""

  return (
    <main className="min-h-screen bg-white">
      <SearchHeader query={query} />
      <div className="container mx-auto px-4 py-8">
        <AiOverviewCard query={query} />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="md:w-1/4 lg:w-1/5">
            <SearchFilters />
          </div>
          <div className="md:w-3/4 lg:w-4/5">
            <SearchResults query={query} />
          </div>
        </div>
      </div>
    </main>
  )
}
