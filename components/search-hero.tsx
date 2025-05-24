"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchHero() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl md:text-6xl mb-4">
          SkripsiGratis
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find academic papers for your thesis for free
        </p>
      </div>

      <div className="w-full max-w-2xl relative">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for papers, topics, or authors..."
              className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-lg"
              value={query}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Button
              type="submit"
              className="absolute right-2 top-2 rounded-full h-10 px-6 bg-blue-600 hover:bg-blue-700"
            >
              Search
            </Button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            className="rounded-full text-sm"
            onClick={() => {
              setQuery("quantum computing latest developments")
              router.push(`/search?q=${encodeURIComponent("quantum computing latest developments")}`)
            }}
          >
            Latest in quantum computing
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-sm"
            onClick={() => {
              setQuery("machine learning healthcare")
              router.push(`/search?q=${encodeURIComponent("machine learning healthcare")}`)
            }}
          >
            ML in healthcare
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-sm"
            onClick={() => {
              setQuery("climate change mitigation research")
              router.push(`/search?q=${encodeURIComponent("climate change mitigation research")}`)
            }}
          >
            Climate change research
          </Button>
        </div>
      </div>
    </div>
  )
}
