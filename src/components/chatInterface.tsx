"use client"

import { useState } from "react"
import { ChatContainer } from "@/components/chat-container"
import { ChatInput } from "@/components/chat-input"
import type { Message } from "@/types/chat"

interface ApiResponse {
  sql?: string
  results?: Record<string, unknown>[]
  response?: string
  timestamp?: string
  error?: string
  details?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI E-commerce Data Agent. I can help you analyze your sales data, calculate metrics like RoAS, and answer questions about your products and performance. What would you like to explore?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [question, setQuestion] = useState("")

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: content }),
      })

      const data: ApiResponse = await res.json()

      if (data.error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: `Error: ${data.error}${data.details ? ` - ${data.details}` : ""}`,
          timestamp: new Date(),
          isError: true,
        }
        setMessages((prev) => [...prev, errorMessage])
      } else {
        // Start streaming effect
        setIsLoading(false)
        setIsStreaming(true)
        simulateStreamingResponse(data)
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Failed to get response. Please try again.",
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateStreamingResponse = (data: ApiResponse) => {
    let response = data.response || "Here are your results:"

    // Add context about the data if we have results
    if (data.results && data.results.length > 0) {
      if (data.results.length === 1 && Object.keys(data.results[0]).length === 1) {
        const value = Object.values(data.results[0])[0]
        response = `The answer is: ${value}`
      } else {
        response = `${data.response || "Query completed successfully"}. Found ${data.results.length} result(s).`
      }
    }

    let currentIndex = 0
    const streamInterval = setInterval(() => {
      if (currentIndex < response.length) {
        setStreamingMessage((prev) => prev + response[currentIndex])
        currentIndex++
      } else {
        clearInterval(streamInterval)

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: response,
          timestamp: new Date(),
          sql: data.sql,
          results: data.results,
          hasData: !!(data.results && data.results.length > 0),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setStreamingMessage("")
        setIsStreaming(false)
      }
    }, 30)
  }

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E5E7EB] font-sans">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white">AI E-commerce Data Agent</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Ask questions about your sales data, products, and performance metrics
          </p>
        </div>

        {/* Chat Container */}
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          streamingMessage={streamingMessage}
          isStreaming={isStreaming}
          onSendMessage={handleSendMessage}
        />

        {/* Suggested Questions Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-3 text-white">Try these questions:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "What is my total sales?",
              "Calculate the RoAS",
              "Which product had the highest CPC?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className="px-3 py-2 bg-[#1F2937] text-[#E5E7EB] rounded-full text-sm hover:bg-[#374151] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} question={question} setQuestion={setQuestion} />
      </div>
    </div>
  )
}
