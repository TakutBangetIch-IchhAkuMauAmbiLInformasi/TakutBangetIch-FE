"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getAutocomplete } from "@/lib/api"

export function SearchHeader({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query || "")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
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
    
    // Clear suggestions if input is too short
    if (!value || value.length < 3) {
      setSuggestions([]);
      return;
    }
    
    // Fetch autocomplete suggestions
    setLoading(true);
    getAutocomplete(value)
      .then((results) => {
        setSuggestions(results);
      })
      .catch((err) => {
        console.error("Autocomplete error:", err);
        setSuggestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            AcademicSearch
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
              
              {suggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                  <ul className="py-1">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                        onClick={() => {
                          setSearchQuery(suggestion)
                          setSuggestions([])
                          router.push(`/search?q=${encodeURIComponent(suggestion)}`)
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Link href="/chat">
            <Button size="sm">Chat with AI</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
