"use client"

import { useEffect, useRef } from "react"
import type { Message } from "@/types/chat"
import { ChatMessage} from "@/components/chat-message" 
import { SkeletonLoader } from "@/components/skeleton-loader" 
import { StreamingMessage } from "@/components/streaming-message"

interface ChatContainerProps {
  messages: Message[]
  isLoading: boolean
  streamingMessage: string
  isStreaming: boolean
  onSendMessage: (message: string) => void
}

export function ChatContainer({ messages, isLoading, streamingMessage, isStreaming }: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamingMessage])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
>
  <style jsx>{`
    div::-webkit-scrollbar {
      display: none;
    }
  `}</style>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && <SkeletonLoader />}

      {isStreaming && <StreamingMessage content={streamingMessage} />}
    </div>
  )
}
