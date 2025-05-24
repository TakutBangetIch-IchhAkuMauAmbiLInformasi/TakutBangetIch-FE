"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchHeader({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query || "")
  const router = useRouter()
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery?.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
  }
  
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            SkripsiGratis
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-lg">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for papers, topics, or authors..."
                className="w-full pl-10 pr-4 py-2 rounded-md"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/chat">
            <Button size="sm">Chat with AI</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
