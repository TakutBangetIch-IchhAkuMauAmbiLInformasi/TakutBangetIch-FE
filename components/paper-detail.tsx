"use client"
import Link from "next/link"
import {
  Download,
  Bookmark,
  Share2,
  FileText,
  Copy,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function PaperDetail({ paper }: { paper: any }) {
  const [expandedSections, setExpandedSections] = useState({
    abstract: true,
    aiSummary: true,
    highlights: true,
    metadata: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Format categories as badges
  const categories = paper.metadata.categories.split(" ")

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">{paper.id}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{paper.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {paper.metadata.authors.split(", ").map((author: string) => (
            <Link
              key={author}
              href={`/search?q=${encodeURIComponent(author)}`}
              className="text-blue-600 hover:underline"
            >
              {author}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category: string) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
          <span className="text-gray-500">{paper.metadata.year}</span>
          {paper.metadata.doi && (
            <a
              href={`https://doi.org/${paper.metadata.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              DOI: {paper.metadata.doi}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Cite
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Abstract Card */}
        <Card>
          <CardHeader
            className="py-4 px-6 flex flex-row items-center justify-between cursor-pointer"
            onClick={() => toggleSection("abstract")}
          >
            <CardTitle className="text-lg font-medium">Abstract</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {expandedSections.abstract ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>

          {expandedSections.abstract && (
            <CardContent className="px-6 py-2">
              <div className="text-gray-700 space-y-4">
                <p>{paper.content}</p>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 h-8 gap-1">
                <Copy className="h-4 w-4" />
                <span className="text-xs">Copy to clipboard</span>
              </Button>
            </CardContent>
          )}
        </Card>

        {/* AI-Generated Summary Card */}
        <Card className="border-blue-100">
          <CardHeader
            className="py-4 px-6 flex flex-row items-center justify-between cursor-pointer bg-blue-50/50"
            onClick={() => toggleSection("aiSummary")}
          >
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              AI Insights
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {expandedSections.aiSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>

          {expandedSections.aiSummary && (
            <CardContent className="px-6 py-4">
              <div className="text-gray-700 space-y-4">
                <p>
                  This paper presents a comprehensive overview of generalizable and explainable deep learning methods
                  for medical image computing. The authors address two critical challenges in the field: the
                  generalizability of models across different datasets and the explainability of complex deep learning
                  systems.
                </p>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Findings</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The paper identifies domain shift as a major challenge in medical imaging AI</li>
                    <li>It categorizes generalization methods into data-centric and model-centric approaches</li>
                    <li>The authors propose a taxonomy of explainability methods specific to medical imaging</li>
                    <li>The work highlights the trade-off between model performance and interpretability</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Methodology</h4>
                  <p>
                    The authors conduct a systematic review of recent literature, analyzing over 100 papers on
                    generalizability and explainability in medical imaging. They propose a unified framework that
                    categorizes methods based on their technical approach and application domain.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Significance</h4>
                  <p>
                    This work provides a valuable roadmap for researchers and practitioners in medical AI, offering
                    insights into which methods are most appropriate for different clinical scenarios. The paper's
                    comprehensive taxonomy will likely serve as a reference for future research in the field.
                  </p>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  Generated by AI based on paper content. This summary may not capture all nuances of the original
                  research.
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Content Highlights */}
        {paper.highlights && paper.highlights.passage && paper.highlights.passage.length > 0 && (
          <Card>
            <CardHeader
              className="py-4 px-6 flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSection("highlights")}
            >
              <CardTitle className="text-lg font-medium">Content Highlights</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {expandedSections.highlights ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>

            {expandedSections.highlights && (
              <CardContent className="px-6 py-2">
                <div className="space-y-4">
                  {paper.highlights.passage.map((passage: string, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                      <p className="text-gray-700">{passage}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        Page {Math.floor(Math.random() * 20) + 1}, Section {Math.floor(Math.random() * 5) + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Metadata Grid */}
        <Card>
          <CardHeader
            className="py-4 px-6 flex flex-row items-center justify-between cursor-pointer"
            onClick={() => toggleSection("metadata")}
          >
            <CardTitle className="text-lg font-medium">Metadata</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {expandedSections.metadata ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>

          {expandedSections.metadata && (
            <CardContent className="px-6 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Categories</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {categories.map((category: string) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Publication Year</h4>
                  <p className="mt-1">{paper.metadata.year}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">DOI</h4>
                  <p className="mt-1">
                    {paper.metadata.doi ? (
                      <a
                        href={`https://doi.org/${paper.metadata.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {paper.metadata.doi}
                      </a>
                    ) : (
                      "Not available"
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Submitter</h4>
                  <p className="mt-1">{paper.metadata.submitter || "Unknown"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Paper Type</h4>
                  <p className="mt-1">Preprint</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Related Categories</h4>
                  <p className="mt-1">cs.AI, cs.LG, cs.CV</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Citation Formats */}
        <Card>
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-lg font-medium">Citation Formats</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">APA</h4>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Copy className="h-4 w-4" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100">
                  {paper.metadata.authors
                    .split(", ")
                    .map((author: string) => {
                      const nameParts = author.split(" ")
                      const lastName = nameParts.pop()
                      const initials = nameParts.map((part: string) => `${part.charAt(0)}.`).join(" ")
                      return `${lastName}, ${initials}`
                    })
                    .join(", ")}{" "}
                  ({paper.metadata.year}). {paper.title}. <em>arXiv preprint arXiv:{paper.id}</em>.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">BibTeX</h4>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Copy className="h-4 w-4" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100 overflow-x-auto">
                  {`@article{${paper.id.split(".")[1]}${paper.metadata.year},
  title={${paper.title}},
  author={${paper.metadata.authors}},
  journal={arXiv preprint arXiv:${paper.id}},
  year={${paper.metadata.year}}
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
