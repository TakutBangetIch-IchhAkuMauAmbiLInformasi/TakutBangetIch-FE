import { SearchHeader } from "@/components/search-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <SearchHeader query="" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-32" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Abstract Card */}
            <Card>
              <CardHeader className="py-4 px-6">
                <CardTitle className="text-lg font-medium">Abstract</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* AI Summary Card */}
            <Card className="border-blue-100">
              <CardHeader className="py-4 px-6 bg-blue-50/50">
                <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
