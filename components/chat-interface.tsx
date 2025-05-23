"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  addReferencedPaper: (paperId: string) => void
  selectedPapers: any[]
}

export function ChatInterface({ addReferencedPaper, selectedPapers }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your academic research assistant. Ask me about any research topic, and I'll help you find relevant papers and insights.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample starter prompts
  const starterPrompts = [
    "What are the latest developments in quantum computing?",
    "Summarize research on climate change mitigation",
    "Find papers about machine learning in healthcare",
    "Explain the transformer architecture in NLP",
  ]

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking and referencing papers
    setTimeout(() => {
      // Randomly select 2-3 papers to reference
      const paperCount = Math.floor(Math.random() * 2) + 2
      const paperIds = ["2503.08420", "2504.01121", "2503.09876", "2505.12345", "2502.54321"]
      const selectedIds = paperIds.sort(() => 0.5 - Math.random()).slice(0, paperCount)

      // Add these papers to the sidebar
      selectedIds.forEach((id) => addReferencedPaper(id))

      // Generate AI response with paper references
      const aiResponse = generateAIResponse(input, selectedIds)

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  // Generate a mock AI response with paper references
  const generateAIResponse = (query: string, paperIds: string[]) => {
    // Simple response generation with paper citations
    const responses = [
      `Based on recent research, there have been significant developments in this area. According to [1], "${getRandomSentence()}" Furthermore, [2] states that "${getRandomSentence()}" ${paperIds.length > 2 ? `Additionally, [3] proposes that "${getRandomSentence()}"` : ""}`,
      `I found several relevant papers on this topic. The paper [1] discusses "${getRandomSentence()}" while [2] focuses on "${getRandomSentence()}" ${paperIds.length > 2 ? `The research in [3] complements these findings by showing that "${getRandomSentence()}"` : ""}`,
      `Research in this field has been evolving rapidly. In [1], researchers demonstrated that "${getRandomSentence()}" This aligns with findings in [2], which concluded "${getRandomSentence()}" ${paperIds.length > 2 ? `Interestingly, [3] builds on these concepts by showing that "${getRandomSentence()}"` : ""}`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Helper function to generate random sentences for the AI responses
  const getRandomSentence = () => {
    const sentences = [
      "The proposed method achieves state-of-the-art performance on benchmark datasets.",
      "Results indicate a significant improvement over previous approaches.",
      "The authors identify several key challenges that remain unsolved in this domain.",
      "This novel architecture demonstrates robust performance across diverse scenarios.",
      "Their analysis reveals important insights about the underlying mechanisms.",
      "The framework addresses critical limitations of existing methodologies.",
      "Experimental results validate the theoretical predictions with high accuracy.",
      "This approach offers a promising direction for future research in the field.",
    ]

    return sentences[Math.floor(Math.random() * sentences.length)]
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 bg-blue-100">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: message.content.replace(
                        /\[(\d+)\]/g,
                        '<span class="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-medium rounded-full h-5 w-5 cursor-pointer hover:bg-blue-200">$1</span>',
                      ),
                    }}
                  />
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-blue-100">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Analyzing relevant research...</div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          {messages.length === 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Try asking about:</h3>
              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInput(prompt)
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about research papers..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
