"use client"

import { useState, useEffect } from "react"

interface StreamingMessageProps {
  content: string
}

export function StreamingMessage({ content }: StreamingMessageProps) {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="px-4 py-3 rounded-xl bg-[#111827] text-[#E5E7EB] rounded-bl-none shadow-lg">
          <div className="text-[1.05rem] leading-relaxed">
            {content}
            <span className={`inline-block w-2 h-5 bg-[#FACC15] ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
