"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Input from "../ui/input"


export default function Hero({
    title = "SkripsiGratis",
  }: {
    title?: string
  }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
  
    // Sample suggestions - in a real app, these might come from an API
    const allSuggestions = [
      "Components",
      "Templates",
      "Dashboard",
      "Landing Page",
      "Forms",
      "Authentication",
      "Cards",
      "Tables",
      "Charts",
      "Navigation",
      "Buttons",
      "Inputs",
      "Modals",
      "Dropdowns",
      "Tooltips",
      "Pricing Page",
      "Contact Form",
      "Blog Layout",
      "Portfolio",
      "E-commerce",
      "Admin Panel",
      "Dark Mode",
      "Responsive Design",
    ]
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchQuery(value)
  
      if (value.trim() === "") {
        setSuggestions([])
        setShowSuggestions(false)
      } else {
        // Filter suggestions based on input
        const filteredSuggestions = allSuggestions
          .filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 6) // Limit to 6 suggestions
  
        setSuggestions(filteredSuggestions)
        setShowSuggestions(true)
        setActiveSuggestionIndex(-1)
      }
    }
  
    const handleSuggestionClick = (suggestion: string) => {
      setSearchQuery(suggestion)
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // If no suggestions or not showing suggestions, do nothing
      if (!suggestions.length || !showSuggestions) return
  
      // Handle arrow up/down for navigation
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
        e.preventDefault()
        setSearchQuery(suggestions[activeSuggestionIndex])
        setShowSuggestions(false)
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    }
  
    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
          setShowSuggestions(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
  
    const words = title.split(" ")
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle search functionality here
      console.log("Searching for:", searchQuery)
      // In a real application, you would implement search functionality
      // or navigation to search results page
    }
  
    return (
      <div className="relative min-h-screen w-full flex flex-col bg-white dark:bg-neutral-950">
        {/* Hero Section */}
        <main className="flex-grow flex items-center justify-center">
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Animated Title */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                        }}
                        className="inline-block text-transparent bg-clip-text 
                                          bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                          dark:from-white dark:to-white/80"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
  
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto"
              >
                Ini Subtitle
              </motion.p>
  
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="max-w-2xl mx-auto relative"
              >
                <form ref={formRef} onSubmit={handleSearch} className="relative">
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-neutral-500 dark:text-neutral-400">
                      <Search className="h-5 w-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search academic paper, research, and more..."
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      className="
                            pl-12 pr-24 py-6 w-full text-base text-neutral-900 dark:text-white
                            rounded-full
                            border-neutral-300 dark:border-neutral-700
                            bg-white dark:bg-neutral-900
                            focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600
                            "
                    />
                    <div className="absolute right-2">
                      <Button
                        type="submit"
                        className="rounded-full px-5 py-2 h-10 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div 
                    className="absolute z-30 mt-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 max-h-60 overflow-auto"
                    style={{ 
                      width: formRef.current ? formRef.current.offsetWidth : '100%',
                      left: 0,
                      right: 0
                    }}
                  >
                    <ul className="py-1">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`px-4 py-2 text-left cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                            index === activeSuggestionIndex ? "bg-neutral-100 dark:bg-neutral-800" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <Search className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                            <span className="text-neutral-800 dark:text-neutral-200">{suggestion}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
  
              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-4 flex flex-wrap justify-center gap-2 relative z-10"
              >
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-2">Popular:</span>
                {["Lorem1", "Lorem2", "Lorem3"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-sm px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }
  