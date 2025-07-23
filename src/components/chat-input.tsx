"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void
  question?: string
  setQuestion?: (question: string) => void
}

export function ChatInput({ onSendMessage, question, setQuestion }: ChatInputProps) {
  const [input, setInput] = useState("")

  // Update input when question prop changes (from suggested questions)
  useEffect(() => {
    if (question) {
      setInput(question)
      if (setQuestion) {
        setQuestion("") // Clear the question state after setting input
      }
    }
  }, [question, setQuestion])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="sticky bottom-0 bg-[#0E0E10] px-6 py-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your e-commerce data, sales metrics, or product performance..."
            className="w-full bg-[#1C1C1C] border border-[#2A2A2A] text-white rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-transparent placeholder-[#6B7280] font-sans"
            rows={1}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <Sparkles className="absolute right-3 top-3 w-5 h-5 text-[#FACC15] opacity-50" />
        </div>
        <Button
          type="submit"
          variant="default" size="icon"
        >
          <Send size={48} />
        </Button>
      </form>
    </div>
  )
}
