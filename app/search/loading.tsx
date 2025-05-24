import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header placeholder */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex relative w-full max-w-lg">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Overview placeholder */}
        <div className="w-full mb-8">
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>

        {/* Search results placeholder */}
        <div className="space-y-6">
          <div className="flex items-center">
            <Skeleton className="h-6 w-48" />
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 border rounded-lg p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
