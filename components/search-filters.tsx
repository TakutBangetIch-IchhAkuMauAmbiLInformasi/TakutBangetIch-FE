"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SearchFilters() {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    year: true,
    authors: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const csCategories = [
    { id: "cs.AI", label: "Artificial Intelligence" },
    { id: "cs.CV", label: "Computer Vision" },
    { id: "cs.LG", label: "Machine Learning" },
    { id: "cs.CL", label: "Computation and Language" },
    { id: "cs.NE", label: "Neural and Evolutionary Computing" },
    { id: "cs.IR", label: "Information Retrieval" },
    { id: "cs.HC", label: "Human-Computer Interaction" },
    { id: "cs.SE", label: "Software Engineering" },
  ]

  const years = [2025, 2024, 2023, 2022, 2021]

  const authors = ["Geoffrey Hinton", "Yann LeCun", "Yoshua Bengio", "Andrew Ng", "Ian Goodfellow"]

  return (
    <div className="space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          Clear All
        </Button>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => toggleSection("categories")}>
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            Categories
            {expandedSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>

        {expandedSections.categories && (
          <CardContent className="pt-0 px-4 pb-3">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {csCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.label}
                    <span className="text-gray-500 ml-1">({category.id})</span>
                  </label>
                </div>
              ))}
            </div>

            {csCategories.length > 8 && (
              <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs">
                Show more categories
              </Button>
            )}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => toggleSection("year")}>
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            Publication Year
            {expandedSections.year ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>

        {expandedSections.year && (
          <CardContent className="pt-0 px-4 pb-3">
            <div className="space-y-6">
              <div className="pt-4">
                <Slider defaultValue={[2020, 2025]} min={2000} max={2025} step={1} />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>2000</span>
                  <span>2025</span>
                </div>
              </div>

              <div className="space-y-2">
                {years.map((year) => (
                  <div key={year} className="flex items-center space-x-2">
                    <Checkbox id={`year-${year}`} />
                    <label
                      htmlFor={`year-${year}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {year}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => toggleSection("authors")}>
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            Authors
            {expandedSections.authors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>

        {expandedSections.authors && (
          <CardContent className="pt-0 px-4 pb-3">
            <div className="space-y-2">
              {authors.map((author) => (
                <div key={author} className="flex items-center space-x-2">
                  <Checkbox id={`author-${author.replace(/\s+/g, "-")}`} />
                  <label
                    htmlFor={`author-${author.replace(/\s+/g, "-")}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {author}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
